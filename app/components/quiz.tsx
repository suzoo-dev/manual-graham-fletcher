"use client";
import { useState } from "react";
import LandingPage from "@/app/components/landingPage";

enum QuestionType {
  ChoiceType,
}

type Question = {
  question: string;
  type: QuestionType;
  options: [];
};

const Quiz = ({ questions }: { questions: Question[] }) => {
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  console.log(questions);

  return (
    <div>
      {!showQuiz ? (
        <LandingPage setShowQuiz={setShowQuiz} />
      ) : (
        <div>
          QUIZ
          <button
            className={`text-xs leading-8 text-white bg-[#7E0707] px-8 py-4 tracking-widest font-medium`}
            onClick={() => setShowQuiz(false)}
          >
            GO BACK
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
