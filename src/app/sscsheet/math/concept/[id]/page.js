// "use client";
// import { useSearchParams, useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowLeft } from "lucide-react";

// export default function ConceptDetailPage() {
//   const { id } = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const chapter = searchParams.get("chapter");

//   const [concept, setConcept] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [playVideo, setPlayVideo] = useState(false);

//   const apidatasheeturl = process.env.NEXT_PUBLIC_DATASHEET_URLMATH;

//   useEffect(() => {
//     const fetchConceptDetails = async () => {
//       try {
//         const url = `${apidatasheeturl}/${chapter.replace(/\s/g, "_")}`;
//         const res = await axios.get(url);

//         const allConcepts = res.data?.[0]?.Concept || [];
//         const foundConcept = allConcepts.find(
//           (c) => String(c.id) === String(id)
//         );

//         setConcept(foundConcept);
//       } catch (err) {
//         console.error("Error fetching concept details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (chapter && id) fetchConceptDetails();
//   }, [chapter, id]);

//   if (loading) return <p className="text-white p-8">Loading concept...</p>;
//   if (!concept)
//     return <p className="text-white p-8">No concept found for ID: {id}</p>;

//   // Extract YouTube video ID from the URL
//   const getYouTubeId = (url) => {
//     const match = url.match(
//       /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch\?v=)([^\s&?]+)/
//     );
//     return match ? match[1] : null;
//   };

//   const videoId = getYouTubeId(concept.videoUrl);

//   return (
//     <div className="min-h-screen bg-black text-white p-16">
//       {/* Back Button */}
//       {/* <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         Back
//       </button> */}

//       {/* Concept Title */}
//       <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
//         <h1 className="text-2xl font-bold mb-4 text-orange-400">
//           {chapter} — Problem {id}
//         </h1>

//       {/* Concept Description */}
//       {concept["concept-description"]?.content &&
//         (concept["concept-description"].type === "text" ? (
//           <p className="text-gray-300 mb-6 leading-relaxed">
//             {concept["concept-description"].content}
//           </p>
//         ) : (
//           <img
//             src={concept["concept-description"].content.trim()}
//             alt="Concept Description"
//             className="rounded-lg border border-zinc-700 mb-6 max-w-full"
//           />
//         ))}

//       {/* Concept Example */}
//       {concept["concept-example"]?.content && (
//         <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 mb-8">
//           <h2 className="text-xl font-semibold mb-2 text-orange-400">
//             Example
//           </h2>
//           {concept["concept-example"].type === "text" ? (
//             <p className="text-gray-400">
//               {concept["concept-example"].content}
//             </p>
//           ) : (
//             <img
//               src={concept["concept-example"].content.trim()}
//               alt="Concept Example"
//               className="rounded-lg border border-zinc-700 max-w-full"
//             />
//           )}
//         </div>
//       )}

//       {/* Details Section */}
//       {concept.details && concept.details.length > 0 && (
//         <div className="space-y-6">
//           {concept.details.map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:shadow-orange-500/10 transition"
//             >
//               <h2 className="text-2xl font-semibold text-orange-400 mb-3">
//                 {item.title}
//               </h2>

//               <p className="text-gray-300 leading-relaxed mb-4">
//                 {item.description?.content || ""}
//               </p>

//               {item.example?.type === "text" && (
//                 <p className="text-gray-400 italic">
//                   <span className="font-semibold text-orange-300">
//                     Example:
//                   </span>{" "}
//                   {item.example.content}
//                 </p>
//               )}

//               {item.example?.type === "image" && (
//                 <div className="mt-3">
//                   <img
//                     src={item.example.content.trim()}
//                     alt="Example"
//                     className="rounded-lg border border-zinc-700 max-w-full"
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//       {/* YouTube Video Section */}
//       {videoId && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Video Explanation:</h2>

//           {!playVideo ? (
//             <div
//               className="relative w-full pb-[56.25%] cursor-pointer rounded-lg overflow-hidden"
//               onClick={() => setPlayVideo(true)}
//             >
//               {/* Thumbnail */}
//               <img
//                 src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
//                 alt="video thumbnail"
//                 className="absolute top-0 left-0 w-full h-full object-cover"
//               />

//               {/* Play Button */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="bg-orange-500 rounded-full flex items-center justify-center opacity-80 w-16 h-16">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="white"
//                     viewBox="0 0 24 24"
//                     className="w-8 h-8 ml-1"
//                   >
//                     <path d="M4 2v20l18-10L4 2z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full"
//                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           )}
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }
