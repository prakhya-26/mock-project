import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Auth } from './pages/auth'
import { ExpenseTracker } from './pages/expense-tracker'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />}/>
          <Route path="/expense-tracker" element = {<ExpenseTracker />}/>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
