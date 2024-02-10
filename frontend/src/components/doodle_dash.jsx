import '../styles/doodle.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Doodle(){
    const [data, setDataArray] = useState(null)
    const [index, setIndex] = useState(0);
    const [isBig, setIsBig] = useState(false);

    const fetchData = async () => {
        try{
            const res = await axios.get('https://artist-rituals.onrender.com/ideas')
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
    }, [])

    const handleClick = () => {
        const i = data !== null && data.length > 0 ? Math.floor(Math.random() * data.length) : 0;
        console.log(i, data[i].idea.length)
        if(data[i].idea.length > 80){
            setIsBig(true)
        }else{
            setIsBig(false);
        }
        setIndex(i);
    }


    return (
        <>
            <div className="d-container">
                <div className='heading-btn-cont'>
                    <p className="heading">Creative Catalysts</p>
                    <button className="d-btn" onClick={handleClick}>Shuffle</button>
                </div>
                <h1 className="doodle">{data!==null ? data[index].heading : ''}</h1>
                <p className={`doo-description ${isBig ? "big-desc" : ''}`}>{data !== null ? data[index].idea : ''}</p>
            </div>
        </>
    )
}