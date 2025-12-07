// tests/unit/ResumeCard.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router"; // Needed for React Router context
import ResumeCard from "~/components/ResumeCard";

// Mock a Resume object
const mockResume: Resume = {
  id: "1",
  companyName: "ABC Corp",
  jobTitle: "Frontend Developer",
  imagePath: "photo.png",
  resumePath: "resume.pdf",
  feedback: {
    overallScore: 85,
    ATS: {
      score: 80,
      tips: [
        { type: "good", tip: "Well formatted headings" },
        { type: "improve", tip: "Add more keywords" },
      ],
    },
    toneAndStyle: {
      score: 90,
      tips: [
        { type: "good", tip: "Professional tone", explanation: "The wording is formal and professional." },
        { type: "improve", tip: "Simplify sentences", explanation: "Some sentences are too long." },
      ],
    },
    content: {
      score: 88,
      tips: [
        { type: "good", tip: "Relevant experience included", explanation: "Experience matches job requirements." },
        { type: "improve", tip: "Add measurable results", explanation: "Include numbers to show impact." },
      ],
    },
    structure: {
      score: 92,
      tips: [
        { type: "good", tip: "Clear sections", explanation: "Sections are well separated and readable." },
        { type: "improve", tip: "Consistent formatting", explanation: "Some fonts or sizes vary." },
      ],
    },
    skills: {
      score: 85,
      tips: [
        { type: "good", tip: "Tech skills clearly listed", explanation: "Skills are easy to find." },
        { type: "improve", tip: "Add soft skills", explanation: "Include communication/teamwork skills." },
      ],
    },
  },
};

describe("ResumeCard Component", () => {
  test("renders company name, job title, and feedback score", () => {
    render(
      <MemoryRouter>
        <ResumeCard resume={mockResume} />
      </MemoryRouter>
    );

    expect(screen.getByText("ABC Corp")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    // Match the overallScore as it is displayed inside "85/100"
    expect(screen.getByText(/85\/100/)).toBeInTheDocument();
  });

  test("renders SVG progress", () => {
    const { container } = render(
      <MemoryRouter>
        <ResumeCard resume={mockResume} />
      </MemoryRouter>
    );
    // Select the SVG directly from the container
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  // Optional: Only include this if ATS tips are actually rendered in ResumeCard
  test("renders ATS tips", () => {
    render(
      <MemoryRouter>
        <ResumeCard resume={mockResume} />
      </MemoryRouter>
    );
    expect(screen.getByText("Well formatted headings")).toBeInTheDocument();
    expect(screen.getByText("Add more keywords")).toBeInTheDocument();
  });
});
