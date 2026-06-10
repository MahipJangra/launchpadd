import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4000/api" });

export async function analyzeIdea(messages) {
  const { data } = await api.post("/analyze", { messages });
  return data;
}
