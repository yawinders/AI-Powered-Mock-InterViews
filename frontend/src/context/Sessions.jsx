import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const sessionContext = createContext();

export const useSession = () => {
    const result = useContext(sessionContext)
    return result;

}

const SessionProvider = ({ children }) => {
    const toast = useToast()
    const [level, setLevel] = useState() // difficulty level of the interview
    const [tech, setTech] = useState()// user selctwhich tech 
    const [sessionType, setSessionType] = useState("Upcoming Session"); //type of session upcoming , previus , cancelled
    const [userDateTime, setUserDateTime] = useState("");
    const [showNotification, setShowNotification] = useState(false); // show the notification of interview
    //  before 30 minutes
    const [notifications, setNotifications] = useState([])
    // console.log(notifications);

    const navigate = useNavigate()
    const [upComingSession, setUpComingSession] = useState([]);

    useEffect(() => {

        if (!userDateTime) return; // Stop if no input

        const checkTime = setInterval(() => {
            const now = new Date();
            const eventTime = new Date(userDateTime);
            const timeDifference = eventTime - now;

            if (timeDifference > 0 && timeDifference <= 30 * 60 * 1000) {
                setShowNotification(true);
                setNotifications([...notifications, `Interview is Scheduled for ${tech} kindly join before ${userDateTime.split("T")[1]}`])

            } else if (timeDifference <= 0) {
                // Event time has passed, remove notification
                setShowNotification(false);
                clearInterval(checkTime); // Stop checking
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(checkTime);
    }, [userDateTime])
    useEffect(() => {
        {
            showNotification && toast({
                title: '',
                description: "You have one new Notification",
                status: 'info',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }


    }, [showNotification])



    function handleSlotBooking(dateTime) {

        const userInputDateAndTime = new Date(dateTime)
        // console.log("userInputDateAndTime", userInputDateAndTime);
        setUserDateTime(dateTime)
        const currentDateAndIime = new Date();
        // console.log("currentDateAndIime", currentDateAndIime);
        if (userInputDateAndTime > currentDateAndIime) {
            const [date, time] = dateTime.split("T");
            const dateObject = new Date(dateTime);
            const ampm = dateObject.getHours() > 12 ? "PM" : "AM";



            setUpComingSession([...upComingSession, { date, time, ampm, tech, level, dateTime }])
            toast({
                description: "Successfully Booked",
                status: "success",
                position: "top",
                isClosable: true,
                duration: 5000,
            })
            navigate('/')
        } else {
            toast({
                description: "Enter valid Time in Future",
                status: "warning",
                isClosable: true,
                duration: 5000,
                position: "top"
            })
            return
        }

    }
    return (<sessionContext.Provider value={{ level, setLevel, tech, setTech, handleSlotBooking, upComingSession, setUpComingSession, sessionType, setSessionType, showNotification, userDateTime, notifications, setNotifications, setShowNotification }}>
        {children}
    </sessionContext.Provider>
    )
}

export default SessionProvider;