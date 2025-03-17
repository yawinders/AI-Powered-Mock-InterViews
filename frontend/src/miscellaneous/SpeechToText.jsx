import { color } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AnalyzeIntro, AnalyzeProjFollowUP, AnalyzeQuestionAnswer, AskQuestion } from './AiApi';
import { speakText, speakTextt } from './speakText';
import { useInterviewContext } from '../context/interviewDiscussion.jsx';
import { data } from 'react-router-dom';
import { extractQuestions } from './logics.jsx';
import { useSession } from '../context/Sessions.jsx';
let step = "intro";
const SpeechToText = ({ micOn, segmentLength = 7 }) => {
    const [projFollowUpQ, setProjFollowUpQ] = useState("")
    const [step, setStep] = useState("intro");
    const { tech, level } = useSession()
    console.log(step);
    let count = useRef(1)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const { displayedSentence, setDisplayedSentence, displayedSegment, setDisplayedSegment } = useInterviewContext()

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            console.error("Browser doesn't support speech recognition.");
            return;
        }

        if (micOn && !listening) {
            // Reset the transcript when starting to listen
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
        } else if (!micOn && listening) {
            SpeechRecognition.stopListening();
            if (!transcript.trim()) {
                speakText("I didn't hear anything. Could you please respond?", setDisplayedSentence);
                return; // Do NOT move to the next step
            }

            if (step === "intro") {
                AnalyzeIntro(transcript).then((data) => {
                    speakText(data, setDisplayedSentence);
                    const extractedQuestions = extractQuestions(data);//chekc the exracted quetion
                    console.log(extractQuestions);


                    if (extractedQuestions.length > 0) {
                        setProjFollowUpQ(extractedQuestions);
                        setStep("projFollowUP"); // Move to project follow-up step
                    } else {
                        setStep("question"); // Skip project follow-up if no project details
                    }
                });
            }
            else if (step === "projFollowUP") {
                AnalyzeProjFollowUP(transcript).then((data) => {
                    if (data.trim()) {
                        speakText(data, setDisplayedSentence);
                        setStep("question"); // Move to general questions
                    } else {
                        speakText("Could you clarify your project details?");
                        return; // Do NOT move to next step if no valid response
                    }
                });
            }
            else if (step === "question") {
                AskQuestion(`${tech} ${level} level`).then((data) => {
                    if (data.trim()) {
                        speakText(data, setDisplayedSentence);
                        setStep("answer")
                    } else {
                        speakText("I didn't get that. Could you please elaborate?");
                    }
                });
            }
            else if (step === "answer") {
                AnalyzeQuestionAnswer(transcript).then((data) => {
                    if (data.trim()) {
                        speakText(data, setDisplayedSentence);
                        count++;
                        console.log(count);

                        if (count === 3) {
                            speakText("Thankyou for giving the interview")

                        }
                        setStep("question")
                    } else {
                        speakText("I didn't get that. Could you please elaborate?");
                    }
                });
            }


        }
        console.log(transcript);
    }, [micOn, listening, resetTranscript, browserSupportsSpeechRecognition]);

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
