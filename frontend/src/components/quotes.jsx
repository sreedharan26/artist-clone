import "../styles/quotes.css"
import image from "../assets/image3.png"
import axios from 'axios'
import { useEffect, useState } from "react"
import quote from '../assets/qu.svg'

export default function Quotes(){
    const [data, setDataArray] = useState(null)
    const [index, setIndex] = useState(0);
    const [isBig, setIsBig] = useState(false);

    const fetchData = async () => {
        try{
            const res = await axios.get('https://artist-rituals.onrender.com/quotes')
            // return res.data;
            setDataArray(res.data)
            // const index = Math.floor(Math.random() * res.data.length)
            // setRandomIndex(index);
            console.log(res.data)
        }catch(e){
            console.log(e);
        }
    }


    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    useEffect(()=> {
        const func = async () => {
          await fetchData();
        }
        func();
      }, [])

    const handleClick = () => {
        const i = data !== null && data.length > 0 ? (index+1)%data.length : 0;
        console.log(i, data[i].quote.length)
        if(data[i].quote.length > 40){
            setIsBig(true)
        }else{
            setIsBig(false);
        }
        setIndex(i);
    }
    
    return (
        <>
            <div className="q-container">
                <div className="left-div">
                    <div className="q-i-cont">
                        <div className="img-cont">
                            <img className="q-image" src={data !== null ? data[index].image[0].thumbnails.large.url : image} />
                        </div>
                        {/* <div className="q-i-wrapper">

                        </div> */}
                    </div>
                    <button className="btn" onClick={handleClick}>Shuffle</button>
                </div>
                <div className="right-div">
                    <p className="q-heading">Visionary Voices</p>
                    {/* <span className="open-quote">“</span> */}
                    <img src={quote} className="quote-image"/>
                    <h1 className={`quote ${isBig === true ? "big-quote" : '' }`}>
                        {data && data[index] ? data[index].quote  : 'Originality is undetected plagiarism'}
                        {/* {data && data[index] && data[index].quote.length > 40 ? () => setIsBig(true) : () => setIsBig(false)} */}
                    </h1>
                    <p className="name"><b>{data && data[index] ? data[index].name : 'Author'}</b></p>
                    <p className="description">{data && data[index].desc}</p>
                </div>
            </div>
        </>
    )
}
                    // <div className="image">

                    //     {/* <div className="image-wrapper">
                    //         <div className="image-wrapper1">

                    //         </div>
                    //     </div> */}
                    // </div>
                    // {/* <img 
                    //     src={image}
                    //     className="image1"
                    // /> */}