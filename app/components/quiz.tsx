"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import LandingPage from "@/app/components/landingPage";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const OptionButton = React.memo(
  ({
    option,
    isSelected,
    onClick,
  }: {
    option: Option;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (contentRef.current) {
        contentRef.current.innerHTML = option.display;
      }
    }, [option.display]);

    return (
      <motion.button
        layout
        onClick={onClick}
        className={`p-4 border-2 ${
          isSelected ? "border-[#7E0707]" : "border-gray-300"
        } rounded-lg transition-all duration-300 ease-in-out`}
      >
        <div ref={contentRef} />
      </motion.button>
    );
  }
);

OptionButton.displayName = "OptionButton";

const Quiz = ({ questions }: { questions: Question[] }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const [isRejection, setIsRejection] = useState<boolean>(false);
  const [direction, setDirection] = useState(1);

  const handleAnswer = useCallback(
    (value: string, rejection: boolean) => {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = value.toString();
        return newAnswers;
      });
      setIsRejection(rejection);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (currentQuestion === questions.length - 1 || rejection) {
          setShowResults(true);
        } else {
          setDirection(1);
          setCurrentQuestion((prev) => prev + 1);
        }
      }, 250);
    },
    [currentQuestion, questions.length]
  );

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
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
      setDirection(1);
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
    <div className="flex-grow flex flex-col justify-between text-center p-8">
      <h2 className="text-2xl font-medium font-med mb-8">Your Result</h2>
      {isRejection ? (
        <p className="text-lg font-medium font-med">
          Unfortunately, we are unable to prescribe this medication for you.
          This is because finasteride can alter the PSA levels, which may be
          used to monitor for cancer. You should discuss this further with your
          GP or specialist if you would still like this medication.
        </p>
      ) : (
        <p className="text-lg font-medium font-med">
          Great news! We have the perfect treatment for your hair loss. Proceed
          to <a href="www.manual.co">www.manual.co</a>, and prepare to say hello
          to your new hair!
        </p>
      )}
      {backButton()}
    </div>
  );

  const renderQuiz = () => (
    <div className="flex-grow flex flex-col justify-around p-8">
      <AnimatePresence mode="wait">
        <motion.h2
          key={`question-${currentQuestion}`}
          initial={{ x: 300 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300 * direction, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-medium font-med text-center"
        >
          {questions[currentQuestion].question}
        </motion.h2>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={`options-${currentQuestion}`}
          initial={{ x: 300 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300 * direction, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {questions[currentQuestion].options.map((option, idx) => (
            <OptionButton
              key={`${currentQuestion}-${idx}`}
              option={option}
              isSelected={answers[currentQuestion] === option.value.toString()}
              onClick={() => handleAnswer(option.value, option.isRejection)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
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
