import { useQuizStore } from "../../stores/useQuizStore";
import { ButtonLink } from "../../components/ButtonLink/ButtonLink";
import "./SummaryPage.css";

export const SummaryPage = () => {
  // Gets the score and saves it in a variable named score
  const score = useQuizStore((state) => state.score);
  // Gets the response object from the store, and saves them in a variable named responses
  const responses = useQuizStore((state) => state.responses);
  // Gets the restart function from the store and saves it in a variable
  const restartQuiz = useQuizStore((state) => state.restart);
  // Determine the response text based on the user's score
  const response = responses.find((response) => response.score === score);

  return (
    <div className="summary-wrapper">

      <h1 className="completed-text">Quiz Completed!</h1>
      {/* Shows the users total score */}
      <h2 className="score-text">Your Score: {score} / 10</h2>

      {/* Show the response text that comes from the store */}
      <p className="response-text">{response.text}</p>
      {/* Button to restart the quiz */}
      <ButtonLink
        path="/" // or use 'to' for routing, e.g., "/question-page"
        onClick={restartQuiz}
        ariaLabel="Restart the Quiz"
        label="Restart the Quiz"
      />
    </div>
  );
};
