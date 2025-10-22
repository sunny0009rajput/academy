"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, FileText, Star, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/Navbar";
import gkData from "../../data/gk.json"; // local JSON
import {
  getChapterProgress,
  updateProblemStatus,
  updateFavourite,
} from "../../db.js"; // import your IndexedDB functions

export default function Page() {
  const [chapters, setChapters] = useState([]);
  const [chapterData, setChapterData] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});
  const [completedProblems, setCompletedProblems] = useState({});
  const [favourites, setFavourites] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Load chapters from local JSON
  useEffect(() => {
    const fetchChapters = async () => {
      const chaptersList = gkData?.chapters || [];
      setChapters(chaptersList);
      setLoading(false);

      // Load chapter data & progress
      chaptersList.forEach((chapter) => {
        loadChapterData(chapter);
        loadChapterProgress(chapter);
      });
    };

    fetchChapters();
  }, []);

  // Load chapter questions
  const loadChapterData = (chapter) => {
    const chapterTitle = chapter.title;
    const chapterKey = chapterTitle.replace(/\s/g, "_");
    const data = gkData[chapterTitle] || gkData[chapterKey];
    if (!data) return console.warn(`No data for ${chapterTitle}`);
    setChapterData((prev) => ({ ...prev, [chapterTitle]: data }));
  };

  // Load progress and favourites from IndexedDB
  const loadChapterProgress = async (chapter) => {
    const progress = await getChapterProgress("GK", chapter.title);
    const completedMap = Object.fromEntries(
      progress.completedProblems.map((id) => [`${chapter.title}-problem-${id}`, true])
    );
    const favMap = Object.fromEntries(
      progress.favourites.map((id) => [`${chapter.title}-problem-${id}`, true])
    );

    setCompletedProblems((prev) => ({ ...prev, ...completedMap }));
    setFavourites((prev) => ({ ...prev, ...favMap }));
  };

  const toggleChapter = (title) =>
    setExpandedChapters((prev) => ({ ...prev, [title]: !prev[title] }));

  // Mark problem complete & save in IndexedDB
  const handleProblemCheck = async (chapterTitle, problemId) => {
    const key = `${chapterTitle}-problem-${problemId}`;
    const completed = !completedProblems[key];
    setCompletedProblems((prev) => ({ ...prev, [key]: completed }));
    await updateProblemStatus("GK", chapterTitle, problemId, completed);
  };

  // Toggle favourite & save in IndexedDB
  const handleFavourite = async (chapterTitle, problemId) => {
    const key = `${chapterTitle}-problem-${problemId}`;
    const isFav = !favourites[key];
    setFavourites((prev) => ({ ...prev, [key]: isFav }));
    await updateFavourite("GK", chapterTitle, problemId, isFav);
  };

  const truncateWords = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    const limit = typeof window !== "undefined" && window.innerWidth < 640 ? 5 : 10;
    return words.length <= limit ? text : words.slice(0, limit).join(" ") + "...";
  };

  if (loading) return <p className="text-white">Loading chapters...</p>;

  return (
    <div className="min-h-screen bg-black text-white pt-18 px-2 py-2 lg:px-28 lg:py-28">
      <Navbar />
      <h1 className="text-3xl text-center font-bold pt-10 mb-6">SSC GK Chapters</h1>
    <p className="text-xl text-center font-bold pt-2 mb-4">This course is designed for aspirants who want to master General Knowledge<br></br> for SSC exams in a structured and easy-to-understand way.<br></br>Each chapter is carefully organized to cover concepts, important facts,<br></br> and practice questions, helping students build confidence and excel in exams.</p>
      {/* Revision button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/sscsheet/gk/revision")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Revision
        </button>
      </div>

      {chapters.map((chapter) => {
        const data = chapterData[chapter.title] || [];
        const isExpanded = expandedChapters[chapter.title];

        const uniqueProblems = Array.from(
          new Map(data?.[1]?.Questions?.map((q) => [q.id, q])).values()
        );

        const totalProblems = uniqueProblems.length || 0;
        const completedCount = uniqueProblems.filter(
          (q) => completedProblems[`${chapter.title}-problem-${q.id}`]
        ).length;

        const progressPercent = totalProblems > 0 ? (completedCount / totalProblems) * 100 : 0;

        return (
          <div
            key={chapter.id}
            className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden mb-6"
          >
            {/* Chapter header */}
            <div
              className="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-zinc-800 transition"
              onClick={() => toggleChapter(chapter.title)}
            >
              <div className="flex items-center gap-4">
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                )}
                <h2 className="text-xl sm:text-2xl font-semibold">{chapter.title}</h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-48 lg:w-64 bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-orange-500 h-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="text-gray-400 text-sm font-medium">
                  {completedCount} / {totalProblems}
                </span>
              </div>
            </div>

            {/* Expanded questions */}
            {isExpanded && totalProblems > 0 && (
              <div className="border-t border-zinc-800 p-4 sm:p-6">
                <table className="w-full">
                  <thead className="bg-zinc-800 text-gray-400 text-xs sm:text-sm">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Done</th>
                      <th className="px-4 py-3 text-left font-medium">Question</th>
                      <th className="px-4 py-3 text-center font-medium">Solution</th>
                      <th className="px-4 py-3 text-center font-medium">Video</th>
                      <th className="px-4 py-3 text-center font-medium">Fav</th>
                      <th className="px-4 py-3 text-center font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueProblems.map((q) => {
                      const key = `${chapter.title}-problem-${q.id}`;
                      return (
                        <tr key={q.id} className="border-t border-zinc-800 hover:bg-zinc-800 transition">
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={!!completedProblems[key]}
                              onChange={() => handleProblemCheck(chapter.title, q.id)}
                              className="w-4 h-4 accent-orange-500"
                            />
                          </td>
                          <td className="px-4 py-4">
                            {q.question?.type === "text" ? (
                              truncateWords(q.question.content)
                            ) : (
                              <img src={q.question.content} alt="question" className="max-w-full rounded" />
                            )}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() =>
                                window.open(`/sscsheet/gk/problem/${q.id}?chapter=${encodeURIComponent(chapter.title)}`, "_blank")
                              }
                              className="text-gray-400 hover:text-white"
                            >
                              <FileText className="w-6 h-6 mx-auto" />
                            </button>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button onClick={() =>
                                window.open(`/sscsheet/gk/problem/${q.id}?chapter=${encodeURIComponent(chapter.title)}`, "_blank")
                              } className="text-red-500 hover:text-red-400">
                              <Youtube className="w-6 h-6 mx-auto" />
                            </button>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => handleFavourite(chapter.title, q.id)}
                              className={`transition ${favourites[key] ? "text-yellow-300" : "text-yellow-400 hover:text-yellow-300"}`}
                            >
                              <Star className={`w-5 h-5 mx-auto ${favourites[key] ? "fill-yellow-300" : ""}`} />
                            </button>
                          </td>
                          <td className="px-4 py-4 text-center text-green-500">{q.status || "Pending"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
