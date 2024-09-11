"use client";
import { useRef, useState } from "react";
import LandingPage from "@/app/components/landingPage";

enum QuestionType {
  ChoiceType,
}

type Option = {
  display: string;
  value: string;
  isRejection: boolean;
};

type Question = {
  question: string;
  type: QuestionType;
  options: Option[];
};

const Quiz = ({ questions }: { questions: Question[] }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value.toString();
    setAnswers(newAnswers);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setShowResults(true);
      } else {
        nextQuestion();
      }
    }, 500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleBack = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (showResults) {
      setShowResults(false);
      setCurrentQuestion(questions.length - 1);
    } else if (currentQuestion > 0) {
      previousQuestion();
    } else {
      setShowQuiz(false);
      setCurrentQuestion(0);
      setAnswers(new Array(questions.length).fill(""));
    }
  };

  const backButton = () => (
    <button
      className="mt-4 text-xs leading-8 text-white bg-[#7E0707] px-8 py-4 tracking-widest font-medium"
      onClick={handleBack}
    >
      GO BACK
    </button>
  );

  const renderResults = () => (
    <div className="flex-grow flex flex-col justify-between p-8">
      <h2 className="text-2xl font-medium mb-8">Your Results</h2>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="font-bold">{question.question}</p>
          <p>Your answer: {answers[index]}</p>
        </div>
      ))}
      {backButton()}
    </div>
  );

  const renderQuiz = () => (
    <div className="flex-grow flex flex-col justify-between p-8">
      <h2 className="text-2xl font-medium mb-8 font-med">
        {questions[currentQuestion].question}
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {questions[currentQuestion].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option.value)}
            className={`p-4 border-2 ${
              answers[currentQuestion] === option.value.toString()
                ? "border-[#7E0707]"
                : "border-gray-300"
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: option.display }} />
          </button>
        ))}
      </div>
      {backButton()}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {!showQuiz ? (
        <LandingPage setShowQuiz={setShowQuiz} />
      ) : showResults ? (
        renderResults()
      ) : (
        renderQuiz()
      )}
    </div>
  );
};

export default Quiz;
