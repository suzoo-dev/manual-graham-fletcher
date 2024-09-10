import Quiz from "@/app/components/quiz";

export default async function Home() {
  const response = await fetch(
    "https://manual-case-study.herokuapp.com/questionnaires/972423.json"
  );
  const data = await response.json();

  return (
    <div>
      <Quiz questions={data?.questions} />
    </div>
  );
}
