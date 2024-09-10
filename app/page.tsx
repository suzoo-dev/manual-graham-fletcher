import Image from "next/image";
import Link from "next/link";
import { ttNormsMed } from "./layout";
import logo from "../public/Symbol.png";

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
            <p
              className={`mb-8 text-lg leading-8 text-primary ${ttNormsMed.className}`}
            >
              We’re working around the clock to bring you a holistic approach to
              your wellness. From top to bottom, inside and out.
            </p>
            <div>
              <Link
                href="/quiz"
                replace
                className={`text-xs leading-8 text-white bg-[#7E0707] px-8 py-4 ${ttNormsMed.className}`}
              >
                TAKE THE QUIZ
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
