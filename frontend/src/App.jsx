// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header'
import Card from './components/card'
import Quotes from './components/quotes'
import Doodle from './components/doodle_dash'
import Prompt from './components/prompt'
import star from './assets/star.png'
import DailyRituals from './components/daily_rituals'

function App() {

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
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
                      <img src={star} />
        </div>
      </footer>
    </>
  )
}

export default App

// data = {dataArray !== null && dataArray[randomIndex]}