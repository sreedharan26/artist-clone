import '../styles/prompt.css'
import image from '../assets/image2.jpeg'
import vector from '../assets/Vector.png'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Prompt(){
    const [data, setDataArray] = useState(null)
    const [index, setIndex] = useState(0)
    const [base64, setBase64] = useState('')
    const [image, setImage] = useState('')
    const [big, setBig] = useState(false);
    const [cname, setCname] = useState('');

    const fetchData = async () => {
        try{
            const res = await axios.get('https://artist-rituals.onrender.com/images')
            setDataArray(res.data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=> {
        const func = async () => {
          await fetchData();
        }
        func();
    }, [])
    
    useEffect(() => {
        // setBase64(x => data && !isNaN(index) && data[index] ? data[index].imagebase64: "")
        setImage(data !== null && !isNaN(index) && data[index]!==null && data[index].image && data[index].image[0] && data[index].image[0].url)

        if(data!==null && !isNaN(index) && data[index] !==null && (data[index].prompt.length >= 30)){
            setBig(true)
        }else{
            setBig(false)
        }

    }, [index])

    useEffect(() => {
        big ? setCname("big") : setCname("")
    }, [big])
    
    
    const handleClick = () => {
        const i = data !== null && data.length > 0 ? Math.floor(Math.random() * 50) : 0;
        // console.log(data[i].image)
        // setBase64(x => data && !isNaN(index) && data[index] ? data[index].imagebase64 : "")
        setIndex(i);
        setImage(data !== null && !isNaN(index) && data[index]!==null && data[index].image && data[index].image[0] && data[index].image[0].url)
    }
    


    // const inputRef = useRef()

    // function focus(){
    //     inputRef.current.focus()
    // }

    return (
        <>
            <div className="p-container">
                <p className="p-heading">
                    Spark Your Imagination
                </p>
                <div className="prompt-shuffle-container">
                    <div className={`prompt ${cname}`}>
                        {`${data && !isNaN(index) && data[index] ? data[index].prompt : ''}`}
                    </div>
                    <button className='button' onClick={handleClick}>
                        Shuffle
                    </button>
                </div>
                <div className="image-container">
                    {/* <img loading='lazy' src={image ? image : (data && data[index] && data[index].image && data[index].image[0] && data[index].image[0].url)} className='p-image' /> */}
                    <LazyLoadImage 
                        src={image ? image : (data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].url)}
                        // placeholderSrc={(data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].thumbnails && data[index].image[0].thumbnails.small && data[index].image[0].thumbnails.small.url)}
                        // width={600} 
                        // height={400}
                        alt={data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].filename}
                        className='p-image'
                    />
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