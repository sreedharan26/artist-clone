import { LazyLoadImage } from "react-lazy-load-image-component"
import close from "../assets/close.svg"
import "../styles/last.css"

export default function LastCard({author, close}){
    let lines = author && author.schedule && author.schedule.split("\n")
    // lines = lines.map( line => line && line.length > 1 && (line.startsWith("- ") ? line.slice(2).length > 0 ? line.slice(2) : "" : line))

    return (
        <>
            <div className="author-desc-cont">
                <div className="close-cont">
                    <svg onClick={close} className="close-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>
                <div className="author-details">
                    <LazyLoadImage 
                        src={author && author.image && author.image[0] && author.image[0].url}
                        alt="Author Image"
                        className="author-image"
                    />
                    <div className="author">
                        <p className="author-name"> 
                            {author && author.name}
                        </p>
                        <p className="author-title">
                            {author && author.desc}
                        </p>
                    </div>
                </div>
                <div className="scroll-cont">
                    <div className="author-desc">
                        <ul className="points-cont">
                            {lines && lines.map((line, index) => (
                                line && line.length>1 && <li key={index} className="point">{line && (line.startsWith('- ') ? line.slice(2) : line)}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}