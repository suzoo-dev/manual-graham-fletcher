"use client";
import Image from "next/image";
import logo from "@/public/Symbol.png";
import hairImage from "@/public/Hair-Photo.png";
import edImage from "@/public/ED-Photo.png";
import React, { ReactElement, useState } from "react";

const paragraphText = (): ReactElement => (
  <p className={`mb-8 text-lg leading-8 text-primary font-medium font-sans`}>
    {`We're working around the clock to bring you a holistic approach to
    your wellness. From top to bottom, inside and out.`}
  </p>
);

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
        <div>
          {/* Hero */}
          <div
            className="p-10 flex flex-col w-full h-[750px]"
            style={{
              backgroundImage: "url('BG.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-row w-full justify-around">
              <div className="flex flex-col w-[468px]">
                <div className="mb-40">
                  <Image src={logo} alt="MANUAL logo" />
                </div>
                <h1
                  className={`mb-8 text-8xl text-primary font-medium font-med`}
                >
                  Be good to yourself
                </h1>
                {paragraphText()}
                <div>
                  <button
                    className={`text-xs leading-8 text-white bg-[#7E0707] px-8 py-4 tracking-widest font-medium font-med`}
                    onClick={() => setShowQuiz(true)}
                  >
                    TAKE THE QUIZ
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* Hair */}
          <div className="flex flex-col w-full">
            <h1
              className={`flex items-center text-center justify-center text-4xl text-primary h-16 w-full mt-16 mb-16 font-medium font-med`}
            >
              What we can help with
            </h1>
            <div className="flex flex-row justify-around mb-20">
              <div className="ml-28">
                <Image src={hairImage} alt="Male head showing hair" />
              </div>
              <div className="flex flex-col justify-center w-[372px] mr-28">
                <h4 className={`text-xs leading-10 font-medium font-med`}>
                  HAIR LOSS
                </h4>
                <h2
                  className={`text-3xl font-medium mb-4 font-med`}
                >{`Hair loss needn't be irreversible. We can help!`}</h2>
                {paragraphText()}
              </div>
            </div>
            {/* ED */}
            <div className="flex flex-row justify-around mb-20">
              <div className="flex flex-col justify-center w-[372px] ml-28">
                <h4 className={`text-xs leading-10 font-medium font-med`}>
                  ERECTILE DYSFUNCTION
                </h4>
                <h2 className={`text-3xl font-medium mb-4 font-med`}>
                  Erections can be a tricky thing. But no need to feel down!
                </h2>
                {paragraphText()}
              </div>
              <div className="mr-28">
                <Image src={edImage} alt="Male head shot" />
              </div>
            </div>
            {/* Footer */}
            <div
              className={`flex flex-row justify-around items-center bg-[#E8EFE9] w-full h-[440px] font-medium`}
            >
              <div className="flex justify-center items-center text-center">
                <Image src={logo} alt="MANUAL logo" width={40} />
              </div>
              <div>
                <h4
                  className={`text-sm text-primary mb-4 font-medium font-sans`}
                >
                  Product
                </h4>
                <ul className="space-y-6 text-primary font-med">
                  <li>Popular</li>
                  <li>Trending</li>
                  <li>Guided</li>
                  <li>Products</li>
                </ul>
              </div>
              <div>
                <h4
                  className={`text-sm text-primary mb-4 font-medium font-sans`}
                >
                  Company
                </h4>
                <ul className="space-y-6 text-primary font-med">
                  <li>Press</li>
                  <li>Mission</li>
                  <li>Strategy</li>
                  <li>About</li>
                </ul>
              </div>
              <div>
                <h4
                  className={`text-sm text-primary mb-4 font-medium font-sans`}
                >
                  Info
                </h4>
                <ul className={`space-y-6 text-primary font-med`}>
                  <li>Support</li>
                  <li>Customer Service</li>
                  <li>Get Started</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center text-center justify-center text-sm h-20 bg-[#E8EFE9] font-sans">
              © 2021 Manual. All rights reserved.
            </div>
          </div>
        </div>
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
