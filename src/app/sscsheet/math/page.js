// "use client";

// import React, { useState, useEffect } from "react";
// import { ChevronDown, ChevronUp, FileText, Star, Youtube } from "lucide-react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Navbar from "@/app/Navbar";
// export default function Page() {
//   const [chapters, setChapters] = useState([]);
//   const [favourites, setFavourites] = useState({});

//   const [expandedChapters, setExpandedChapters] = useState({});
//   const [expandedSections, setExpandedSections] = useState({});
//   const [chapterData, setChapterData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [completedConcepts, setCompletedConcepts] = useState({});
//   const [completedProblems, setCompletedProblems] = useState({});
//   const router = useRouter();
//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("customerToken")
//       : null;
//   console.log("Token:", token);
//   const apibackendurl = process.env.NEXT_PUBLIC_BACKEND_URL; // backend: port 5000
//   const apidatasheeturl = process.env.NEXT_PUBLIC_DATASHEET_URLMATH; // JSON server: port 8002
//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         const res = await axios.get(`${apidatasheeturl}/chapters`);
//         setChapters(res.data || []);
//       } catch (err) {
//         console.error("Error fetching chapters:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchChapters();
//   }, []);

//   // Initialize progress for a chapter
//   const initProgress = async (chapterTitle, totalConcepts, totalQuestions) => {
//     try {
//       await axios.post(
//         `${apibackendurl}/userprogress/init`,
//         {
//           topicId: chapterTitle.replace(/\s/g, "_"),
//           totalConcepts,
//           totalQuestions,
//         },
//         axiosConfig
//       );
//     } catch (err) {
//       console.error("Error initializing progress:", err);
//     }
//   };

//   // Load progress from backend
//   const loadProgress = async (chapterTitle) => {
//     try {
//       const res = await axios.get(
//         `${apibackendurl}/userprogress/${chapterTitle.replace(/\s/g, "_")}`,
//         axiosConfig
//       );

//       const completedConceptsServer = {};
//       res.data.completedConcepts.forEach((id) => {
//         completedConceptsServer[`${chapterTitle}-${id}`] = true;
//       });

//       const completedProblemsServer = {};
//       res.data.completedQuestions.forEach((id) => {
//         completedProblemsServer[`${chapterTitle}-problem-${id}`] = true;
//       });

//       setCompletedConcepts((prev) => ({ ...prev, ...completedConceptsServer }));
//       setCompletedProblems((prev) => ({ ...prev, ...completedProblemsServer }));
//     } catch (err) {
//       console.error("Error loading progress:", err);
//     }
//   };
//   // useEffect(() => {
//   //   if (!token) return;

//   //   const fetchAllChaptersData = async () => {
//   //     try {
//   //       const chaptersRes = await axios.get(`${apidatasheeturl}/chapters`);
//   //       const chaptersList = chaptersRes.data || [];
//   //       setChapters(chaptersList);

//   //       for (let chapter of chaptersList) {
//   //         const chapterTitleKey = chapter.title.replace(/\s/g, "_");

//   //         // Fetch chapter data
//   //         const res = await axios.get(`${apidatasheeturl}/${chapterTitleKey}`);
//   //         setChapterData((prev) => ({ ...prev, [chapter.title]: res.data }));

//   //         // Deduplicate concepts & problems
//   //         const uniqueConcepts = Array.from(
//   //           new Map(res.data?.[0]?.Concept?.map((c) => [c.concept, c])).values()
//   //         );
//   //         const uniqueProblems = Array.from(
//   //           new Map(
//   //             res.data?.[1]?.Questions?.map((q) => [q.question, q])
//   //           ).values()
//   //         );

//   //         // Initialize progress in backend
//   //         await initProgress(
//   //           chapter.title,
//   //           uniqueConcepts.length,
//   //           uniqueProblems.length
//   //         );

//   //         // Load existing progress from backend
//   //         await loadProgress(chapter.title);
//   //       }
//   //     } catch (err) {
//   //       console.error("Error fetching chapters data:", err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchAllChaptersData();
//   // }, [token]);

//   useEffect(() => {
//     if (!token) return;

//     const fetchAllChaptersData = async () => {
//       try {
//         const chaptersRes = await axios.get(`${apidatasheeturl}/chapters`);
//         const chaptersList = chaptersRes.data || [];
//         setChapters(chaptersList);

//         for (let chapter of chaptersList) {
//           const chapterTitleKey = chapter.title.replace(/\s/g, "_");

//           // Fetch chapter data
//           const res = await axios.get(`${apidatasheeturl}/${chapterTitleKey}`);
//           setChapterData((prev) => ({ ...prev, [chapter.title]: res.data }));

//           // Initialize progress
//           const uniqueConcepts = Array.from(
//             new Map(res.data?.[0]?.Concept?.map((c) => [c.concept, c])).values()
//           );
//           const uniqueProblems = Array.from(
//             new Map(
//               res.data?.[1]?.Questions?.map((q) => [q.question, q])
//             ).values()
//           );

//           await initProgress(
//             chapter.title,
//             uniqueConcepts.length,
//             uniqueProblems.length
//           );
//           await loadProgress(chapter.title);

//           // Fetch favourites for the chapter
//           const favRes = await axios.get(
//             `${apibackendurl}/userprogress/favourite/${chapterTitleKey}`,
//             axiosConfig
//           );
//           const favData = {};
//           favRes.data.forEach((fav) => {
//             const key = `${chapter.title}-${
//               fav.type === "concept" ? fav.itemId : `problem-${fav.itemId}`
//             }`;
//             favData[key] = true;
//           });
//           setFavourites((prev) => ({ ...prev, ...favData }));
//         }
//       } catch (err) {
//         console.error("Error fetching chapters data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllChaptersData();
//   }, [token]);

//   const toggleChapter = async (chapterTitle) => {
//     setExpandedChapters((prev) => ({
//       ...prev,
//       [chapterTitle]: !prev[chapterTitle],
//     }));

//     if (!chapterData[chapterTitle]) {
//       try {
//         const url = `${apidatasheeturl}/${chapterTitle.replace(/\s/g, "_")}`;
//         const res = await axios.get(url);
//         setChapterData((prev) => ({ ...prev, [chapterTitle]: res.data }));

//         // Deduplicate concepts and problems
//         const uniqueConcepts = Array.from(
//           new Map(res.data?.[0]?.Concept?.map((c) => [c.concept, c])).values()
//         );
//         const uniqueProblems = Array.from(
//           new Map(
//             res.data?.[1]?.Questions?.map((q) => [q.question, q])
//           ).values()
//         );

//         // Initialize progress in backend
//         await initProgress(
//           chapterTitle,
//           uniqueConcepts.length,
//           uniqueProblems.length
//         );

//         // Load existing progress from backend
//         await loadProgress(chapterTitle);
//       } catch (err) {
//         console.error("Error fetching chapter data:", err);
//       }
//     }
//   };

//   const toggleSection = (chapterTitle, section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [`${chapterTitle}-${section}`]: !prev[`${chapterTitle}-${section}`],
//     }));
//   };

//   // Concept checkbox handler
//   const handleConceptCheck = async (chapterTitle, conceptId) => {
//     if (!token) {
//       router.push("/customerlogin"); // redirect only when user interacts
//       return;
//     }
//     const key = `${chapterTitle}-${conceptId}`;
//     const completed = !completedConcepts[key];
//     setCompletedConcepts((prev) => ({ ...prev, [key]: completed }));

//     try {
//       await axios.put(
//         `${apibackendurl}/userprogress/update`,
//         {
//           topicId: chapterTitle.replace(/\s/g, "_"),
//           type: "concept",
//           id: conceptId,
//           completed,
//         },
//         axiosConfig
//       );
//     } catch (err) {
//       console.error("Error updating concept progress:", err);
//     }
//   };

//   const handleProblemCheck = async (chapterTitle, problemIdx) => {
//     if (!token) {
//       router.push("/customerlogin"); // redirect only when user interacts
//       return;
//     }
//     const key = `${chapterTitle}-problem-${problemIdx}`;
//     const completed = !completedProblems[key];
//     setCompletedProblems((prev) => ({ ...prev, [key]: completed }));

//     try {
//       await axios.put(
//         `${apibackendurl}/userprogress/update`,
//         {
//           topicId: chapterTitle.replace(/\s/g, "_"),
//           type: "question",
//           id: problemIdx,
//           completed,
//         },
//         axiosConfig
//       );
//     } catch (err) {
//       console.error("Error updating question progress:", err);
//     }
//   };

//   const toggleFavourite = async (chapterTitle, type, itemId, currentFav) => {
//     if (!token) {
//       router.push("/customerlogin"); // redirect if user not logged in
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${apibackendurl}/userprogress/favourite/toggle`,
//         {
//           topicId: chapterTitle.replace(/\s/g, "_"),
//           type, // "concept" or "question"
//           itemId, // concept.id or problem index
//           favourite: !currentFav, // toggle favourite
//         },
//         axiosConfig
//       );

//       return res.data.favourite.favourite; // return the updated favourite status
//     } catch (err) {
//       console.error("Error toggling favourite:", err);
//     }
//   };

//   // Truncate question based on screen size
//   const truncateWords = (text) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     const width = window.innerWidth;
//     const wordLimit = width < 640 ? 5 : 10;
//     if (words.length <= wordLimit) return text;
//     return words.slice(0, wordLimit).join(" ") + "...";
//   };

//   if (loading) return <p className="text-white">Loading chapters...</p>;

//   return (
//     <div className="min-h-screen bg-black text-white pt-18 px-2 py-2 lg:px-28 lg:py-28">
//       <Navbar />
//       <h1 className="text-3xl font-bold pt-10 mb-6">Strivers A2Z DSA Course</h1>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => router.push("/sscsheet/math/revision")}
//           className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
//         >
//           Revision
//         </button>
//       </div>

//       {chapters.map((chapter) => {
//         const isChapterExpanded = expandedChapters[chapter.title];
//         const data = chapterData[chapter.title];

//         const uniqueConcepts = Array.from(
//           new Map(data?.[0]?.Concept?.map((c) => [c.concept, c])).values()
//         );
//         const uniqueProblems = Array.from(
//           new Map(data?.[1]?.Questions?.map((q) => [q.question, q])).values()
//         );

//         let totalConcepts = 0;
//         let completedConceptCount = 0;
//         let totalProblems = 0;
//         let completedProblemCount = 0;

//         if (data) {
//           const uniqueConcepts = Array.from(
//             new Map(data?.[0]?.Concept?.map((c) => [c.concept, c])).values()
//           );
//           const uniqueProblems = Array.from(
//             new Map(data?.[1]?.Questions?.map((q) => [q.question, q])).values()
//           );

//           totalConcepts = uniqueConcepts.length;
//           completedConceptCount = Object.entries(completedConcepts).filter(
//             ([k, v]) => k.startsWith(chapter.title) && v
//           ).length;

//           totalProblems = uniqueProblems.length;
//           completedProblemCount = Object.entries(completedProblems).filter(
//             ([k, v]) => k.startsWith(`${chapter.title}-problem`) && v
//           ).length;
//         }

//         const conceptProgress = totalConcepts
//           ? (completedConceptCount / totalConcepts) * 100
//           : 0;
//         const problemProgress = totalProblems
//           ? (completedProblemCount / totalProblems) * 100
//           : 0;

//         return (
//           <div
//             key={chapter.id}
//             className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mb-6"
//           >
//             {/* Chapter Header */}
//             <div
//               className="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800 transition"
//               onClick={() => toggleChapter(chapter.title)}
//             >
//               <div className="flex items-center gap-4">
//                 {isChapterExpanded ? (
//                   <ChevronDown className="w-5 h-5 text-gray-400" />
//                 ) : (
//                   <ChevronUp className="w-5 h-5 text-gray-400" />
//                 )}
//                 <h2 className="text-xl sm:text-2xl font-semibold">
//                   {chapter.title}
//                 </h2>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="hidden sm:block w-48 lg:w-64 bg-zinc-800 rounded-full h-2 overflow-hidden">
//                   <div
//                     className="bg-orange-500 h-full"
//                     style={{
//                       width:
//                         totalConcepts + totalProblems
//                           ? `${
//                               ((completedConceptCount + completedProblemCount) /
//                                 (totalConcepts + totalProblems)) *
//                               100
//                             }%`
//                           : "0%",
//                     }}
//                   ></div>
//                 </div>
//                 <span className="text-gray-400 text-sm font-medium">
//                   {completedConceptCount + completedProblemCount} /{" "}
//                   {totalConcepts + totalProblems}
//                 </span>
//               </div>
//             </div>

//             {/* Chapter Content */}
//             {isChapterExpanded && data && (
//               <div className="border-t border-zinc-800">
//                 {/* Concepts Section */}
//                 {totalConcepts > 0 && (
//                   <div className="p-4 sm:p-6 border-t border-zinc-800">
//                     <div
//                       className="flex items-center justify-between cursor-pointer hover:bg-zinc-800 p-2 rounded"
//                       onClick={() => toggleSection(chapter.title, "concepts")}
//                     >
//                       <h3 className="text-lg font-semibold">Concepts</h3>
//                       <div className="flex items-center gap-4">
//                         <div className="hidden sm:block w-48 bg-zinc-800 rounded-full h-2 overflow-hidden">
//                           <div
//                             className="bg-orange-500 h-full"
//                             style={{ width: `${conceptProgress}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-gray-400 text-sm font-medium">
//                           {completedConceptCount} / {totalConcepts}
//                         </span>
//                         {expandedSections[`${chapter.title}-concepts`] ? (
//                           <ChevronDown className="w-5 h-5 text-gray-400" />
//                         ) : (
//                           <ChevronUp className="w-5 h-5 text-gray-400" />
//                         )}
//                       </div>
//                     </div>
//                     {expandedSections[`${chapter.title}-concepts`] && (
//                       <div className="overflow-x-auto mt-2">
//                         <table className="w-full">
//                           <thead className="bg-zinc-800 text-gray-400 text-xs sm:text-sm">
//                             <tr>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 check progress
//                               </th>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Concept
//                               </th>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Notes / Solution
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Video Solution
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Revise
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {uniqueConcepts.map((concept) => {
//                               const key = `${chapter.title}-${concept.id}`;
//                               return (
//                                 <tr
//                                   key={key}
//                                   className="border-t border-zinc-800 hover:bg-zinc-800 transition"
//                                 >
//                                   <td className="px-4 py-4">
//                                     <input
//                                       type="checkbox"
//                                       checked={completedConcepts[key] || false}
//                                       onChange={() =>
//                                         handleConceptCheck(
//                                           chapter.title,
//                                           concept.id
//                                         )
//                                       }
//                                       className="w-4 h-4 accent-orange-500"
//                                     />
//                                   </td>
//                                   <td className="px-4 py-4">
//                                     {concept.concept}
//                                   </td>
//                                   <td className="px-4 py-4">
//                                     <button
//                                       onClick={() =>
//                                         window.open(
//                                           `/sscsheet/math/concept/${
//                                             concept.id
//                                           }?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                       className="text-gray-400 hover:text-white cursor-pointer transition"
//                                     >
//                                       <FileText className="w-6 h-6 mx-auto" />
//                                     </button>
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <button
//                                       onClick={() =>
//                                         window.open(
//                                           `/sscsheet/math/concept/${
//                                             concept.id
//                                           }?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                       className="text-red-500 hover:text-red-400 cursor-pointer transition"
//                                     >
//                                       <Youtube className="w-6 h-6 mx-auto" />
//                                     </button>
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <button
//                                       className={`cursor-pointer transition ${
//                                         favourites[key]
//                                           ? "text-yellow-300"
//                                           : "text-yellow-400 hover:text-yellow-300"
//                                       }`}
//                                       onClick={async () => {
//                                         const updatedFav =
//                                           await toggleFavourite(
//                                             chapter.title,
//                                             "concept",
//                                             concept.id,
//                                             favourites[key]
//                                           );
//                                         setFavourites((prev) => ({
//                                           ...prev,
//                                           [key]: updatedFav,
//                                         }));
//                                       }}
//                                     >
//                                       <Star
//                                         className={`w-5 h-5 mx-auto ${
//                                           favourites[key]
//                                             ? "fill-yellow-300"
//                                             : "text-yellow-400 hover:text-yellow-300"
//                                         }`}
//                                       />
//                                     </button>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Problems Section */}
//                 {totalProblems > 0 && (
//                   <div className="p-4 sm:p-6 border-t border-zinc-800">
//                     <div
//                       className="flex items-center justify-between cursor-pointer hover:bg-zinc-800 p-2 rounded"
//                       onClick={() => toggleSection(chapter.title, "problems")}
//                     >
//                       <h3 className="text-lg font-semibold">Problems</h3>
//                       <div className="flex items-center gap-4">
//                         <div className="hidden sm:block w-48 bg-zinc-800 rounded-full h-2 overflow-hidden">
//                           <div
//                             className="bg-orange-500 h-full"
//                             style={{ width: `${problemProgress}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-gray-400 text-sm font-medium">
//                           {completedProblemCount} / {totalProblems}
//                         </span>
//                         {expandedSections[`${chapter.title}-problems`] ? (
//                           <ChevronDown className="w-5 h-5 text-gray-400" />
//                         ) : (
//                           <ChevronUp className="w-5 h-5 text-gray-400" />
//                         )}
//                       </div>
//                     </div>
//                     {expandedSections[`${chapter.title}-problems`] && (
//                       <div className="overflow-x-auto mt-2">
//                         <table className="w-full">
//                           <thead className="bg-zinc-800 text-gray-400 text-xs sm:text-sm">
//                             <tr>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 check progress
//                               </th>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Questions
//                               </th>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Notes / Solution
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Video Solution
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Revise
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 status
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {uniqueProblems.map((q) => {
//                               const key = `${chapter.title}-problem-${q.id}`;
//                               return (
//                                 <tr
//                                   key={q.id}
//                                   className="border-t border-zinc-800 hover:bg-zinc-800 transition"
//                                 >
//                                   <td className="px-4 py-4">
//                                     <input
//                                       type="checkbox"
//                                       checked={completedProblems[key] || false}
//                                       onChange={() =>
//                                         handleProblemCheck(chapter.title, q.id)
//                                       }
//                                       className="w-4 h-4 accent-orange-500"
//                                     />
//                                   </td>
//                                   <td className="px-4 py-4">
//                                     {q.question?.type === "text" ? (
//                                       truncateWords(q.question.content)
//                                     ) : (
//                                       <img
//                                         src={q.question.content}
//                                         alt="question"
//                                         className="max-w-full rounded"
//                                       />
//                                     )}
//                                   </td>
//                                   <td className="px-4 py-4">
//                                     <button
//                                       onClick={() =>
//                                         window.open(
//                                           `/sscsheet/math/problem/${
//                                             q.id
//                                           }?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                       className="text-gray-400 hover:text-white cursor-pointer transition"
//                                     >
//                                       <FileText className="w-6 h-6 mx-auto" />
//                                     </button>
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <button
//                                       onClick={() =>
//                                         window.open(
//                                           `/sscsheet/math/problem/${
//                                             q.id
//                                           }?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                       className="text-red-500 hover:text-red-400 cursor-pointer transition"
//                                     >
//                                       <Youtube className="w-6 h-6 mx-auto" />
//                                     </button>
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <button
//                                       className={`cursor-pointer transition ${
//                                         favourites[key]
//                                           ? "text-yellow-300"
//                                           : "text-yellow-400 hover:text-yellow-300"
//                                       }`}
//                                       onClick={async () => {
//                                         const updatedFav =
//                                           await toggleFavourite(
//                                             chapter.title,
//                                             "question",
//                                             q.id,
//                                             favourites[key]
//                                           );
//                                         setFavourites((prev) => ({
//                                           ...prev,
//                                           [key]: updatedFav,
//                                         }));
//                                       }}
//                                     >
//                                       <Star
//                                         className={`w-5 h-5 mx-auto ${
//                                           favourites[key]
//                                             ? "fill-yellow-300"
//                                             : "text-yellow-400 hover:text-yellow-300"
//                                         }`}
//                                       />
//                                     </button>
//                                   </td>
//                                   <td className="px-4 py-4 text-center text-green-500">
//                                     {q.status}
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
