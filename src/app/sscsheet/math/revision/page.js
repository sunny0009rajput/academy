// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Star,
//   FileText,
//   Youtube,
//   ChevronDown,
//   ChevronUp,
//   ArrowLeft,
// } from "lucide-react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Navbar from "@/app/Navbar";

// export default function RevisionPage() {
//   const [chapters, setChapters] = useState([]);
//   const [chapterData, setChapterData] = useState({});
//   const [favourites, setFavourites] = useState({});
//   const [expandedChapters, setExpandedChapters] = useState({});
//   const [expandedSections, setExpandedSections] = useState({});
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("customerToken")
//       : null;
//   const apibackendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
//   const apidatasheeturl = process.env.NEXT_PUBLIC_DATASHEET_URLMATH;

//   const axiosConfig = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   // ✂️ Trim long text for display
//   const trimText = (text, maxLength = 50) => {
//     if (!text) return "";
//     return text.length > maxLength
//       ? text.substring(0, maxLength) + "..."
//       : text;
//   };

//   useEffect(() => {
//     if (!token) {
//       router.push("/customerlogin");
//       return;
//     }

//     const fetchFavouritesData = async () => {
//       try {
//         const chaptersRes = await axios.get(`${apidatasheeturl}/chapters`);
//         const chaptersList = chaptersRes.data || [];
//         setChapters(chaptersList);

//         for (let chapter of chaptersList) {
//           const chapterKey = chapter.title.replace(/\s/g, "_");

//           // Fetch chapter data
//           const res = await axios.get(`${apidatasheeturl}/${chapterKey}`);
//           setChapterData((prev) => ({ ...prev, [chapter.title]: res.data }));

//           // Fetch favourite items
//           const favRes = await axios.get(
//             `${apibackendurl}/userprogress/favourite/${chapterKey}`,
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
//         console.error("Error fetching favourites:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavouritesData();
//   }, [token]);

//   const toggleFavourite = async (chapterTitle, type, itemId, isFav) => {
//     try {
//       const topicKey = chapterTitle.replace(/\s/g, "_");
//       const res = await axios.post(
//         `${apibackendurl}/userprogress/favourite/toggle`,
//         {
//           topicId: topicKey,
//           type,
//           itemId,
//           favourite: !isFav,
//         },
//         axiosConfig
//       );

//       // Update local state correctly
//       setFavourites((prev) => {
//         const updated = { ...prev };
//         const key =
//           type === "concept"
//             ? `${chapterTitle}-${itemId}`
//             : `${chapterTitle}-problem-${itemId}`;

//         if (updated[key]) delete updated[key]; // remove if unfavourited
//         else updated[key] = true; // add if favourited
//         return updated;
//       });

//       return !isFav;
//     } catch (err) {
//       console.error("Error updating favourite:", err);
//       return isFav;
//     }
//   };

//   const toggleChapter = (chapterTitle) => {
//     setExpandedChapters((prev) => ({
//       ...prev,
//       [chapterTitle]: !prev[chapterTitle],
//     }));
//   };

//   const toggleSection = (chapterTitle, section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [`${chapterTitle}-${section}`]: !prev[`${chapterTitle}-${section}`],
//     }));
//   };

//   if (loading) return <p className="text-white">Loading favourites...</p>;

//   return (
//     <div className="min-h-screen bg-black text-white pt-18 px-2 py-2 lg:px-28 lg:py-28">
//       <Navbar />

//       {/* 🔙 Back Button */}
//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-6 mt-10"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         <span>Back</span>
//       </button>

//       <h1 className="text-3xl font-bold mb-6">Revision - Favourites</h1>

//       {chapters.map((chapter) => {
//         const data = chapterData[chapter.title];
//         if (!data) return null;

//         const favouriteConcepts =
//           data[0]?.Concept?.filter(
//             (c) => favourites[`${chapter.title}-${c.id}`]
//           ) || [];

//         const favouriteProblems =
//           data[1]?.Questions?.filter(
//             (q) => favourites[`${chapter.title}-problem-${q.itemId ?? q.id}`]
//           ) || [];

//         if (favouriteConcepts.length === 0 && favouriteProblems.length === 0)
//           return null;

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
//               <h2 className="text-xl sm:text-2xl font-semibold">
//                 {chapter.title}
//               </h2>
//               {expandedChapters[chapter.title] ? (
//                 <ChevronDown className="w-5 h-5 text-gray-400" />
//               ) : (
//                 <ChevronUp className="w-5 h-5 text-gray-400" />
//               )}
//             </div>

//             {expandedChapters[chapter.title] && (
//               <div className="border-t border-zinc-800">
//                 {/* Favourite Concepts */}
//                 {favouriteConcepts.length > 0 && (
//                   <div className="p-4 sm:p-6 border-t border-zinc-800">
//                     <div
//                       className="flex items-center justify-between cursor-pointer hover:bg-zinc-800 p-2 rounded"
//                       onClick={() => toggleSection(chapter.title, "concepts")}
//                     >
//                       <h3 className="text-lg font-semibold">
//                         Favourite Concepts
//                       </h3>
//                       {expandedSections[`${chapter.title}-concepts`] ? (
//                         <ChevronDown className="w-5 h-5 text-gray-400" />
//                       ) : (
//                         <ChevronUp className="w-5 h-5 text-gray-400" />
//                       )}
//                     </div>

//                     {expandedSections[`${chapter.title}-concepts`] && (
//                       <div className="overflow-x-auto mt-2">
//                         <table className="w-full">
//                           <thead className="bg-zinc-800 text-gray-400 text-xs sm:text-sm">
//                             <tr>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Concept
//                               </th>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Notes / Solution
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Video
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Revise
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {favouriteConcepts.map((concept) => {
//                               const key = `${chapter.title}-${concept.id}`;
//                               return (
//                                 <tr
//                                   key={key}
//                                   className="border-t border-zinc-800 hover:bg-zinc-800 transition"
//                                 >
//                                   <td className="px-4 py-4">
//                                     {trimText(concept.concept, 80)}
//                                   </td>
//                                   <td className="px-4 py-4">
//                                     <FileText
//                                       className="w-6 h-6 mx-auto text-gray-400 hover:text-white cursor-pointer transition"
//                                       onClick={() =>
//                                         window.open(
//                                           `/concept/${
//                                             concept.id
//                                           }?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                     />
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <Youtube
//                                       className="w-6 h-6 mx-auto text-red-500 hover:text-red-400 cursor-pointer transition"
//                                       onClick={() =>
//                                         window.open(
//                                           `/concept/${
//                                             concept.id
//                                           }?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                     />
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <Star
//                                       className={`w-5 h-5 mx-auto cursor-pointer transition ${
//                                         favourites[key]
//                                           ? "fill-yellow-300 text-yellow-300"
//                                           : "text-yellow-400 hover:text-yellow-300"
//                                       }`}
//                                       onClick={async () => {
//                                         await toggleFavourite(
//                                           chapter.title,
//                                           "concept",
//                                           concept.id,
//                                           favourites[key]
//                                         );
//                                       }}
//                                     />
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

//                 {/* Favourite Problems */}
//                 {/* Favourite Problems */}
//                 {favouriteProblems.length > 0 && (
//                   <div className="p-4 sm:p-6 border-t border-zinc-800">
//                     <div
//                       className="flex items-center justify-between cursor-pointer hover:bg-zinc-800 p-2 rounded"
//                       onClick={() => toggleSection(chapter.title, "problems")}
//                     >
//                       <h3 className="text-lg font-semibold">
//                         Favourite Problems
//                       </h3>
//                       {expandedSections[`${chapter.title}-problems`] ? (
//                         <ChevronDown className="w-5 h-5 text-gray-400" />
//                       ) : (
//                         <ChevronUp className="w-5 h-5 text-gray-400" />
//                       )}
//                     </div>

//                     {expandedSections[`${chapter.title}-problems`] && (
//                       <div className="overflow-x-auto mt-2">
//                         <table className="w-full">
//                           <thead className="bg-zinc-800 text-gray-400 text-xs sm:text-sm">
//                             <tr>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Question
//                               </th>
//                               <th className="px-4 py-3 text-left font-medium">
//                                 Notes
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Video
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Revise
//                               </th>
//                               <th className="px-4 py-3 text-center font-medium">
//                                 Status
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {favouriteProblems.map((q) => {
//                               // ✅ Use unique id for the problem (from backend)
//                               const problemId = q.id;
//                               const key = `${chapter.title}-problem-${problemId}`;

//                               return (
//                                 <tr
//                                   key={key}
//                                   className="border-t border-zinc-800 hover:bg-zinc-800 transition"
//                                 >
//                                   <td className="px-4 py-4">
//                                     {q.question?.type === "text" ? (
//                                       trimText(q.question.content, 80)
//                                     ) : (
//                                       <img
//                                         src={q.question.content}
//                                         alt="question"
//                                         className="max-w-full rounded"
//                                       />
//                                     )}
//                                   </td>
//                                   <td className="px-4 py-4">
//                                     <FileText
//                                       className="w-6 h-6 mx-auto text-gray-400 hover:text-white cursor-pointer transition"
//                                       onClick={() =>
//                                         window.open(
//                                           `/problem/${problemId}?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                     />
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <Youtube
//                                       className="w-6 h-6 mx-auto text-red-500 hover:text-red-400 cursor-pointer transition"
//                                       onClick={() =>
//                                         window.open(
//                                           `/problem/${problemId}?chapter=${encodeURIComponent(
//                                             chapter.title
//                                           )}`,
//                                           "_blank"
//                                         )
//                                       }
//                                     />
//                                   </td>
//                                   <td className="px-4 py-4 text-center">
//                                     <Star
//                                       className={`w-5 h-5 mx-auto cursor-pointer transition ${
//                                         favourites[key]
//                                           ? "fill-yellow-300 text-yellow-300"
//                                           : "text-yellow-400 hover:text-yellow-300"
//                                       }`}
//                                       onClick={async () => {
//                                         const updatedFav =
//                                           await toggleFavourite(
//                                             chapter.title,
//                                             "question",
//                                             q.itemId ?? q.id,
//                                             favourites[key]
//                                           );
//                                         if (!updatedFav)
//                                           setFavourites((prev) => {
//                                             const newFav = { ...prev };
//                                             delete newFav[key];
//                                             return newFav;
//                                           });
//                                       }}
//                                     />
//                                   </td>
//                                   <td className="px-4 py-4 text-center text-green-500">
//                                     {q.status || "Not Attempted"}
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
