import { Button, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSession } from '../context/Sessions'

const ButtonComp = ({ handleJoinSession, data, index }) => {
    const [joinDisabled, setJoinDisabled] = useState(true);
    const userDateTime = data.dateTime;
    const { setShowNotification, upComingSession, setUpComingSession, notifications, setNotifications, } = useSession();
    const toast = useToast()
    useEffect(() => {
        const chkTime = setInterval(() => {
            const sessionTime = new Date(userDateTime);
            const currentTime = new Date();
            const timeDifference = sessionTime - currentTime;

            // Enable button if session is within the next 30 minutes
            if (timeDifference > 0 && timeDifference <= 30 * 60 * 1000) {
                setJoinDisabled(false);
                setShowNotification(true);

            }

            // Remove expired sessions
            if (timeDifference <= -5 * 60 * 1000) {
                setUpComingSession(prevSessions => prevSessions.filter((_, i) => i !== index));
                // setNotifications(prevNotifications=>prevNotifications.filter((_,i)=>))
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(chkTime);
    }, [userDateTime, upComingSession]); // Re-run when session list updates


    return (
        <Button colorScheme="orange" size="xs" onClick={handleJoinSession} disabled={joinDisabled}>
            Join
        </Button>
    );
};

export default ButtonComp;