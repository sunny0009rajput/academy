"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import gkData from "../../../../../../../codemonarchacademy/gk.json"; // 👈 import your local data

export default function ProblemPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const chapter = searchParams.get("chapter");
  const router = useRouter();

  const [problem, setProblem] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  // ✅ Fetch data from local file instead of API
  useEffect(() => {
    const fetchProblem = () => {
      const chapterKey = chapter?.replace(/\s/g, "_");
      const chapterData = gkData[chapter] || gkData[chapterKey];

      if (!chapterData || !chapterData[1]?.Questions) return;

      const data = chapterData[1].Questions;
      setAllQuestions(data);

      // Find current question by id
      const probIndex = data.findIndex((q) => String(q.id) === id);
      setCurrentQuestionIndex(probIndex);
      setProblem(data[probIndex]);
    };

    fetchProblem();
  }, [chapter, id]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === problem.answer) {
      setCorrectOption(option);
      toast.success("✅ You are correct!");
    } else {
      setCorrectOption(problem.answer);
      toast.error("❌ Wrong answer, try again!");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setProblem(allQuestions[nextIndex]);
      setSelectedOption(null);
      setCorrectOption(null);
      router.push(`/sscsheet/gk/problem/${allQuestions[nextIndex].id}?chapter=${chapter}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setProblem(allQuestions[prevIndex]);
      setSelectedOption(null);
      setCorrectOption(null);
      router.push(`/sscsheet/gk/problem/${allQuestions[prevIndex].id}?chapter=${chapter}`);
    }
  };

  if (!problem)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading problem...
      </div>
    );

  // ✅ Extract YouTube video ID
  const getYouTubeId = (url) => {
    const match = url?.match(
      /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch\?v=)([^\s&?]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(problem.videoUrl);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 md:px-16">
      <Toaster position="top-center" />

      <div className="w-full max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-orange-400">
          {chapter} Problem
        </h1>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 mb-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Previous Question
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === allQuestions.length - 1}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Next Question
          </button>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Question:</h2>
          {problem.question?.type === "text" ? (
            <p className="text-gray-200 text-lg">{problem.question.content}</p>
          ) : (
            <Image
              src={problem.question.content}
              alt="question"
              width={600}
              height={300}
              className="rounded-lg border border-zinc-700"
            />
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {problem.options.map((opt, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(opt.text)}
              className={`cursor-pointer p-3 rounded-xl border transition-all ${
                selectedOption === opt.text
                  ? opt.text === correctOption
                    ? "bg-green-600 border-green-500"
                    : "bg-red-600 border-red-500"
                  : "border-zinc-700 hover:border-orange-400"
              }`}
            >
              <p className="text-gray-200 text-base">{opt.text}</p>
            </div>
          ))}
        </div>

        {/* Solution */}
        <div>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            {showSolution ? "Hide Solution" : "View Solution"}
          </button>

          {showSolution && problem.solution ? (
            problem.solution.type === "text" ? (
              <div className="text-gray-300 leading-relaxed mt-3">
                {problem.solution.content.split("#").map((line, idx) => (
                  <p key={idx} className="mb-2">
                    {line.trim()}
                  </p>
                ))}
              </div>
            ) : (
              <Image
                src={problem.solution.content}
                alt="solution"
                width={600}
                height={300}
                className="rounded-lg border border-zinc-700 mt-3"
              />
            )
          ) : null}
        </div>

        {/* Video Section */}
        {videoId && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Video Explanation:</h2>
            {!playVideo ? (
              <div
                className="relative w-full pb-[56.25%] cursor-pointer rounded-lg overflow-hidden"
                onClick={() => setPlayVideo(true)}
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="video thumbnail"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-orange-500 rounded-full flex items-center justify-center opacity-80 w-16 h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="w-8 h-8 ml-1"
                    >
                      <path d="M4 2v20l18-10L4 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
