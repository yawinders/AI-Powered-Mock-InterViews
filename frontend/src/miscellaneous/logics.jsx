export function extractQuestions(text) {
    // Regular expression to match sentences ending with a question mark
    console.log(text);

    const questionRegex = /[^.?!]*(\?+)/g;
    const questions = text.match(questionRegex);
    console.log(questions);

    return questions || [];
}
