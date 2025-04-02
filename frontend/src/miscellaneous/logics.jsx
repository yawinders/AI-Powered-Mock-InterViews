export function extractQuestions(text) {
    // Regular expression to match sentences ending with a question mark
    console.log(text);

    const questionRegex = /[^.?!]*(\?+)/g;
    const questions = text.match(questionRegex);
    console.log(questions);

    return questions || [];
}


export const generateReport = () => {
    let totalScore = 0;
    const responses = interviewTranscript.map((entry) => {
        const score = evaluateAnswer(entry.aiSuggestion); // Function to score responses
        totalScore += score;
        return { ...entry, score };
    });

    const avgScore = totalScore / responses.length;
    const rating = Math.round(avgScore); // Round to nearest whole number
    const compliment = getCompliment(rating);

    const report = {
        candidateName: "John Doe", // Replace with actual user input
        date: new Date().toLocaleString(),
        responses,
        finalRating: `${rating}/10`,
        compliment
    };

    console.log("Interview Report:", report);

    alert(`Interview Completed!\nFinal Rating: ${rating}/10\nCompliment: ${compliment}`);
};


const evaluateAnswer = (aiSuggestion) => {
    if (!aiSuggestion) return 1; // No response, very low score

    if (aiSuggestion.includes("perfect") || aiSuggestion.includes("excellent")) return 10;
    if (aiSuggestion.includes("very good") || aiSuggestion.includes("well explained")) return 9;
    if (aiSuggestion.includes("good") || aiSuggestion.includes("clear understanding")) return 8;
    if (aiSuggestion.includes("satisfactory") || aiSuggestion.includes("can be improved")) return 6;
    if (aiSuggestion.includes("needs improvement") || aiSuggestion.includes("lacks depth")) return 4;
    return 2; // If the response is poor
};

const getCompliment = (rating) => {
    if (rating === 10) return "Outstanding";
    if (rating >= 8) return "Excellent Work";
    if (rating >= 6) return "Good Effort";
    if (rating >= 4) return "Needs Improvement";
    return "Try Harder";
};
