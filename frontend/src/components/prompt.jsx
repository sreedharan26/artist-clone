import '../styles/prompt.css'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import random from '../functions/random';
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Prompt(){
    const [data, setDataArray] = useState(null)
    const [urls, setUrls] = useState([])
    const [index, setIndex] = useState(random([], 10))
    const [base64, setBase64] = useState('')
    const [image, setImage] = useState('')
    const [big, setBig] = useState(false);
    const [cname, setCname] = useState('');
    const [hasIt, setHastIt] = useState([])

    const fetchData = async () => {
        try{
            const res = await axios.get('https://nextjsbackend-rouge.vercel.app/api/prompts')

            let newData = []
            const newUrls = []
            for(const obj of res.data){
                // console.log(obj)
                const newObj = {
                    id: obj.id,
                    prompt: obj.fields?.["Name"],
                    image: obj.fields?.["image"],
                }
                newData && newData.push(newObj)
                newUrls && newObj.image !== undefined && newUrls.push(newObj && newObj.image !== undefined && newObj.image[0] && newObj.image[0]?.url)
            }
            newData = newData.filter(x => x && x.image!== undefined)
            // console.log(newData)
            setUrls(newUrls)
            setDataArray(newData)

        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        const preloadImages = async () => {
          const promises = urls.map(url => {
            return new Promise((resolve, reject) => {
              const image = new Image();
              image.src = url;
              image.onload = () => resolve(url);
              image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
            });
          });
    
          try {
            const loadedUrls = await Promise.all(promises);
            // setLoadedImages(loadedUrls);
          } catch (error) {
            console.error(error);
          }
        };
    
        preloadImages();
      }, [urls]);

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
        let i = random(hasIt, 85)
        // console.log(hasIt)
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
                        placeholderSrc={(data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].thumbnails && data[index].image[0].thumbnails.small && data[index].image[0].thumbnails.small.url)}
                        // width={600} 
                        // height={400}
                        alt={data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].filename}
                        className='p-image'
                        effect='blur'
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