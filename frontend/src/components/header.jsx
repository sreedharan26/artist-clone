import Star from "./star"
import head from "../assets/ArtistRituals.svg"

export default function Header(){
    return (
        <>
            <div className="header">
                <img src={head} className="head-img" /> 
                <div className="star">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                </div>
            </div>
            <div className="bottom-border">

            </div>
        </>
    )
}