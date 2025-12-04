import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCardStatic = ({ resume }: { resume: Resume }) => {
  const { id, companyName, jobTitle, feedback, imagePath } = resume;

  return (
    <Link to={`/resume/${id}`} className="resume-card">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">{companyName}</h2>
          <h3 className="text-gray-500">{jobTitle}</h3>
        </div>
        <ScoreCircle score={feedback.overallScore} />
      </div>

      <div className="gradient-border">
        <img
          src={imagePath}
          alt="resume-preview"
          className="w-full h-[350px] object-cover object-top"
        />
      </div>
    </Link>
  );
};

export default ResumeCardStatic;
