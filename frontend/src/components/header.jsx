import star from "../assets/star.png"
import head from "../assets/ArtistRituals.svg"

export default function Header(){
    return (
        <>
            <div className="header">
                <img src={head} className="head-img" /> 
                <div className="star">
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                    <img src={star} />
                </div>
            </div>
            <div className="bottom-border">

            </div>
        </>
    )
}