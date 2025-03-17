export function speakTextt(text, voiceName = null, pitch = 1, rate = 0.7) {
    // Check if the browser supports speech synthesis
    console.log(window.speechSynthesis);

    if (!window.speechSynthesis) {
        console.error('Speech synthesis is not supported in this browser.');
        return;
    }

    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(text);

    // Set the pitch and rate
    utterance.pitch = pitch; // Range between 0 (lowest) and 2 (highest)
    utterance.rate = rate;   // Range between 0.1 (slowest) and 10 (fastest)

    // Get the list of available voices
    const voices = window.speechSynthesis.getVoices();

    // If a specific voice is requested, find and set it
    if (voiceName) {
        const selectedVoice = voices.find(voice => voice.name === voiceName);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        } else {
            console.warn(`Voice "${voiceName}" not found. Using default voice.`);
        }
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);
}
// Function to synchronize text display with speech synthesis


// Function to split text into sentences
const splitTextIntoSentences = (text) => {
    // Regular expression to match sentences ending with ., !, or ?
    return text.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+/g) || [];
};

// Function to speak text sentence by sentence
export const speakText = (text, updateDisplayedSentence, voiceName = null, pitch = 1, rate = 0.7) => {
    // Check if the browser supports speech synthesis
    if (!window.speechSynthesis) {
        console.error('Speech synthesis is not supported in this browser.');
        return;
    }

    // Split the text into sentences
    const sentences = splitTextIntoSentences(text);
    let currentSentenceIndex = 0;

    // Function to speak the next sentence
    const speakNextSentence = () => {
        if (currentSentenceIndex < sentences.length) {
            const sentence = sentences[currentSentenceIndex].trim();
            if (sentence) {
                // Create a new SpeechSynthesisUtterance instance
                const utterance = new SpeechSynthesisUtterance(sentence);

                // Set the pitch and rate
                utterance.pitch = pitch; // Range between 0 (lowest) and 2 (highest)
                utterance.rate = rate;   // Range between 0.1 (slowest) and 10 (fastest)

                // Get the list of available voices
                const voices = window.speechSynthesis.getVoices();

                // If a specific voice is requested, find and set it
                if (voiceName) {
                    const selectedVoice = voices.find(voice => voice.name === voiceName);
                    if (selectedVoice) {
                        utterance.voice = selectedVoice;
                    } else {
                        console.warn(`Voice "${voiceName}" not found. Using default voice.`);
                    }
                }

                // Update the displayed sentence
                updateDisplayedSentence(sentence);

                // Set up the event handler for when the sentence has finished speaking
                utterance.onend = () => {
                    currentSentenceIndex++;
                    speakNextSentence();
                };

                // Speak the sentence
                window.speechSynthesis.speak(utterance);
            } else {
                // Skip empty sentences
                currentSentenceIndex++;
                speakNextSentence();
            }
        } else {
            // All sentences have been spoken; clear the displayed sentence
            updateDisplayedSentence('');
        }
    };

    // Start speaking the first sentence
    speakNextSentence();
};

