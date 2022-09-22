import CurrentUserReviews from "../GetCurrentReviews";
import CurrentUserSpots from "../GetCurrentSpots";


const GetCurrentUser = () => {


    return (
        <div id='User-Data'>
            <div>YOUR REVIEWS
                <CurrentUserReviews />
            </div>

            <div>
                YOUR SPOTS
                <CurrentUserSpots />
            </div>
        </div>
    )


}

export default GetCurrentUser;