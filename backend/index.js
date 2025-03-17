import express from 'express'

const app = express()



app.get('/', (req, res) => {
    res.send("welcome to Ai Mock Interview Backend---")
})


export default app;