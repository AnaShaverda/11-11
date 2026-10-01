import PhotoUpload, { PhotoUploadEditor } from "./types/PhotoUpload.jsx";
import GuestBook, { GuestBookEditor } from "./types/GuestBook.jsx";
import Quiz, { QuizEditor, isQuizReady } from "./types/Quiz.jsx";
import { interactionDefinitions } from "./data/interactionDefinitions.js";
import { eventModules } from "./data/eventModules.js";

export const interactionRegistry = {
  "photo-upload": { ...interactionDefinitions["photo-upload"], metadata: eventModules["photo-upload"], Component: PhotoUpload, Editor: PhotoUploadEditor },
  "guest-book": { ...interactionDefinitions["guest-book"], metadata: eventModules["guest-book"], Component: GuestBook, Editor: GuestBookEditor },
  quiz: { ...interactionDefinitions.quiz, metadata: eventModules.quiz, Component: Quiz, Editor: QuizEditor, isReady: isQuizReady },
};
