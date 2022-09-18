import './SingleSpot.css'

const SingleSpot = () => {

    return (
<>
        {/* <div className="spot-card-container"> */}
            <img id="spotImg" alt="nice house" src='https://64.media.tumblr.com/01d5b773173c39a69236138458ca2482/tumblr_p7eck8xuUC1ss7ju0o1_1280.jpg' />
            <div className='description-stars'>
                <div id='location'>
                    location
                </div>
                <div>
                    stars
                </div>
            </div>
            <div id='miles'>
                miles away
            </div>
            <div id='dates'>
                dates available
            </div>
            <div id="price">
                $price per night
            </div>

        {/* </div> */}
        </>
    )

}



export default SingleSpot;