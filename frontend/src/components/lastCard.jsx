import { LazyLoadImage } from "react-lazy-load-image-component"
import "../styles/last.css"

export default function LastCard({author}){
    let lines = author && author.schedule && author.schedule.split("\n")

    return (
        <>
            <div className="author-desc-cont">
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
                <div className="author-desc">
                    <ul className="points-cont">
                        {lines && lines.map((line, index) => (
                            line && line.length>1 && <li key={index} className="point">{line && (line.startsWith('- ') ? line.slice(2) : line)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}