import Image from "next/image";
import Link from "next/link";
import { ttNormsMed } from "./layout";
import logo from "../public/Symbol.png";
import hairImage from "../public/Hair-Photo.png";
import edImage from "../public/ED-Photo.png";

const paragraphText = () => (
  <p className={`mb-8 text-lg leading-8 text-primary ${ttNormsMed.className}`}>
    {`We're working around the clock to bring you a holistic approach to
    your wellness. From top to bottom, inside and out.`}
  </p>
);

export default async function Home() {
  const response = await fetch(
    "https://manual-case-study.herokuapp.com/questionnaires/972423.json"
  );
  const data = await response.json();
  console.log(data);
  return (
    <div>
      {/* Hero */}
      <div
        className="bg-secondary p-10 flex flex-col w-full h-[750px]"
        style={{ backgroundImage: "url('BG.png')" }}
      >
        <div className="flex flex-row w-full justify-around">
          <div className="flex flex-col w-[468px]">
            <div className="mb-40">
              <Image src={logo} alt="MANUAL logo" />
            </div>
            <h1
              className={`mb-8 text-8xl text-primary ${ttNormsMed.className}`}
            >
              Be good to yourself
            </h1>
            {paragraphText()}
            <div>
              <Link
                href="/quiz"
                replace
                className={`text-xs leading-8 text-white bg-[#7E0707] px-8 py-4 tracking-widest ${ttNormsMed.className}`}
              >
                TAKE THE QUIZ
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      {/* Hair */}
      <div className="flex flex-col w-full">
        <h1
          className={`flex items-center text-center justify-center text-4xl text-primary h-16 w-full mt-16 mb-16 ${ttNormsMed.className}`}
        >
          What we can help with
        </h1>
        <div className="flex flex-row justify-around mb-20">
          <div className="ml-28">
            <Image src={hairImage} alt="Male head showing hair" />
          </div>
          <div className="w-[372px] mr-28">
            <h4 className={`text-xs leading-10 ${ttNormsMed.className}`}>
              HAIR LOSS
            </h4>
            <h2
              className={`text-3xl ${ttNormsMed.className} mb-4`}
            >{`Hair loss needn't be irreversible. We can help!`}</h2>
            {paragraphText()}
          </div>
        </div>
        <div className="flex flex-row justify-around mb-20">
          <div className="w-[372px] ml-28">
            <h4 className={`text-xs leading-10 ${ttNormsMed.className}`}>
              ERECTILE DYSFUNCTION
            </h4>
            <h2 className={`text-3xl ${ttNormsMed.className} mb-4`}>
              Erections can be a tricky thing. But no need to feel down!
            </h2>
            {paragraphText()}
          </div>
          <div className="mr-28">
            <Image src={edImage} alt="Male head shot" />
          </div>
        </div>
      </div>
    </div>
  );
}
