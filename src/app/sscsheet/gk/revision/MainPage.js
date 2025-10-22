"use client";

import React, { useState, useEffect } from "react";
import { Star, FileText, Youtube, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/Navbar";
import gkData from "../../../../../../codemonarchacademy/gk.json";
import { getAllChaptersProgress, saveChapterProgress } from "@/app/db";

export default function RevisionPage() {
  const [chapters, setChapters] = useState([]);
  const [chapterData, setChapterData] = useState({});
  const [favourites, setFavourites] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const subject = "GK";

  const trimText = (text, maxLength = 50) =>
    text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  // Load chapters & favourites from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      try {
        const chaptersList = gkData?.chapters || [];
        setChapters(chaptersList);

        const progressData = await getAllChaptersProgress(subject);
        const favState = {};

        chaptersList.forEach((chapter) => {
          const data = gkData[chapter.title] || gkData[chapter.title.replace(/\s/g, "_")];
          setChapterData((prev) => ({ ...prev, [chapter.title]: data }));

          const chapterProgress = progressData.find((p) => p.chapter === chapter.title);
          if (chapterProgress?.favourites?.length > 0) {
            chapterProgress.favourites.forEach((id) => {
              favState[`${chapter.title}-problem-${id}`] = true;
            });
          }
        });

        setFavourites(favState);
      } catch (err) {
        console.error("Error loading revision data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleChapter = (chapterTitle) => {
    setExpandedChapters((prev) => ({ ...prev, [chapterTitle]: !prev[chapterTitle] }));
  };

  const toggleSection = (chapterTitle, section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [`${chapterTitle}-${section}`]: !prev[`${chapterTitle}-${section}`],
    }));
  };

  // ✅ Toggle favourite & save to IndexedDB
  const handleToggleFavourite = async (chapterTitle, problemId) => {
  const key = `${chapterTitle}-problem-${problemId}`;
  const isFav = !!favourites[key];

  // Update local state immediately
  setFavourites((prev) => {
    const updated = { ...prev };
    if (isFav) delete updated[key];
    else updated[key] = true;
    return updated;
  });

  try {
    // Get current progress from IndexedDB
    const progressData = await getAllChaptersProgress(subject);
    let chapterProgress = progressData.find((p) => p.chapter === chapterTitle);

    if (!chapterProgress) {
      chapterProgress = { chapter: chapterTitle, completedProblems: [], favourites: [] };
    }

    let favs = chapterProgress.favourites || [];

    if (isFav) {
      // Remove problemId from favourites
      favs = favs.filter((id) => id !== problemId);
    } else {
      // Add problemId to favourites if not already present
      if (!favs.includes(problemId)) favs.push(problemId);
    }

    // Save back to IndexedDB
    await saveChapterProgress(subject, chapterTitle, chapterProgress.completedProblems || [], favs);
  } catch (err) {
    console.error("Error updating favourite in DB:", err);
  }
};


  if (loading) return <p className="text-white">Loading revision data...</p>;

  return (
    <div className="min-h-screen bg-black text-white pt-18 px-2 py-2 lg:px-28 lg:py-28">
      <Navbar />
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-6 mt-10"
      >
        <ArrowLeft className="w-5 h-5" /> <span>Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-6">Revision - Favourites</h1>

      {chapters.map((chapter) => {
        const data = chapterData[chapter.title];
        if (!data) return null;

        const favouriteProblems = data[1]?.Questions?.filter(
          (q) => favourites[`${chapter.title}-problem-${q.id}`]
        ) || [];

        if (favouriteProblems.length === 0) return null;

        return (
          <div key={chapter.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mb-6">
            <div
              className="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800 transition"
              onClick={() => toggleChapter(chapter.title)}
            >
              <h2 className="text-xl sm:text-2xl font-semibold">{chapter.title}</h2>
              {expandedChapters[chapter.title] ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronUp className="w-5 h-5 text-gray-400" />}
            </div>

            {expandedChapters[chapter.title] && (
              <div className="border-t border-zinc-800">
                <div className="p-4 sm:p-6 border-t border-zinc-800">
                  <div
                    className="flex items-center justify-between cursor-pointer hover:bg-zinc-800 p-2 rounded"
                    onClick={() => toggleSection(chapter.title, "problems")}
                  >
                    <h3 className="text-lg font-semibold">Favourite Problems</h3>
                    {expandedSections[`${chapter.title}-problems`] ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronUp className="w-5 h-5 text-gray-400" />}
                  </div>

                  {expandedSections[`${chapter.title}-problems`] && (
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full">
                        <thead className="bg-zinc-800 text-gray-400 text-xs sm:text-sm">
                          <tr>
                            <th className="px-4 py-3 text-left font-medium">Question</th>
                            <th className="px-4 py-3 text-left font-medium">Notes</th>
                            <th className="px-4 py-3 text-center font-medium">Video</th>
                            <th className="px-4 py-3 text-center font-medium">Fav</th>
                            <th className="px-4 py-3 text-center font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {favouriteProblems.map((q) => {
                            const key = `${chapter.title}-problem-${q.id}`;
                            return (
                              <tr key={key} className="border-t border-zinc-800 hover:bg-zinc-800 transition">
                                <td className="px-4 py-4">{q.question?.type === "text" ? trimText(q.question.content, 80) : <img src={q.question.content} alt="question" className="max-w-full rounded" />}</td>
                                <td className="px-4 py-4">
                                  <FileText onClick={() =>
                                window.open(`/sscsheet/gk/problem/${q.id}?chapter=${encodeURIComponent(chapter.title)}`, "_blank")
                              } className="w-6 h-6 mx-auto text-gray-400 hover:text-white cursor-pointer transition" />
                                </td>
                                <td className="px-4 py-4 text-center">
                                  <Youtube onClick={() =>
                                window.open(`/sscsheet/gk/problem/${q.id}?chapter=${encodeURIComponent(chapter.title)}`, "_blank")
                              } className="w-6 h-6 mx-auto text-red-500 hover:text-red-400 cursor-pointer transition" />
                                </td>
                                <td className="px-4 py-4 text-center">
                                  <Star
                                    className={`w-5 h-5 mx-auto cursor-pointer transition ${
                                      favourites[key] ? "fill-yellow-300 text-yellow-300" : "text-yellow-400 hover:text-yellow-300"
                                    }`}
                                    onClick={() => handleToggleFavourite(chapter.title, q.id)}
                                  />
                                </td>
                                <td className="px-4 py-4 text-center text-green-500">{q.status || "Not Attempted"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
