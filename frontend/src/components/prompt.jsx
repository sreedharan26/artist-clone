import '../styles/prompt.css'
import image from '../assets/image2.jpeg'
import vector from '../assets/Vector.png'
import { useRef } from 'react'

export default function Prompt(){
    const inputRef = useRef()

    function focus(){
        inputRef.current.focus()
    }

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
                    <div className='input-wrapper'>
                        <input 
                            className="prompt-input"
                            placeholder='Lost in Time'
                            ref={inputRef}
                        />
                        <img className='edit-icon' src={vector} onClick={focus} />
                    </div>
                    <button className='evoke-btn'>Evoke</button>
                </div>
            </div>
        </>
    )
}