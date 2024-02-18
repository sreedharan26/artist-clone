import { useState, useEffect } from "react"
import axios from "axios"
import Form from "./form"
import "../styles/formwrapper.css"
import guessPersonality from "../functions/personality"

export default function FormWrapper({close}){
    const [responseData, setResponseData] = useState(null)
    const [formIndex, setFormIndex] = useState(0)
    const [artistsData, setArtistsData] = useState(null)
    const data = [
        {
            id: 1,
            question: "How do you prefer to start your day?",
            options: ["Early morning exercise","A strong cup of coffee or tea","Diving straight into creative work", "Reviewing my to-do list"],
            res: ""
        },
        {
            id: 2,
            question: "When do you feel most creative?",
            options: ["Early morning", "Late at night", "Afternoon", "My creativity doesn't follow a schedule"],
            res: ""
        },
        {
            id: 3,
            question: "What kind of environment do you prefer for your creative work?",
            options: ["Quiet and isolated", "Busy and vibrant","Outdoors, close to nature", "Wherever I find inspiration"],
            res: ""
        },
        {
            id: 4,
            question: "Which habit best supports your creativity?",
            options: ["Regular exercise", "Reading and research", "Meditation or mindfulness", "Social interactions"],
            res: ""
        },
        {
            id: 5,
            question: "What do you rely on to fuel your creative sessions?",
            options: ["Coffee or tea", "Music", "Breaks and naps", "Snacks and drinks"],
            res: ""
        },
        {
            id: 6,
            question: "Which do you prefer to use in your creative work?",
            options: ["Pen and paper", "Digital devices (computer, tablet)", "Art supplies (paint, canvas)", "Musical instruments"],
            res: ""
        },
        {
            id: 7,
            question: "How do you deal with distractions while working?",
            options: ["I seek complete isolation", "I work through them", "I use them as inspiration", "I take a break and then continue"],
            res: ""
        },
        {
            id: 8,
            question: "What is your go-to method for overcoming creative blocks?",
            options: ["Switch to a different activity", "Force myself through the block", "Seek inspiration from others", "Rest and return with a fresh perspective"],
            res: ""
        },
        {
            id: 9,
            question: "How do you pace your creative output?",
            options: ["Set daily goals", "Work in bursts of inspiration", "Maintain a steady pace", "My output is unpredictable"],
            res: ""
        },
        {
            id: 10,
            question: "How do you feel about sharing your work with others?",
            options: ["I prefer to keep it to myself until it's finished", "I regularly seek feedback", "I enjoy collaborative projects", "I share my work selectively for inspiration"],
            res: ""
        },
        {
            id: 11,
            question: "What's your ideal way to end a day of creative work?",
            options: ["Relaxing with a book or movie", "Socializing with friends or family", "Reflecting on the day's work", "Planning for the next day"],
            res: ""
        },
        {
            id: 12,
            question: "Where do you find most of your creative inspiration?",
            options: ["In nature", "In everyday life", "In art and literature", "In personal experiences"],
            res: ""
        },
        {
            id: 13,
            question: "How flexible are you with your creative routines?",
            options: ["Very flexible, I adapt as needed", "Somewhat flexible, within limits", "Not very flexible, I stick to my routines", "Completely inflexible, I need consistency"],
            res: ""
        },
        {
            id: 14,
            question: "What drives your creative pursuits?",
            options: ["Personal satisfaction", "Recognition and accolades", "The desire to express myself", "The urge to innovate and experiment"],
            res: ""
        },
        {
            id: 15,
            question: "How do you rest and recharge for more creativity?",
            options: ["Physical activities and sports", "Quiet time alone", "Engaging in different forms of art", "Traveling or exploring new places"],
            res: ""
        }
    ]

    const fetchData = async () => {
        try{
            const res = await axios.get('https://artist-rituals.onrender.com/artistData')
            setArtistsData(res.data)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        const res = data.map((obj, i) => (
            { id : obj.id, question: obj.question, selected:[]}
       ))
       setResponseData(res)  
    //    console.log(res)
            fetchData()
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if(formIndex < data.length - 1)
            handleNext() 
        else{
            close()
            // alert('Form Submitted')
            console.log(responseData)
            const artists = guessPersonality(artistsData, responseData)
            console.log(artists)
        } 
    }    

    return (
        <>
            <div className="modal-wrapper" onClick={close}>
            </div>
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
                                <button type="button" disabled={formIndex === 0} onClick={handlePrev}>previous</button>
                                <button type="submit">{formIndex < data.length - 1 ? "Next" : "Submit"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}