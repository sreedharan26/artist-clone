import "../styles/q1.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios'
import { useEffect, useState } from "react"
import quote from '../assets/qu.svg'
import random from "../functions/random"

export default function Quotes1(){
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
            const res = await axios.get('https://nextjsbackend-rouge.vercel.app/api/quotes')
            // console.log(res)
            const newData = []
            for(const obj of res.data){
                // console.log(obj)
                const newObj = {
                    id: obj.id,
                    name: obj.fields?.["author name"],
                    image: obj.fields?.["Author Headshots"],
                    desc: obj.fields?.["What he did"],
                    quote: obj.fields?.["Quote"]
                }
                newData && newData.push(newObj)
            }
            // console.log(newData)
            setDataArray(newData)
        }catch(e){
            console.log(e);
        }
    }


    useEffect(()=> {
        const func = async () => {
          await fetchData();
        }
        func();
        // isBig ? setCname("big-quote") : setCname("") 
        // large ? setLname("large-quote") : setLname("")
    }, [])
    
    useEffect(() => {
          if(data!==null && data[index] !==null && (data[index].quote.length > 60 && data[index].quote.length <80) ){
            //   setIsBig(true);
            // setCname("big-quote1")
            // console.log(data[index].quote.length)
            setCname("")
            //   setLarge(false)
          }else if(data!==null && data[index] !==null && (data[index].quote.length > 90 && data[index].quote.length < 120)){
                // setLarge(false)
                setCname("big-quote1")
                // setIsBig(false);
                // console.log(data[index].quote.length)
          }else if(data!==null && data[index] !==null && (data[index].quote.length > 100)){
            // setIsBig(false)
            setCname("large-quote1")
            // console.log(data[index].quote.length)

            // setLarge(true)
          }else{
            setCname("")
          }
          setImage(data !== null && !isNaN(index) && data[index]!==null && data[index].image && data[index].image[0] && data[index].image[0].url)
      }, [index, ''])

    //   useEffect(() => {
    //     isBig ? setCname("big-quote1") : setCname("") 
    //     large ? setLname("large-quote1") : setLname("")
    //   }, [isBig, large])

    const handleClick = () => {
        let n = data && data.length
        let i = random(hasIt, n)
        setIndex(i);
        setImage(data !== null && !isNaN(index) && data[index]!==null && data[index].image && data[index].image[0] && data[index].image[0].url)
    }
    
    return (
        <>
            <div className="q1-container">
                <div className="left-div1">
                    <LazyLoadImage 
                        src={image ? image : (data && data[index] && data[index].image && data[index].image[0] && data[index].image[0].url)}
                        PlaceholderSrc={(data && data[index] && data[index].image && data[index].image[0] && data[index].image[0].thumbnails && data[index].image[0].thumbnails.small && data[index].image[0].thumbnails.small.url)}
                        alt={data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].filename}
                        className='q1-image'
                    />
                     <button className="btn1" onClick={handleClick}>Shuffle</button>
                </div>
                <div className="right-div1" >
                    <p className="q1-heading">Visionary Voices</p>
                    <img src={quote} className="quote-image1"/>
                    <h1 className={`quote1 ${cname} ${lname}`}>
                        {data && !isNaN(index) && data[index] ? data[index].quote  : ''}
                    </h1>
                    <p className="name1"><b>{data && !isNaN(index) && data[index] ? data[index].name : 'Author'}</b></p>
                    <p className="description1">{data && !isNaN(index) && data[index] && data[index].desc}</p>
                </div>
            </div>
        </>
    )
}
// <div className="q-i-cont">
//     <div className="img-cont">
//         <LazyLoadImage 
//             src={image ? image : (data && data[index] && data[index].image && data[index].image[0] && data[index].image[0].url)}
//             PlaceholderSrc={(data && data[index] && data[index].image && data[index].image[0] && data[index].image[0].thumbnails && data[index].image[0].thumbnails.small && data[index].image[0].thumbnails.small.url)}
//             // width={500} 
//             // height={400}
//             alt={data && !isNaN(index) && data[index] && data[index].image && data[index].image[0] && data[index].image[0].filename}
//             className='q-image'
//         />
//     </div>
// </div>
// <button className="btn" onClick={handleClick}>Shuffle</button>