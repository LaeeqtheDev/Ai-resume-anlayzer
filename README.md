<h1 align="center">Resumind</h1>

<p align="center">
  ATS compatibility scoring for resumes — structured model output, no server,
  and no copy of your resume on anyone's infrastructure.
</p>

<p align="center">
  <a href="https://ai-resume-anlayzer.vercel.app"><img src="https://img.shields.io/badge/Live_App-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live app"></a>
</p>

---

## Overview

Upload a resume, paste a job description, and get back an ATS compatibility score, the keywords the posting expects but your resume omits, and specific rewrites rather than generic advice.

The naive version of this is a text box wired to a chat completion. The problems that make it an actual engineering task are narrower: **a language model returns prose, and prose can't be scored, compared or rendered**; **resumes are among the most sensitive documents a person will upload anywhere**; and **a tool that gives a different score to the same resume twice is worthless**. The architecture below is shaped by those three constraints.

---

## Architecture

**No backend, by design.** The application runs entirely client-side on Puter.js, which supplies authentication, per-user storage and model access from the browser. There is no server of mine in the path — which means no API key custody, no request logs, and no database holding other people's resumes. Files are written to the user's own storage, under their own account. For a tool handling documents containing full names, addresses and employment history, not being in possession of the data is a stronger privacy guarantee than any policy I could write about how I'd handle it.

It also inverts the cost model: usage scales against the user's own quota rather than mine, so the app has no per-request cost that would force rate limits or a paywall.

**A structured output contract, not a chat response.** The model is constrained to emit strict JSON matching a fixed shape — score, matched keywords, missing keywords, per-section feedback. The response is parsed and type-checked before anything renders. This is what makes the output a *data structure* the UI can map over and the user can compare across runs, instead of a paragraph they have to read and interpret. Prompt and schema definitions live in `constants/`, kept out of component code so the contract can change without touching the render layer.

**Parsing happens in the browser.** PDF text extraction runs client-side, so the file itself is never transmitted for analysis — only the extracted text the user has effectively already consented to have scored.

**React Router 7 in framework mode.** Server-side rendering, file-based routing, and typed loaders come from the framework rather than from assembled libraries. Vite handles the build; a `Dockerfile` is included so the app can run on any container platform rather than being coupled to a single host.

**Tested where breakage is silent.** Component tests run under Jest with `MemoryRouter` wrapping router-dependent components, so routing-aware UI is exercised without a browser. `ResumeCard` — the component that renders scored output — is covered, since a rendering regression there would produce a plausible-looking but wrong result rather than an obvious crash.

---

## How Scoring Works

1. Resume text is extracted client-side from the uploaded PDF
2. Resume text and job description are sent to the model with a schema-constrained prompt
3. The model returns strict JSON — no preamble, no markdown fencing
4. The response is parsed and validated against the expected shape; malformed output is rejected rather than partially rendered
5. Results render as structured sections: overall score, keyword coverage, and section-level feedback

---

## Tech Stack

| Layer | Choice | Reasoning |
|---|---|---|
| Framework | React Router 7 (framework mode) | SSR, typed routing and data loading without assembling them by hand |
| Platform | Puter.js | Auth, storage and model access client-side — removes the server from the data path |
| Build | Vite | Native ESM, fast HMR |
| Styling | Tailwind CSS | Utility-first, no runtime cost |
| Testing | Jest + Testing Library | Component-level coverage with `MemoryRouter` for routed components |
| Deploy | Docker + Vercel | Container image keeps the app portable to any platform |

---

## Running Locally

Requires Node 18+.

```bash
git clone https://github.com/LaeeqtheDev/Resumind.git
cd Resumind
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build
npm test           # Jest suite
```

Container:

```bash
docker build -t resumind .
docker run -p 3000:3000 resumind
```

No API keys are required. Model access and storage are authenticated per-user through Puter at runtime, which is the point — there is no shared credential to leak, rotate or bill.

---

## Trade-offs

Stated rather than omitted:

- **The score is a heuristic, not a verdict.** Real applicant tracking systems parse and rank by rules that vary per vendor and per employer configuration, and none of them publish their algorithms. This tool models keyword coverage and structural conventions that ATS parsers generally reward — useful as a signal, misleading if read as a guaranteed outcome.
- **Model output is non-deterministic.** A JSON contract fixes the *shape* of the response, not the *values*. Two runs on identical input can disagree at the margin. Meaningful improvement here needs an eval harness measuring score variance across repeated runs, which the project doesn't yet have.
- **Client-side means the prompt is inspectable.** Anyone can open DevTools and read the scoring instructions. Acceptable — the value is in the product, not in a secret prompt — but it rules out this architecture for anything where the logic itself is the asset.
- **Vendor dependency.** Auth, storage and inference all route through one provider. That's what removes the backend; it also means an outage there is a full outage here.
- **PDF only.** DOCX is the other format people actually submit resumes in, and it isn't supported yet.

---

## Roadmap

- [ ] Eval harness measuring score variance across repeated runs on fixed inputs
- [ ] DOCX parsing
- [ ] Side-by-side comparison of a resume against multiple postings
- [ ] Expanded test coverage on parsing and response validation
- [ ] Accessibility pass on the results view

---

## Author

**Syed Laeeq Ahmed** — Full-Stack Lead Engineer @ North Foundry

[Portfolio](https://laeeqthedevportfolio.vercel.app) · [LinkedIn](https://www.linkedin.com/in/syed-laeeq-ahmed/) · [GitHub](https://github.com/LaeeqtheDev) · laeeqthedev@gmail.com

## License

All rights reserved. Source is public to read; not licensed for reuse or redeployment.
