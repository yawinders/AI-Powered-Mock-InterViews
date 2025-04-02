import { color } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AnalyzeIntro, AnalyzeProjFollowUP, AnalyzeQuestionAnswer, AskQuestion } from './AiApi';
import { speakText, speakTextt } from './speakText';
import { useInterviewContext } from '../context/interviewDiscussion.jsx';
import { data } from 'react-router-dom';
import { extractQuestions, generateReport } from './logics.jsx';
import { useSession } from '../context/Sessions.jsx';



const SpeechToText = ({ micOn, segmentLength = 7 }) => {
    const [projFollowUpQ, setProjFollowUpQ] = useState("")
    const [step, setStep] = useState("intro");
    const { tech, level } = useSession()
    console.log(step);
    let count = useRef(1)
    const {
        transcript,  //whatever the user speaks
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const { displayedSentence, setDisplayedSentence, displayedSegment, setDisplayedSegment, interviewTranscript, setInterviewTranscript, questionCount, setQuestionCount, startInteview, setStartInteview } = useInterviewContext()
    console.log(questionCount);
    console.log(interviewTranscript);


    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            console.error("Browser doesn't support speech recognition.");
            return;
        }

        if (micOn && !listening) {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
        }
        else if (!micOn && listening) {
            SpeechRecognition.stopListening();


            if (!transcript.trim()) {
                speakText("I didn't hear anything. Could you please respond?", setDisplayedSentence);
                return;
            }

            if (step === "intro") {
                AnalyzeIntro(transcript).then((data) => {
                    speakText(data, setDisplayedSentence);
                    const extractedQuestions = extractQuestions(data);

                    if (extractedQuestions.length > 0) {
                        setProjFollowUpQ(extractedQuestions);
                        setStep("projFollowUP");
                    } else {
                        setStep("question");
                    }
                });
                resetTranscript();
            }
            else if (step === "projFollowUP") {
                const currentQuestion = projFollowUpQ.shift(); // Take the first follow-up question
                speakText(currentQuestion, setDisplayedSentence);

                AnalyzeProjFollowUP(transcript).then((data) => {
                    if (data.trim()) {
                        speakText(data, setDisplayedSentence);

                        // Store Project Follow-Up question, answer, and AI suggestion
                        setInterviewTranscript(prev => [
                            ...prev,
                            {
                                stage: "Project Follow-Up",
                                question: currentQuestion,
                                answer: transcript,
                                aiSuggestion: data
                            }
                        ]);

                        setStep("question");
                    } else {
                        speakText("Could you clarify your project details?");
                    }
                });
            }
            else if (step === "question") {
                AskQuestion(`${tech} ${level} level`).then((data) => {
                    if (data.trim()) {
                        speakText(data, setDisplayedSentence);
                        setStep("answer");

                        // Temporarily store the question
                        setInterviewTranscript(prev => [
                            ...prev,
                            { stage: "General Question", question: data }
                        ]);
                    } else {
                        speakText("I didn't get that. Could you please elaborate?");
                    }
                });
            }
            else if (step === "answer") {
                AnalyzeQuestionAnswer(transcript).then((data) => {
                    if (data.trim()) {
                        speakText(data, setDisplayedSentence);

                        // Update the last stored question with answer and AI suggestion
                        setInterviewTranscript(prev => {
                            const updatedTranscript = [...prev];
                            updatedTranscript[updatedTranscript.length - 1] = {
                                ...updatedTranscript[updatedTranscript.length - 1],
                                answer: transcript,
                                aiSuggestion: data
                            };
                            return updatedTranscript;
                        });

                        setQuestionCount(prevCount => prevCount + 1);

                        if (questionCount + 1 === 3) {
                            speakText("Thank you for giving the interview.");
                            // setStartInteview(false)
                            generateReport(); // Call the report function
                            return;
                        }

                        setStep("question");
                    } else {
                        speakText("I didn't get that. Could you please elaborate?");
                    }
                });
            }


        }
    }, [micOn, listening, resetTranscript, browserSupportsSpeechRecognition, questionCount]);

    useEffect(() => {
        const words = transcript.split(' ');
        if (words.length >= segmentLength) {
            const segment = words.slice(-segmentLength).join(' ');
            setDisplayedSegment(segment);
        }
    }, [transcript, segmentLength]);
    return (
        <div>
            <p style={{ color: 'white', zIndex: 500 }}>{transcript}</p>
        </div>
    );
};

export default SpeechToText;
