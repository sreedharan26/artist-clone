import "../styles/dr.css"
import image1 from "../assets/image3.png"
import image2 from "../assets/image4.png"
import image3 from "../assets/image5.png"
import image4 from "../assets/image6.png"
import group from "../assets/Group7.png"


export default function DailyRituals(){
    return (
        <>
            <div className="dr-container">
                <div className="left-dr-cont">
                    <h1 className="dr-heading">
                        Daily Rituals
                    </h1>
                    <p className="dr-p"> 
                        Find your artist personality
                    </p>
                    <button className="dr-btn">
                        <a href="https://l0lle7fw607.typeform.com/to/cCbgs1Ee" target="_blank" className="link">Fill questionnaire</a>
                    </button>
                </div>
                <div className="right-dr-cont">
                        <img src={group} className="group"/>
                </div>
            </div>
        </>
    )
}

{/* <div className="dr-i-cont image1">
                            <div className="dr-img-cont">
                                <img className="dr-image" src={image1} />
                            </div>
                            <div className="dr-i-wrapper">

                            </div>
                    </div>
                    <div className="dr-i-cont image2">
                            <div className="dr-img-cont">
                                <img className="dr-image" src={image2} />
                            </div>
                            <div className="dr-i-wrapper">

                            </div>
                    </div>
                    <div className="dr-i-cont image3">
                            <div className="dr-img-cont">
                                <img className="dr-image" src={image3} />
                            </div>
                            <div className="dr-i-wrapper">

                            </div>
                    </div>
                    <div className="dr-i-cont image4">
                            <div className="dr-img-cont">
                                <img className="dr-image" src={image4} />
                            </div>
                            <div className="dr-i-wrapper">

                            </div>
                    </div> */}