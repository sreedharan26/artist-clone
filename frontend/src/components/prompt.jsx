import '../styles/prompt.css'
import image from '../assets/image2.jpeg'
import vector from '../assets/Vector.png'

export default function Prompt(){
    return (
        <>
            <div className="p-container">
                <p className="p-heading">
                    Spark Your Imagination
                </p>
                <div className="prompt-shuffle-container">
                    <div className="prompt">
                        Portals and Passages
                    </div>
                    <button className='button'>
                        Shuffle
                    </button>
                </div>
                <div className="image-container">
                    <img src={image} className='p-image' />
                </div>  
                <div className="last-container">
                    <input className="prompt-input"/>
                    <img className='edit-icon' src={vector} />
                    <button className='evoke-btn'>Evoke</button>
                </div>
            </div>
        </>
    )
}