import './App.css'
import Header from './components/header'
import Card from './components/card'
// import Quotes from './components/quotes'
import Doodle from './components/doodle_dash'
import Prompt from './components/prompt'
import DailyRituals from './components/daily_rituals'
import FormWrapper from './components/formWrapper'
import TodoList from './components/todoList'
import Star from './components/star'
import {useState, useEffect } from 'react'
import Quotes1 from './components/quotes1'


function LargerGrid({openModal}){
  return <div className='grid'>
            <div className='left-side'>
              <Card>
                <DailyRituals  open = {openModal} />
              </Card>
              <Card >
                  <Quotes1 
                      // data={dataArray !== null ? dataArray : null}   
                  />
              </Card>
            </div>
            <div className="right-side">
              <Card>
                <TodoList />
              </Card>
              <Card>
                <Doodle />
              </Card>
              <Card>
                <Prompt />
              </Card>
            </div>
          </div>
}

function SmallerGrid({openModal}){
  return (
    <>
      <div className='smaller-grid'>
          <Card>
            <DailyRituals open={openModal} />
          </Card>
          <Card>
            <TodoList />
          </Card>
          <Card>
            <Quotes1 />
          </Card>
          <Card>
            <Doodle />
          </Card>
          <Card>
            <Prompt />
          </Card>
      </div>
    </>
  )
}

function App() {  
  const [loaded, setLoaded] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [width, setWidth] = useState(window.innerWidth || null)

  const updateWindowSize = () => {
    console.log(window.innerWidth)
    setWidth(window.innerWidth)
  }
 
  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []); 

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
      {width && width > 982 ? <LargerGrid openModal={openModal}/> : <SmallerGrid openModal={openModal} />}
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
      <button className='contact-btn'><a href='https://www.linkedin.com/in/jayesh-patil-87229a154/' target='_blank' className='contact-us-redirect'>Say Hello!</a></button>
      <div className='bottm-margin'></div>
    </>
  )
}

export default App

// data = {dataArray !== null && dataArray[randomIndex]}