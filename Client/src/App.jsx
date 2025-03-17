import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LandingPage from './Pages/LandingPage'
import CustomErrorPage from './Pages/CustomErrorPage'
import JoinCommunity from './Pages/JoinCommunity'

import Project_submission from './Pages/Project_submission'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<CustomErrorPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/join-community" element={<JoinCommunity />} />
          <Route path="/project-submission" element={<Project_submission />} />
        </Routes>
      </Router>
    </>
  )
}

export default App