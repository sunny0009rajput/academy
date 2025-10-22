// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { toast, Toaster } from "react-hot-toast";
// import Image from "next/image";
// import { ArrowLeft } from "lucide-react";

// export default function ProblemPage() {
//   const { id } = useParams();
//   const searchParams = useSearchParams();
//   const chapter = searchParams.get("chapter");
//   const router = useRouter();
//   const [problem, setProblem] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showSolution, setShowSolution] = useState(false);
//   const [playVideo, setPlayVideo] = useState(false);

//   const apidatasheeturl = process.env.NEXT_PUBLIC_DATASHEET_URLMATH;

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         // Fetch chapter data
//         const res = await axios.get(
//           `${apidatasheeturl}/${chapter.replace(/\s/g, "_")}`
//         );
//         const data = res.data?.[1]?.Questions || [];
//         const prob = data.find((_, idx) => String(idx + 1) === id);
//         setProblem(prob);
//       } catch (err) {
//         console.error("Error fetching problem:", err);
//       }
//     };

//     fetchProblem();
//   }, [chapter, id]);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     if (option === problem.answer) {
//       toast.success("✅ You are correct!");
//     } else {
//       toast.error("❌ Wrong answer, try again!");
//     }
//   };

//   if (!problem)
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         Loading problem...
//       </div>
//     );

//   // Extract YouTube video ID from the URL
//   const getYouTubeId = (url) => {
//     const match = url.match(
//       /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch\?v=)([^\s&?]+)/
//     );
//     return match ? match[1] : null;
//   };

//   const videoId = getYouTubeId(problem.videoUrl);

//   return (
//     <div className="min-h-screen bg-black text-white px-4 sm:px-8 md:px-16">
//       <Toaster position="top-center" />

//       {/* Back Button */}
//       {/* <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         Back
//       </button> */}

//       <div className="w-full max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-lg">
//         <h1 className="text-2xl font-bold mb-4 text-orange-400">
//           {chapter} — Problem {id}
//         </h1>

//         {/* Question */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Question:</h2>
//           {problem.question?.type === "text" ? (
//             <p className="text-gray-200 text-lg">{problem.question.content}</p>
//           ) : (
//             <Image
//               src={problem.question.content}
//               alt="question"
//               width={600}
//               height={300}
//               className="rounded-lg border border-zinc-700"
//             />
//           )}
//         </div>

//         {/* Options */}
//         <div className="space-y-3 mb-8">
//           {problem.options.map((opt, index) => (
//             <div
//               key={index}
//               onClick={() => handleOptionClick(opt.text)}
//               className={`cursor-pointer p-3 rounded-xl border transition-all ${
//                 selectedOption === opt.text
//                   ? "border-orange-500 bg-zinc-800"
//                   : "border-zinc-700 hover:border-orange-400"
//               }`}
//             >
//               <p className="text-gray-200 text-base">{opt.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Solution Section */}
//         <div>
//           <button
//             onClick={() => setShowSolution(!showSolution)}
//             className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
//           >
//             {showSolution ? "Hide Solution" : "View Solution"}
//           </button>

//           {showSolution && problem.solution ? (
//             problem.solution.type === "text" ? (
//               <div className="text-gray-300 leading-relaxed">
//                 {problem.solution.content.split("#").map((line, idx) => (
//                   <p key={idx} className="mb-2">
//                     {line.trim()}
//                   </p>
//                 ))}
//               </div>
//             ) : problem.solution.content ? (
//               <Image
//                 src={problem.solution.content}
//                 alt="solution"
//                 width={600}
//                 height={300}
//                 className="rounded-lg border border-zinc-700"
//               />
//             ) : (
//               <p className="text-gray-300">Solution not available.</p>
//             )
//           ) : showSolution ? (
//             <p className="text-gray-300">Solution not available.</p>
//           ) : null}
//         </div>
//         {/* YouTube Video Section */}
//         {videoId && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-2">Video Explanation:</h2>

//             {!playVideo ? (
//               <div
//                 className="relative w-full pb-[56.25%] cursor-pointer rounded-lg overflow-hidden"
//                 onClick={() => setPlayVideo(true)}
//               >
//                 {/* Thumbnail */}
//                 <img
//                   src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
//                   alt="video thumbnail"
//                   className="absolute top-0 left-0 w-full h-full object-cover"
//                 />

//                 {/* Play Button */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="bg-orange-500 rounded-full flex items-center justify-center opacity-80 w-16 h-16">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="white"
//                       viewBox="0 0 24 24"
//                       className="w-8 h-8 ml-1"
//                     >
//                       <path d="M4 2v20l18-10L4 2z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//                   title="YouTube video player"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
