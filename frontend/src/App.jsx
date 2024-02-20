import './App.css'
import Header from './components/header'
import Card from './components/card'
import Quotes from './components/quotes'
import Doodle from './components/doodle_dash'
import Prompt from './components/prompt'
import DailyRituals from './components/daily_rituals'
import FormWrapper from './components/formWrapper'
import Star from './components/star'
import {useState, useEffect } from 'react'

function App() {  
  const [loaded, setLoaded] = useState(true);
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }
  const openModal = () => {
    setShowModal(true)
  }

  useEffect(() => {
    setLoaded(false);
  }, [loaded]);
  

  return (
    <>
      <Header />
      <div className='grid'>
        <div className='left-side'>
          <Card>
            <DailyRituals  open = {openModal} />
          </Card>
          <Card >
              <Quotes 
                  // data={dataArray !== null ? dataArray : null}   
              />
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
      {showModal && <FormWrapper close = {closeModal} />}
    </>
  )
}

export default App

// data = {dataArray !== null && dataArray[randomIndex]}