import { create } from "zustand";

const questions = [
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

const useQuizStore = create((set) => ({
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,

  submitAnswer: (questionId, answerIndex) => {
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }

    if (question.options[answerIndex] === undefined) {
      throw new Error(
        `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
      );
    }

    set((state) => ({
      answers: [
        ...state.answers,
        {
          questionId,
          answerIndex,
          question,
          answer: question.options[answerIndex],
          isCorrect: question.correctAnswerIndex === answerIndex,
        },
      ],
    }));
  },

  goToNextQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        return { quizOver: true };
      } else {
        return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
    });
  },

  restart: () => {
    set({
      answers: [],
      currentQuestionIndex: 0,
      quizOver: false,
    });
  },
}));

export default useQuizStore;
