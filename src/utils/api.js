import axios from "axios";

const api = axios.create({ baseURL: "https://launchpad-frontend-vhhb.onrender.com" });

export async function analyzeIdea(messages) {
  const { data } = await api.post("/analyze", { messages });
  return data;
}
