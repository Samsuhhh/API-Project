import './footer.css';

const Footer = () => {


    return (
        <div id="footer-wrapper">
            <div className='footer-containers' id="left-footer-nav-container">
                <span className="footer-span"> &copy; 2023 AirNbN, Inc.</span>
                <span className="footer-dot">&middot;</span>
                {/* <span className="footer-span">Terms</span>
                <span className="footer-dot">&middot;</span> */}
                <a href='https://www.github.com/Samsuhhh/' target="_blank" rel="noreferrer" className="footer-nav">
                    <span className="footer-span">Sam's Github</span>
                </a>
                <span className="footer-dot">&middot;</span>
                <a href='https://www.linkedin.com/in/samsuhhh/' target="_blank" rel="noreferrer" className="footer-nav">
                    <span className="footer-span">Sam's LinkedIn</span>
                </a>
                <span className="footer-dot">&middot;</span>
                <a href='https://github.com/Samsuhhh/API-Project' target="_blank" rel="noreferrer" className="footer-nav">
                    <span className="footer-span">This project's repo</span>
                </a>
            </div>
            <div className='footer-containers' id="right-footer-nav-container">
                <div className="footer-span-right" id='span-with-svg'>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                        <g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M3 12H22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 2.2019C14.4744 4.72698 16 8.18526 16 11.9999C16 15.8145 14.4744 19.2728 12 21.7978" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12 2.2019C9.52563 4.72698 8 8.18526 8 11.9999C8 15.8145 9.52563 19.2728 12 21.7978" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

                    </svg>
                    <span>English (US)</span>
                </div>
                <div className="footer-span-right">$ USD</div>
                <div className="footer-span-right" id='span-with-svg'>
                    <span>Support & resources</span>
                    <svg fill="#222222" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.735 511.735" xmlSpace="preserve" stroke="#222222" stroke-width="50.4694"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.788,371.087L263.455,125.753c-4.16-4.16-10.88-4.16-15.04,0L2.975,371.087c-4.053,4.267-3.947,10.987,0.213,15.04 c4.16,3.947,10.667,3.947,14.827,0l237.867-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213 C512.734,381.753,512.734,375.247,508.788,371.087z"></path> </g> </g> </g></svg>
                </div>
            </div>
        </div>
    )
}

export default Footer;