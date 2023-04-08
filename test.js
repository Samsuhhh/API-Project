function encrypt(message, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "1234567890"

    let ans = ""

    for (let char of message) {
        if (char == "-") {

        } else if (numbers.includes(char)) {
            shift += parseInt(char)
            ans += char
        } else if (alphabet.includes(char)) {
            ans += alphabet[(alphabet.indexOf(char) + shift) % 26]
        } else {
            ans += char
        }
    }

    return ans;
}


function encrypt2(message, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "1234567890"

    let ans = ""

    for (let char of message) {
        if (numbers.includes(char)) {
            shift += parseInt(char)
            ans += char
        } else if (alphabet.includes(char)) {
            ans += alphabet[(alphabet.indexOf(char) + shift) % 26]
        } else {
            ans += char
        }
    }
}

function encrypt3(message, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789-"

    let ans = ""

    for (let char of message) {
        if (numbers.includes(char)) {
            shift += parseInt(char)
            ans += char
        } else if (alphabet.includes(char)) {
            ans += alphabet[(alphabet.indexOf(char) + shift + 26) % 26]
        } else {
            ans += char
        }
    }

    return ans
}

function encrypt4(message, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789-"

    let ans = ""
    let number = ""

    for (let char of message) {
        if (numbers.includes(char)) {
            number += char
        } else if (alphabet.includes(char)) {
            shift += parseInt(number) || 0
            number = ""
            ans += alphabet[(alphabet.indexOf(char) + shift + 26) % 26]
        } else {
            number = ""
            ans += char
        }
    }

    return ans
}

function encrypt5(message, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789-"

    let ans = ""
    let number = ""

    for (let char of message) {
        if (numbers.includes(char)) {
            number += char
        } else if (alphabet.includes(char)) {
            shift += parseInt(number) || 0
            number = ""
            ans += alphabet[(alphabet.indexOf(char) + shift + 26) % 26]
        } else {
            number = ""
            ans += char
        }
    }

    return ans
}

function encrypt6(message, shift) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789-"
    let ans = ""
    let number = ""

    for (let char of message) {
        if (numbers.includes(char)) {
            number += char
            ans += char
        } else if (alphabet.includes(char)) {
            shift += parseInt(number) || 0
            number = ""
            ans += alphabet[(alphabet.indexOf(char) + shift + 26) % 26]
        } else {
            number = ""
            ans += char
        }
    }

    return ans
}
console.log(encrypt6("he12l9lo wo-1rld", 7))
