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
    const [previousSession, setPreviousSession] = useState([])

    // const [joinDisabled, setJoinDisabled] = useState(true);

    useEffect(() => {
        if (!userDateTime) return; // Stop if no input

        const checkTime = setInterval(() => {
            const now = new Date();
            const eventTime = new Date(userDateTime);
            const timeDifference = eventTime - now; // Difference in milliseconds

            // Extract only the date part for comparison
            const nowDate = now.toISOString().split("T")[0];
            const eventDate = eventTime.toISOString().split("T")[0];

            if (nowDate === eventDate) { // Ensure both are on the same date
                if (timeDifference > 0 && timeDifference <= 35 * 60 * 1000) {
                    console.log("hii");
                    setShowNotification(true);
                    setNotifications([...notifications, `Interview is Scheduled for ${tech} kindly join before ${userDateTime.split("T")[1]}`]);

                } else if (timeDifference <= -5 * 60 * 1000) {
                    console.log('hello');
                    setShowNotification(false);
                    clearInterval(checkTime); // Stop checking

                    // Updating previous session list
                    setPreviousSession([...previousSession, { tech, level }]);
                }
            }

        }, 10000); // Check every 10 seconds

        return () => clearInterval(checkTime);
    }, [userDateTime]);

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

    // useEffect(() => {
    //   setPreviousSession([...previousSession,...upComingSession?.map((session, idx)=>{
    //     if(session.time)
    //   })])


    // }, [])


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



            setUpComingSession([{ date, time, ampm, tech, level, dateTime }, ...upComingSession])
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


    return (<sessionContext.Provider value={{ level, setLevel, tech, setTech, handleSlotBooking, upComingSession, setUpComingSession, sessionType, setSessionType, showNotification, userDateTime, notifications, setNotifications, setShowNotification, previousSession, setPreviousSession, }}>
        {children}
    </sessionContext.Provider>
    )
}

export default SessionProvider;