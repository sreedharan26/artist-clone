import '../styles/doodle.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import random from '../functions/random';

export default function Doodle(){
    const [data, setDataArray] = useState(null)
    const [index, setIndex] = useState(0);
    const [isBig, setIsBig] = useState(false);
    const [hasIt, setHastIt] = useState([])

    const fetchData = async () => {
        try{
            const res = await axios.get('https://nextjsbackend-rouge.vercel.app/api/ideas')

            const newData = []
            for(const obj of res.data){
                // console.log(obj)
                const newObj = {
                    id: obj.id,
                    heading: obj.fields?.["Heading"],
                    idea: obj.fields?.["Description"]
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
    }, [])

    const handleClick = () => {
        // const i = data !== null && data.length > 0 ? Math.floor(Math.random() * data.length) : 0;
        // console.log(i, data[i].idea.length)
        let n = data && data.length;
        let i = random(hasIt, n)
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
                <h1 className="doodle">{data!==null && !isNaN(index) && data[index]  ? data[index].heading : ''}</h1>
                <p className={`doo-description ${isBig ? "big-desc" : ''}`}>{data !== null && !isNaN(index) && data[index] ? data[index].idea : ''}</p>
            </div>
        </>
    )
}