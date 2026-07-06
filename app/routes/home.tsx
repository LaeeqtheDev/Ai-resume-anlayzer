import type { Route } from "./+types/home";
import { Link } from "react-router";
import Navbar from "~/components/Navbar";
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart, ATS-aware feedback for your resume in seconds." },
  ];
}

const categories = [
  { name: "ATS", score: 92 },
  { name: "Tone & Style", score: 84 },
  { name: "Content", score: 78 },
  { name: "Structure", score: 88 },
  { name: "Skills", score: 95 },
];

export default function Landing() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      {/* HERO */}
      <section className="main-section pt-16 pb-8">
        <div className="page-heading gap-6">
          <p className="text-sm font-semibold tracking-wide text-dark-200 uppercase">
            Upload once, know exactly what to fix
          </p>
          <h1>Your resume, scored like a recruiter would.</h1>
          <h2 className="max-w-2xl">
            Drop in a PDF and get an ATS compatibility score, section-by-section
            feedback, and specific rewrites — before the job goes to anyone else.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/auth?next=/upload"
              className="primary-button w-fit text-xl font-semibold px-8 py-4"
            >
              Analyze my resume
            </Link>
            <Link
              to="/auth?next=/dashboard"
              className="back-button text-lg px-6 py-4"
            >
              View my past scans
            </Link>
          </div>
        </div>

        {/* LIVE PRODUCT PREVIEW */}
        <div className="gradient-border shadow-lg mt-6 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-6 bg-white rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row items-center gap-8 w-full justify-center">
              <ScoreGauge score={87} />
              <div className="flex flex-col gap-2 items-start">
                <p className="text-dark-200 text-sm font-medium">
                  Frontend Developer · Google
                </p>
                <p className="text-2xl font-semibold">Overall Score: 87/100</p>
                <ScoreBadge score={87} />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2 border-t border-gray-100 w-full pt-6">
              {categories.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2"
                >
                  <span className="text-sm font-medium text-dark-200">
                    {c.name}
                  </span>
                  <span className="text-sm font-semibold">{c.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="main-section pt-0">
        <div className="page-heading">
          <h3 className="text-3xl font-semibold text-dark-200">
            From upload to insight, three steps.
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
          <Step
            index="01"
            title="Upload"
            description="Drop in your resume PDF and the job description you're targeting."
          />
          <Step
            index="02"
            title="Scan"
            description="Every section is checked against ATS parsing rules, tone, structure, and skills match."
          />
          <Step
            index="03"
            title="Fix"
            description="Get a score per category with specific, actionable tips, not just a number."
          />
        </div>
      </section>

      {/* WHY THESE 5 CATEGORIES */}
      <section className="main-section pt-0 pb-16">
        <div className="page-heading">
          <h3 className="text-3xl font-semibold text-dark-200">
            Five things that decide if you get an interview.
          </h3>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          <Category
            title="ATS"
            description="Can the applicant tracking system actually parse your resume?"
          />
          <Category
            title="Tone & Style"
            description="Does it read as confident and professional, or vague and generic?"
          />
          <Category
            title="Content"
            description="Are your bullet points backed by real, quantified impact?"
          />
          <Category
            title="Structure"
            description="Is the layout scannable in the six seconds a recruiter gives it?"
          />
          <Category
            title="Skills"
            description="Do your listed skills actually match what the job asks for?"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="main-section pt-0 pb-20">
        <div className="gradient-border w-full max-w-2xl">
          <div className="flex flex-col items-center gap-6 bg-white rounded-2xl p-10 text-center">
            <h3 className="text-3xl font-semibold">
              See your score in under a minute.
            </h3>
            <Link
              to="/auth?next=/upload"
              className="primary-button w-fit text-xl font-semibold px-8 py-4"
            >
              Analyze my resume
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const Step = ({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-3 bg-white rounded-2xl p-6 w-full sm:w-[300px]">
    <span className="text-sm font-semibold text-dark-200">{index}</span>
    <h4 className="text-xl font-semibold">{title}</h4>
    <p className="text-dark-200">{description}</p>
  </div>
);

const Category = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col gap-2 bg-white rounded-2xl p-6 w-full sm:w-[280px]">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-sm text-dark-200">{description}</p>
  </div>
);
