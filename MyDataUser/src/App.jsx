import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyDataUserMain from '../pages/MyDataUserMain'
import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyDataUserMain />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
