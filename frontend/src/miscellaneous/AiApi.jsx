import axios from 'axios'

export const getQuestions = async (prompt) => {
    try {

        const requestData = {
            "contents": [{
                "parts": [{ "text": prompt }]
            }]
        };
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`, requestData, config)
        // console.log(data.candidates[0].content.parts[0].text);
        return data.candidates[0].content.parts[0].text


    } catch (error) {
        console.log(error);


    }

}
export const AnalyzeIntro = async (prompt) => {
    try {

        const requestData = {
            "contents": [{
                "parts": [{ "text": `Analyze the introduction and give short compliment and asked one small question on projects ${prompt}` }]
            }]
        };
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`, requestData, config)
        // console.log(data.candidates[0].content.parts[0].text);
        return data.candidates[0].content.parts[0].text


    } catch (error) {
        console.log(error);


    }

}
export const AnalyzeProjFollowUP = async (prompt) => {
    try {

        const requestData = {
            "contents": [{
                "parts": [{ "text": `Analyze the answer based on the question and reply in 4 lines ${prompt} asked  and give compliment in one line and tell now we are going to move ahead with question and answers ` }]
            }]
        };
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`, requestData, config)
        // console.log(data.candidates[0].content.parts[0].text);
        return data.candidates[0].content.parts[0].text


    } catch (error) {
        console.log(error);


    }

}
export const AskQuestion = async (prompt, tech, level) => {
    try {

        const requestData = {
            "contents": [{
                "parts": [{ "text": `ask one small  question on ${prompt}  ` }]
            }]
        };
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`, requestData, config)
        // console.log(data.candidates[0].content.parts[0].text);
        return data.candidates[0].content.parts[0].text


    } catch (error) {
        console.log(error);


    }

}
export const AnalyzeQuestionAnswer = async (prompt) => {
    try {

        const requestData = {
            "contents": [{
                "parts": [{ "text": `analyze the answer and give two line feedback  ${prompt}  ` }]
            }]
        };
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        const { data } = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`, requestData, config)
        // console.log(data.candidates[0].content.parts[0].text);
        return data.candidates[0].content.parts[0].text


    } catch (error) {
        console.log(error);


    }

}