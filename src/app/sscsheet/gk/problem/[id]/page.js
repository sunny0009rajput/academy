import MainPage from "./MainPage";

// export async function generateMetadata({ params, searchParams }) {
//   const id = params.id;
//   const chapter = searchParams.chapter || "General";
//   const apidatasheeturl = process.env.NEXT_PUBLIC_DATASHEET_URLGK;

//   let problem = null;
//   let questionText = "";

//   try {
//     // same logic as in ProblemPage
//     const res = await fetch(`${apidatasheeturl}/${chapter.replace(/\s/g, "_")}`, {
//       next: { revalidate: 36000 }, // cache API for 2 min
//     });
//     const data = await res.json();

//     const questions = data?.[1]?.Questions || [];
//     const probIndex = questions.findIndex((_, idx) => String(idx + 1) === id);
//     problem = questions[probIndex];

//     // Extract the question text
//     if (problem?.question?.type === "text") {
//       questionText = problem.question.content;
//     } else if (problem?.question?.type === "image") {
//       questionText = `Image-based question from ${chapter}`;
//     }
//   } catch (error) {
//     console.error("Error fetching problem data for SEO:", error);
//   }

//   // Clean question text
//   const cleanQuestion = questionText
//     ?.replace(/<\/?[^>]+(>|$)/g, "")
//     ?.replace(/\s+/g, " ")
//     ?.trim()
//     ?.slice(0, 120);

//   const title = cleanQuestion
//     ? `${cleanQuestion} | ${chapter} SSC Question ${id} - CodeMonarch Academy`
//     : `SSC ${chapter} Question ${id} - CodeMonarch Academy`;

//   const description = cleanQuestion
//     ? `${cleanQuestion} - Detailed explanation, answer, and video solution for SSC ${chapter} Question ${id}. Prepare smarter with CodeMonarch Academy.`
//     : `SSC Exam Question ${id} from ${chapter}. Learn the answer and explanation on CodeMonarch Academy.`;

//   const image =
//     problem?.question?.type === "image"
//       ? problem.question.content
//       : "https://academy.codemonarch.com/default-og-image.png";

//   return {
//     title,
//     description,
//     keywords: [
//       cleanQuestion,
//       `SSC Question ${id}`,
//       `${chapter} GK Questions`,
//       "SSC Exam Preparation",
//       "SSC Previous Year Questions",
//       "CodeMonarch Academy",
//     ].filter(Boolean),
//     openGraph: {
//       title,
//       description,
//       type: "article",
//       url: `https://academy.codemonarch.com/sscsheet/gk/problem/${id}?chapter=${chapter}`,
//       images: [image],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [image],
//     },
//   };
// }

// This is your actual page UI
export default function Page() {
  return <MainPage />;
}
