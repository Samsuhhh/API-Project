'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName } = this; // context will be the User instance
      return { id, username, email, firstName, lastName };
    }
    // checking if ??
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    
    static getCurrentUserById(id){
      return User.scope("currentUser").findByPk(id);
    }

    // defining static method for login; 
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    // defining static method for signup; accepts obj with username, email, pw
    // then hash the pw using bcrypt
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Spot, {foreignKey: 'ownerId'});
      User.hasMany(models.Booking, {foreignKey: 'userId'});
      User.hasMany(models.Review, {foreignKey: 'userId'})
    }
  };

  User.init(
    {
      firstName:{ 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 20]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 20]
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
          // isUnique(value){
          //   if(!isUnique) throw new Error('User already exists')
          // }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      indexes: [{
        unique: true,
        fields: ['username', 'email'] }
      ],
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"] } 
        },
        loginUser: {
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }
      }
    }
  );
  return User;
};