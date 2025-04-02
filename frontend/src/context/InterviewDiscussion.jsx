import { createContext, useContext, useState } from "react";


const interviewContext = createContext();
export const useInterviewContext = () => {
    const result = useContext(interviewContext);
    return result;
}

export const InterviewProvider = ({ children }) => {
    const [displayedSentence, setDisplayedSentence] = useState(''); //ai speech from text to speech
    const [displayedSegment, setDisplayedSegment] = useState(''); //speech to text segment 
    const [startInteview, setStartInteview] = useState(false)

    const [questionCount, setQuestionCount] = useState(0);
    const [interviewTranscript, setInterviewTranscript] = useState([]);
    return (
        <interviewContext.Provider value={{ displayedSentence, setDisplayedSentence, displayedSegment, setDisplayedSegment, questionCount, setQuestionCount, interviewTranscript, setInterviewTranscript, startInteview, setStartInteview }}>

            {children}

        </interviewContext.Provider>
    )
}