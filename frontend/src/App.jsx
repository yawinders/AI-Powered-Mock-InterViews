
import 'regenerator-runtime'
import { useState } from 'react'

import { getQuestions } from './miscellaneous/AiApi'
import Interview from './pages/Interview'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { InterviewProvider } from './context/interviewDiscussion'
import Dashboard from './pages/Dashboard'
import { ChakraProvider } from '@chakra-ui/react'
import SlotBooking from './pages/SlotBooking'
import SessionProvider from './context/Sessions'

function App() {

  const [questions, setQuestions] = useState("")


  return (
    <ChakraProvider>
      <SessionProvider>
        <InterviewProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/slot-booking" element={<SlotBooking />} />
          </Routes>
        </InterviewProvider>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default App
