import React from 'react'
import AllDogs from './allDogs/AllDogs';
import style from "./home.module.css"
import NavBar from "../navBar/NavBar"

const Home = () => {
  
  return (
    <div>
      <NavBar />
      <h1 className={style.title}>♥We love our dogs♥</h1>
      <AllDogs/>
    </div>
  )
}

export default Home;