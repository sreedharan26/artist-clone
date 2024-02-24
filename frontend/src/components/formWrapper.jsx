import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./form"
import "../styles/formwrapper.css"
import guessPersonality from "../functions/personality"
import schedule from "../functions/schedule"
import StartingCard from "./startingCard"
import LastCard from "./lastCard"

export default function FormWrapper({close}){
    const [responseData, setResponseData] = useState(null)
    const [formIndex, setFormIndex] = useState(-1)
    const [artistsData, setArtistsData] = useState(null)
    const [data1, setData1] = useState(null)
    const [artist, setArtist] = useState(null)
    const data = [
        {
            id: 1,
            question: "How do you prefer to start your day?",
            options: ["Early morning exercise","A strong cup of coffee or tea","Diving straight into creative work", "Reviewing my to-do list"]
        },
        {
            id: 2,
            question: "When do you feel most creative?",
            options: ["Early morning", "Late at night", "Afternoon", "My creativity doesn't follow a schedule"]
        },
        {
            id: 3,
            question: "What kind of environment do you prefer for your creative work?",
            options: ["Quiet and isolated", "Busy and vibrant","Outdoors, close to nature", "Wherever I find inspiration"]
        },
        {
            id: 4,
            question: "Which habit best supports your creativity?",
            options: ["Regular exercise", "Reading and research", "Meditation or mindfulness", "Social interactions"]
        },
        {
            id: 5,
            question: "What do you rely on to fuel your creative sessions?",
            options: ["Coffee or tea", "Music", "Breaks and naps", "Snacks and drinks"]
        },
        {
            id: 6,
            question: "Which do you prefer to use in your creative work?",
            options: ["Pen and paper", "Digital devices (computer, tablet)", "Art supplies (paint, canvas)", "Musical instruments"]
        },
        {
            id: 7,
            question: "How do you deal with distractions while working?",
            options: ["I seek complete isolation", "I work through them", "I use them as inspiration", "I take a break and then continue"]
        },
        {
            id: 8,
            question: "What is your go-to method for overcoming creative blocks?",
            options: ["Switch to a different activity", "Force myself through the block", "Seek inspiration from others", "Rest and return with a fresh perspective"]
        },
        {
            id: 9,
            question: "How do you pace your creative output?",
            options: ["Set daily goals", "Work in bursts of inspiration", "Maintain a steady pace", "My output is unpredictable"]
        },
        {
            id: 10,
            question: "How do you feel about sharing your work with others?",
            options: ["I prefer to keep it to myself until it's finished", "I regularly seek feedback", "I enjoy collaborative projects", "I share my work selectively for inspiration"]
        },
        {
            id: 11,
            question: "What's your ideal way to end a day of creative work?",
            options: ["Relaxing with a book or movie", "Socializing with friends or family", "Reflecting on the day's work", "Planning for the next day"]
        },
        {
            id: 12,
            question: "Where do you find most of your creative inspiration?",
            options: ["In nature", "In everyday life", "In art and literature", "In personal experiences"]
        },
        {
            id: 13,
            question: "How flexible are you with your creative routines?",
            options: ["Very flexible, I adapt as needed", "Somewhat flexible, within limits", "Not very flexible, I stick to my routines", "Completely inflexible, I need consistency"]
        },
        {
            id: 14,
            question: "What drives your creative pursuits?",
            options: ["Personal satisfaction", "Recognition and accolades", "The desire to express myself", "The urge to innovate and experiment"]
        },
        {
            id: 15,
            question: "How do you rest and recharge for more creativity?",
            options: ["Physical activities and sports", "Quiet time alone", "Engaging in different forms of art", "Traveling or exploring new places"]
        }
    ]

    const fetchData = async () => {
        try{
            const res = await axios.get('https://nextjsbackend-rouge.vercel.app/api/artistData')
            const data = res.data
            let personalityArray = []
            for(const question of data){
                let questionArray = []
                // for(let option of question){
                //     let opt =option && option[0] && option[0].split(", ")
                //     questionArray.push(opt)
                // }
                for(let i =1 ; i<5;i++){
                    let opt = question.fields?.[`option${i}`]?.split(", ")
                    questionArray.push(opt)
                }
                personalityArray.push(questionArray)
            }
            // console.log(personalityArray)
            setArtistsData(personalityArray)
        }catch(e){
            console.log(e);
        }
    }

    const fetchData1 = async () => {
        try{
            let res = await axios.get('https://nextjsbackend-rouge.vercel.app/api/getArtists')
            
            const newData = []
            for(const obj of res.data){
                // console.log(obj)
                const newObj = {
                    id: obj.id,
                    name: obj.fields?.["author name"],
                    image: obj.fields?.["Author Headshots"],
                    desc: obj.fields?.["What he did"],
                    schedule: obj.fields?.["Daily Schedule"]
                }
                newData && newData.push(newObj)
            }
            console.log(newData)
            // setDataArray(newData)


            setData1(newData)
            // console.log("fetched")
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        const res = data.map((obj, i) => (
            { id : obj.id, question: obj.question, selected:[]}
        ))
        setResponseData(res)  
        fetchData()
        fetchData1()
    }, [])

    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [])


    const handleNext = () => {
        setFormIndex(x => x + 1)
        // console.log(responseData)
    }

    const handlePrev = () => {
        setFormIndex(x => x - 1)
        // console.log(responseData)
    }
    // console.log(formIndex)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(formIndex < data.length - 1 ){
            handleNext() 
        }
        else{
            handleNext()
            // close()
            // alert('Form Submitted')
            // console.log(responseData)
            // console.log(data1)
            // console.log(artistsData)
            const artists = guessPersonality(artistsData, responseData)
            console.log(artists)
            const artistX = schedule(artists, data1)
            setArtist(artistX)
            // console.log(artists)
        } 
    }    

    return (
        <>
            <div className="modal-wrapper" onClick={close}>
            </div>
            {formIndex === -1 ? <StartingCard next={handleNext} /> : formIndex === data.length   ? <LastCard author={artist} close={close} /> :
                 <div className="form-cont">
                    <div className="q-no">
                            {formIndex + 1}
                    </div>
                    <div className="form-right-side">
                        <form onSubmit={handleSubmit} >
                            <div className="form">
                                <div className="ques-option-cont">
                                    {responseData && 
                                        <Form 
                                            data={data[formIndex]} 
                                            res={responseData[formIndex]} 
                                            setRes = {setResponseData}
                                    />}
                                </div>
                                <div className="buttons">
                                    {formIndex !== -1 && <button type="button" onClick={handlePrev}>previous</button>}
                                    <button type="submit">{formIndex < data.length - 1 ? "Next" : "Submit"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>}
        </>
    )
}