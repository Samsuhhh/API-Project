import { editSpot, getSpotDetails } from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import './SpotDetails.css'
// import UpdateSpotFormPage from "../UpdateSpot";
import { deleteSpot } from "../../store/spots";
import SpotReviews from "../AllReviews";
// import { deleteReview } from "../../store/reviews";


const SpotDetail = () => {
    const params = useParams();
    const { spotId } = params;
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(state => state.session.user);
    // const spotImg = useSelector(state => state.spots.singleSpot);
    // delete spotImages at the end of useSelector and then put it back in for the BUG to occur
    // const reviewUser = useSelector(state => state.reviews.spot);

    const spotDetails = useSelector(state => {
        return state.spots.singleSpot
    });
    // console.log('goodbye', spotImg)
    console.log('SPOT DETAILS', spotDetails.SpotImages)

    // console.log('hi')

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!Object.keys(spotDetails).length) {
        console.log('if NO spotDetails safety hitting')
        return null;
    }

    const updateRedirect = async (e) => {
        // let updatedSpot = await dispatch(getSpotDetails(spotId));
        // console.log('UPDATING SPOT', updatedSpot);
        // if(updatedSpot) {
        history.push(`/spots/update/${spotId}`)
        // }
    }


    const deleteHandler = async () => {
        if (window.confirm('Are you sure you want to delete this spot?')) {
            await dispatch(deleteSpot(spotId));
            history.push('/')
        } else {
            history.push(`/spots/${spotId}`)
        }
    };

    // const reviewDeleteHandler = async () => {
    //     console.log('review user', reviewUser.userId)

    //     console.log( 'current user', currentUser.id)

    //     if (currentUser.id === reviewUser.userId) {
    //         dispatch(deleteReview(reviewUser[0].id))
    //         window.alert('Review deleted')
    //         history.push(`/spots/${spotId}`)
    //     }
    //     else {
    //         window.alert('This is not yours to delete')
    //         // history.push('/')
    //     }

    // }

    const newReviewRedirect = () => {
        history.push(`/spots/${spotId}/new-review`)
    }


    return (
        <div id='spot-outermost'>
            <div id='header-wrap'>
                <div id='spotName-header'>
                    Spot Name:  {spotDetails.name}
                </div>
            </div>
            <div id='spotPage'>

                <div id='spotDetails-content'>
                    {/* <div className='spotDetails-image'> */}
                    <img id='spotDetails-img' alt='beautiful spotImage' src={spotDetails.SpotImages[0]?.url ||
                        'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'} />
                    {/* </div> */}
                </div>

                <div className="details-container">

                    <div id='details-left'>

                        <div id='details-mini-header'>
                            <div id='mini-header-styling'>
                                <h2 id='h2header'>{spotDetails.name} hosted by {spotDetails.Owner.firstName}</h2>
                                <span>Spot Id: {spotDetails.id}</span>
                            </div>
                        </div>

                        <div className='host-information'>
                            Self check-in
                        </div>
                        <div className='host-information'>
                            {spotDetails.firstName} is a Superhost
                            <div id='superhost-description'>
                                Superhosts are experienced, highly rated hosts who are committed to making money by appealing to guests.
                            </div>
                        </div>
                        <div className='host-information'>
                            Free cancellation for 48 hours.
                        </div>

                        <div className='host-information' id='appAcademy-disclaimer'>
                            <logo>aA logo</logo>
                            <div>
                                Everything on this site is 1000% real, venmo: @Samsuhhh for payments.
                            </div>
                            <div>
                                <Link color='black' to='/https://www.appacademy.io/'>Learn More</Link>
                            </div>
                        </div>

                        <div className='host-information'>
                            Spot Description: {spotDetails.description}
                        </div>


                    </div>
                    <div id='right-modal'>
                        {currentUser && currentUser.id === spotDetails.ownerId && (
                            <button onClick={updateRedirect}>UPDATE SPOT</button>
                        )}
                        <br></br>
                        {currentUser && currentUser.id === spotDetails.ownerId && (
                            <button onClick={deleteHandler}>DELETE</button>
                        )}
                    </div>

                </div>
            </div>
            <div id='reviews-container'>
                <div>
                    <SpotReviews />
                </div>
                <div>
                    <button onClick={newReviewRedirect}>
                        CREATE NEW REVIEW
                    </button>
                </div>

            </div>
        </div>

    )
}

export default SpotDetail;