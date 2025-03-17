import React, { useEffect } from 'react'

const Timer = ({ sessionTiming }) => {
    useEffect(() => {
        const curretDate = new Date();
        console.log(Number(sessionTiming.split(":")[0]));



    }, [])


    return (
        <div>Timer</div>
    )
}

export default Timer