import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Icon, IconButton, Text } from '@chakra-ui/react'

import DraggableWebcam from '../components/DraggableCamera.jsx'
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md'
import { speakText } from '../miscellaneous/speakText.jsx'
import { prompts } from '../miscellaneous/prompts.jsx'
import SpeechToText from '../miscellaneous/SpeechToText.jsx'
import { useInterviewContext } from '../context/interviewDiscussion.jsx'
import { useLocation } from 'react-router-dom'
import Timer from '../components/Timer.jsx'

const Interview = ({ level, topic }) => {
    const [startInteview, setStartInteview] = useState(false)
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    // const [displayedSentence, setDisplayedSentence] = useState('');
    const { displayedSentence, setDisplayedSentence, displayedSegment, setDisplayedSegment } = useInterviewContext()


    const location = useLocation()
    const upComingSession = location?.state?.data;
    console.log(upComingSession);


    const webcamRef = useRef(null);


    useEffect(() => {
        const tid = setInterval(() => {
            const currentTime = new Date();
            const [userHours, userMinutes] = upComingSession.time.split(":").map(Number);

            // Get user's scheduled time for today
            const userTime = new Date();
            userTime.setHours(userHours, userMinutes, 0, 0); // Set hours & minutes, reset seconds & ms

            // Compare only hours & minutes
            if (
                userTime.getHours() <= currentTime.getHours() &&
                userTime.getMinutes() <= currentTime.getMinutes()
            ) {
                setIsLoading(false);
                clearInterval(tid); // Stop checking after match
                handleStartInterview();
            }

        }, 1000)

        return () => {
            clearInterval(tid)
        }
    }, [upComingSession.time])

    const handleStartInterview = () => {
        setStartInteview(true)
        setIsCameraOn(true)
        // setIsMicOn(true)
        setTimeout(() => {
            // speakTextt(prompts[0]); 'Google UK English Female', 1, 0.7
            speakText(`welcome to. Mock InterView of ${upComingSession.tech} By AI,  Answer the Questions Clearly, and Follow the Rules to Answer`, setDisplayedSentence, 'Google UK English Female', 1, 0.9);
            speakText(prompts[0], setDisplayedSentence, 'Google UK English Female', 1, 0.9);
        }, 5000)

    }

    const toggleMic = () => {
        if (startInteview) {
            setIsMicOn(prevMicOn => !prevMicOn);

        }
    };

    return (
        <Box
            w="80%"
            mx={'auto'}
            mt={20}
            borderRight="2px solid gray"
            borderLeft="2px solid gray"
        >
            {!startInteview && <Text align="center" fontSize="2xl" mb={2} color="black">You Interview will Begin Shortly on {upComingSession.time} {upComingSession.ampm} <Button isLoading={isLoading}></Button> </Text>}
            <Box
                width="90%"
                mx="auto"
                border="1px solid black"
                borderRadius="5px"
                bgColor="black"
                color="white"
                height="70vh"
            >


                <DraggableWebcam isCameraOn={isCameraOn} setIsCameraOn={setIsCameraOn} isMicOn={isMicOn} setIsMicOn={setIsMicOn} />
                {startInteview ? null : <Button variant={'outline'} bgColor={'green.700'} onClick={handleStartInterview} disabled={isLoading}>Start</Button>}
                {displayedSentence && displayedSentence}
                <SpeechToText micOn={isMicOn} />
            </Box>
            <Flex
                justifyContent={'center'}
                gap={10}
                mt={10}
            >
                <IconButton
                    aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                    icon={isCameraOn ? <MdVideocam /> : <MdVideocamOff />}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    cursor={'pointer'}
                    fontSize="24px"
                    variant="outline"
                    colorScheme={isCameraOn ? 'green' : 'red'}
                />
                <IconButton
                    // aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                    icon={isMicOn ? <MdMic /> : <MdMicOff />}
                    onClick={toggleMic}
                    cursor={'pointer'}
                    fontSize="24px"
                    variant="outline"
                    colorScheme={isCameraOn ? 'green' : 'red'}
                />
            </Flex>
        </Box>
    )
}

export default Interview