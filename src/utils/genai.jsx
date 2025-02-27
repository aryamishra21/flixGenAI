const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_KEY } = require("./constants");

export const genAI = new GoogleGenerativeAI(GEMINI_KEY);