import { create } from "zustand";

// The array of questions for the quiz.
export const questions = [
  {
    id: 1,
    questionText:
      "What is the traditional Halloween activity of carving faces into pumpkins?",
    options: [
      "Jack-o'-lanterns",
      "Trick-or-treating",
      "Haunted houses",
      "Costume parties",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText:
      "Which supernatural creature is said to transform into a bat and fly on Halloween night?",
    options: ["Vampire", "Ghost", "Zombie", "Witch"],
    correctAnswerIndex: 0,
  },
  {
    id: 3,
    questionText:
      "What is the most popular Halloween candy in the United States?",
    options: ["M&M's", "Reese's Peanut Butter Cups", "Skittles", "Candy Corn"],
    correctAnswerIndex: 1,
  },
  {
    id: 4,
    questionText:
      "In Mexico, which holiday is celebrated around the same time as Halloween to honor deceased loved ones?",
    options: [
      "Day of the Dead",
      "Halloween",
      "Fiesta de los Muertos",
      "Dia de Halloween",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 5,
    questionText:
      "Which classic monster movie features a scientist who creates a green-skinned creature brought to life by electricity?",
    options: ["The Wolfman", "Frankenstein", "Dracula", "The Mummy"],
    correctAnswerIndex: 1,
  },
  {
    id: 6,
    questionText:
      "What is the name of the famous masked killer in the 'Halloween' film series?",
    options: [
      "Freddy Krueger",
      "Jason Voorhees",
      "Leatherface",
      "Michael Myers",
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 7,
    questionText:
      "In the legend of Sleepy Hollow, what is the name of the headless horseman's famous weapon?",
    options: ["Sword", "Axe", "Dagger", "Pumpkin"],
    correctAnswerIndex: 1,
  },
  {
    id: 8,
    questionText:
      "Which author wrote the novel 'Dracula,' introducing the famous vampire character Count Dracula?",
    options: [
      "Mary Shelley",
      "Edgar Allan Poe",
      "Bram Stoker",
      "H.P. Lovecraft",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 9,
    questionText: "What do people traditionally bob for on Halloween?",
    options: ["Candies", "Apples", "Grapes", "Potatoes"],
    correctAnswerIndex: 1,
  },
  {
    id: 10,
    questionText:
      "Which classic 1993 film features three witch sisters who are resurrected on Halloween night?",
    options: [
      "The Craft",
      "Practical Magic",
      "The Witches of Eastwick",
      "Hocus Pocus",
    ],
    correctAnswerIndex: 3,
  },
];

export const responses = [
  { score: 0, text: "Boo-hoo! You suck at this spooky quiz🪦" },
  { score: 1, text: "Boo-hoo! Time to haunt the Halloween library 👻📚" },
  { score: 2, text: "Boo-hoo! Time to haunt the Halloween library 👻📚" },
  {
    score: 3, text: "Boo! You can do better with some more Halloween knowledge 👻📚",
  },
  {
    score: 4,
    text: "You're getting there, but the spirits are not impressed 👻",
  },
  {
    score: 5,
    text: "You might need a witch's brew to improve your score! 🧪🧙‍♀️",
  },
  {
    score: 6,
    text: "Your Halloween knowledge is in the cauldron, brewing and improving! 🎃📚⚗️",
  },
  { score: 7, text: "You've got a graveyard of knowledge on Halloween! 🦴🩻🪦" },
  { score: 8, text: "Impressive! You're a Halloween aficionado 🧛🦇" },
  { score: 9, text: "You're so spooky-smart, it's scary! 🤓👻" },
  { score: 10, text: "You're a Halloween wizard! 🫶🎃✨" },
];

// This is the main state store for the quiz. It contains the variable "questions", an array empty for the answers, a default index of 0 for the "currentQuestionIndex" and a default state of false for the variable "quizOver"
export const useQuizStore = create((set) => ({
  questions,
  responses,
  answers: [],
  errorMessage: null, // Adds errorMessage to the store instead of using useState
  setErrorMessage: (message) => set({ errorMessage: message }), // Adds setErrorMessage function to the store instead of using useState
  currentQuestionIndex: 0,
  score: 0, // Adds score to the store
  quizOver: false,

  // q = question - This function takes a question id and an answer index, validates them, and then updates the answers array with the user's answer.
  submitAnswer: (questionId, answerIndex) => {
    const question = questions.find((q) => q.id === questionId);

    // Throws an error if there is no question found
    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }

    // Throws an error if the answerIndex isn't in the array of possible answers
    if (question.options[answerIndex] === undefined) {
      throw new Error(
        `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
      );
    }

    // State is updated for the answers array. The set-function takes a callback-function as an argument, which receives the current state as a parameter.
    set((state) => ({
      // Answers array is updated. Creates a new array that includes all the current answers, and adds a new answer to the end of it.
      answers: [
        ...state.answers,
        // Here comes the new answers object
        {
          questionId, // the questions id
          answerIndex, // the index of the selected answer
          question, // the question object
          answer: question.options[answerIndex], // the text of the selected answer, comes from the options using the answerIndex
          isCorrect: question.correctAnswerIndex === answerIndex, // A boolean indicating whether the selected answer is correct. Determined by comparing the answerIndex with the correctAnswerIndex in the question object.
        },
      ],
      // Increase the score if the answer is correct
      score:
        question.correctAnswerIndex === answerIndex
          ? state.score + 1
          : state.score,
    }));
  },

  // This function increments the currentQuestionIndex to move to the next question. If there are no more questions, it sets quizOver to true.
  goToNextQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        return { quizOver: true };
      } else {
        return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
    });
  },

  // This function resets the answers array, currentQuestionIndex, and quizOver to their initial states.
  restart: () => {
    set({
      answers: [],
      currentQuestionIndex: 0,
      quizOver: false,
      score: 0,
      responses: responses,
    });
  },
}));
