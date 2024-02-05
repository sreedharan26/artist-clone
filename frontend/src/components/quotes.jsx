import "../styles/quotes.css"
import image from "../assets/image.png"
import axios from 'axios'
import { useEffect, useState } from "react"

export default function Quotes(){
    const [data, setDataArray] = useState(null)
    const [index, setIndex] = useState(0);
    const [isBig, setIsBig] = useState(false);

    const fetchData = async () => {
        try{
            const res = await axios.get('https://artist-rituals.onrender.com/data')
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
        const i = data !== null && data.length > 0 ? Math.floor(Math.random() * data.length) : 0;
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
                    <div className="image">

                        {/* <div className="image-wrapper">
                            <div className="image-wrapper1">

                            </div>
                        </div> */}
                    </div>
                    {/* <img 
                        src={image}
                        className="image1"
                    /> */}
                    <button className="btn" onClick={handleClick}>Shuffle</button>
                </div>
                <div className="right-div">
                    <p className="q-heading">Palette Perspectives</p>
                    {/* <span className="open-quote">“</span> */}
                    <h1 className={`quote ${isBig === true ? "big-quote" : '' }`}>
                        {data && data[index] ? data[index].quote  : 'Originality is undetected plagiarism'}
                        {/* {data && data[index] && data[index].quote.length > 40 ? () => setIsBig(true) : () => setIsBig(false)} */}
                    </h1>
                    <p className="name"><b>{data && data[index] ? data[index].name : 'Author'}</b></p>
                    <p className="description">Title and what he did</p>
                </div>
            </div>
        </>
    )
}