// db.js
import { openDB } from "idb";

const DB_NAME = "StudyAppDB";
const DB_VERSION = 1;
const STORE_NAME = "progress";

// Initialize IndexedDB
export async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        // id format: subject-chapter (e.g., "GK-Dance")
        store.createIndex("subject", "subject");
        store.createIndex("chapter", "chapter");
      }
    },
  });
  return db;
}

// Save progress/favourites for a chapter
export async function saveChapterProgress(subject, chapter, completedProblems, favourites) {
  const db = await initDB();
  const id = `${subject}-${chapter}`;
  await db.put(STORE_NAME, {
    id,
    subject,
    chapter,
    completedProblems, // array of question IDs
    favourites,        // array of question IDs
  });
}

// Get progress/favourites for a chapter
export async function getChapterProgress(subject, chapter) {
  const db = await initDB();
  const id = `${subject}-${chapter}`;
  const data = await db.get(STORE_NAME, id);
  return data || { completedProblems: [], favourites: [] };
}

// Update a single problem's completed status
export async function updateProblemStatus(subject, chapter, problemId, completed) {
  const progress = await getChapterProgress(subject, chapter);
  let { completedProblems, favourites } = progress;

  if (completed) {
    if (!completedProblems.includes(problemId)) completedProblems.push(problemId);
  } else {
    completedProblems = completedProblems.filter((id) => id !== problemId);
  }

  await saveChapterProgress(subject, chapter, completedProblems, favourites);
}

// Update a single problem's favourite status
export async function updateFavourite(subject, chapter, problemId, isFav) {
  const progress = await getChapterProgress(subject, chapter);
  let { completedProblems, favourites } = progress;

  if (isFav) {
    if (!favourites.includes(problemId)) favourites.push(problemId);
  } else {
    favourites = favourites.filter((id) => id !== problemId);
  }

  await saveChapterProgress(subject, chapter, completedProblems, favourites);
}

// Get all chapters' progress for a subject
export async function getAllChaptersProgress(subject) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const allRecords = await store.getAll();
  return allRecords.filter((rec) => rec.subject === subject);
}
