import './App.css'
import Header from './components/header'
import Card from './components/card'
import Quotes from './components/quotes'
import Doodle from './components/doodle_dash'
import Prompt from './components/prompt'
import star from './assets/star.png'
import DailyRituals from './components/daily_rituals'
import Form from "./components/form"
import Star from './components/star'
import {useState, useEffect } from 'react'
import { useMemo } from 'react'

function App() {  
  const [loaded, setLoaded] = useState(true);

  const data = {
    "id": 1,
    "question": "How do you prefer to start your day?",
    "options": ["Diving straight into creative work", "Reviewing my to-do list"]
  }

  useEffect(() => {
    setLoaded(false);
  }, [loaded]);
  

  return (
    <>
      <Header />
      <div className='grid'>
        <div className='left-side'>
          <Card >
              <Quotes 
                  // data={dataArray !== null ? dataArray : null}   
              />
          </Card>
          <Card>
            <DailyRituals />
          </Card>
        </div>
        <div className="right-side">
          <Card>
            <Doodle />
          </Card>
          <Card>
            <Prompt />
          </Card>
        </div>
      </div>
      <footer>
        <div className="bottom-star">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </footer>
      <form>
        {/* <Form data={data}/> */}
      </form>
    </>
  )
}

export default App

// data = {dataArray !== null && dataArray[randomIndex]}