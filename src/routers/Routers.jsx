import React from 'react'
import Home from '../pages/Home'
import History from '../pages/History'
import Word from '../pages/Word'
import { Routes,Route } from 'react-router-dom'


function Routers() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='history' element={<History/>}></Route>
      <Route path='word/:value' element={<Word/>}></Route>
    </Routes>
  )
}

export default Routers