import '../styles/prompt.css'
import image from '../assets/image2.jpeg'
import vector from '../assets/Vector.png'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function Prompt(){
    const [data, setDataArray] = useState(null)
    const [index, setIndex] = useState(0)
    const [base64, setBase64] = useState('')

    const fetchData = async () => {
        try{
            const res = await axios.get('http://localhost:3000/images')
            // return res.data;
            setDataArray(res.data)
            // const index = Math.floor(Math.random() * res.data.length)
            // setRandomIndex(index);
            console.log(res.data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=> {
        const func = async () => {
          await fetchData();
        }
        func();
        setBase64(x => data ? data[index].imagebase64 : "")
    }, [])

    useEffect(() => {
        setBase64(x => data ? data[index].imagebase64: "")
    }, [index])


    const handleClick = () => {
        const i = data !== null && data.length > 0 ? Math.floor(Math.random() * 20) : 0;
        console.log(data[i].imagebase64)
        setIndex(i);
    }
    


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
                        {`${data && data[index].prompt ? data[index].prompt : ''}`}
                    </div>
                    <button className='button' onClick={handleClick}>
                        Shuffle
                    </button>
                </div>
                <div className="image-container">
                    <img src={data && data[index].imagebase64 ? `data:image/jpeg;base64,${base64}`: ''} className='p-image' />
                </div>  
            </div>
        </>
    )
}


{/* <div className="last-container">
    <div className='input-wrapper'>
        <input 
            className="prompt-input"
            placeholder='Lost in Time'
            ref={inputRef}
        />
        <img className='edit-icon' src={vector} onClick={focus} />
    </div>
    <button className='evoke-btn'>Evoke</button>
</div> */}