import { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import Body from './components/Body/Body'
import Form from './components/Form/Form'
import Hero from "./components/Hero/Hero"
import config from './config/config';
import './App.css'

function App() {

  const [users, setUsers] = useState();

  useEffect(() => {

    // GET users on initial load
    axios.get(config.apiURL)
      .then((data) => {
        console.log(data.data)

        setUsers(data.data.users)
      }).catch((err) => {
        console.log("My word! ther's an error!\n", err)
      })
  }, [])

  return (
    <div className="App">
      <Hero />
      <Body users={users} />
      <Form />
      <div className="copyright">
        <p>copyright &copy; <a href="http://de-marauder.vercel.app" target="_blank" rel="noopener noreferrer">de-marauder</a>  2022</p>
      </div>

    </div>
  )
}

export default App
