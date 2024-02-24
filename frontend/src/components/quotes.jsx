import "../styles/quotes.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios'
import { useEffect, useState } from "react"
import quote from '../assets/qu.svg'
import random from "../functions/random"

export default function Quotes(){
    const [data, setDataArray] = useState(null)
    const [image, setImage] = useState('')
    const [index, setIndex] = useState(0);
    const [isBig, setIsBig] = useState(true);
    const [large, setLarge] = useState(false);
    const [cname, setCname] = useState('');
    const [lname, setLname] = useState('');
    const [hasIt, setHastIt] = useState([])

    const fetchData = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/quotes')
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
        isBig ? setCname("big-quote") : setCname("") 
        large ? setLname("large-quote") : setLname("")
    }, [])
    
    useEffect(() => {
          if(data!==null && data[index] !==null && (data[index].quote.length > 60 && data[index].quote.length <80) ){
              setIsBig(true);
              setLarge(false)
          }else if(data!==null && data[index] !==null && (data[index].quote.length > 80 && data[index].quote.length < 100)){
                setLarge(false)
                setIsBig(false);
          }else if(data!==null && data[index] !==null && (data[index].quote.length > 100)){
            setIsBig(false)
            setLarge(true)
          }
          setImage(data !== null && !isNaN(index) && data[index]!==null && data[index].image && data[index].image[0] && data[index].image[0].url)
      }, [index])

      useEffect(() => {
        isBig ? setCname("big-quote") : setCname("") 
        large ? setLname("large-quote") : setLname("")
      }, [isBig, large])

    const handleClick = () => {
        let n = data && data.length
        let i = random(hasIt, n)
        setIndex(i);
        setImage(data !== null && !isNaN(index) && data[index]!==null && data[index].image && data[index].image[0] && data[index].image[0].url)
    }
    
    return (
        <>
            <div className="q-container">
                <div className="left-div">
                    <div className="q-i-cont">
                        <div className="img-cont">
                            <LazyLoadImage 
                                src={image ? image : (data && data[index] && data[index].image && data[index].image[0] && data[index].image[0].url)}
                                PlaceholderSrc={(data && data[index] && data[index].image && data[index].image[0] && data[index].image[0].thumbnails && data[index].image[0].thumbnails.small && data[index].image[0].thumbnails.small.url)}
                                // width={500} 
                                // height={400}
                                alt={data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].filename}
                                className='q-image'
                            />
                        </div>
                    </div>
                    <button className="btn" onClick={handleClick}>Shuffle</button>
                </div>
                <div className="right-div" >
                    <p className="q-heading">Visionary Voices</p>
                    <img src={quote} className="quote-image"/>
                    <h1 className={`quote ${cname} ${lname}`}>
                        {data && !isNaN(index) && data[index] ? data[index].quote  : ''}
                    </h1>
                    <p className="name"><b>{data && !isNaN(index) && data[index] ? data[index].name : 'Author'}</b></p>
                    <p className="description">{data && !isNaN(index) && data[index] && data[index].desc}</p>
                </div>
            </div>
        </>
    )
}