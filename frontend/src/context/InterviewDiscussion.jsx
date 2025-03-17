import { createContext, useContext, useState } from "react";


const interviewContext = createContext();
export const useInterviewContext = () => {
    const result = useContext(interviewContext);
    return result;
}

export const InterviewProvider = ({ children }) => {
    const [displayedSentence, setDisplayedSentence] = useState(''); //ai speech from text to speech
    const [displayedSegment, setDisplayedSegment] = useState(''); //speech to text segment 
    return (
        <interviewContext.Provider value={{ displayedSentence, setDisplayedSentence, displayedSegment, setDisplayedSegment }}>

            {children}

        </interviewContext.Provider>
    )
}