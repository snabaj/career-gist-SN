import { setCache, getCache } from "../cache/redisCacheService.js";
import JobModel from "../models/JobModel.js";

const JSEARCH_API_URL = "https://jsearch.p.rapidapi.com/search";
const RAPIDAPI_HOST = "jsearch.p.rapidapi.com";
const RAPIDAPI_KEY = "4c1c0eb8d1mshf21fead71f6126bp1c4d51jsn398f10a07a9e"; // Move to env file later

export const fetchJobs = async (query: string): Promise<any> => {
  const cacheKey = `job-search:${query}`;

  // Check Redis Cache First
  const cachedJobs: string | null = await getCache(cacheKey);
  if (cachedJobs) {
    console.log("📌 Serving jobs from cache...");
    return JSON.parse(cachedJobs); // Ensure JSON format
  }

  try {
    const response = await fetch(`${JSEARCH_API_URL}?query=${query}&num_pages=1`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": RAPIDAPI_HOST,
        "X-RapidAPI-Key": RAPIDAPI_KEY,
      },
    });

    if (!response.ok) {
      console.warn("⚠️ JSearch API returned an error:", response.status);
      return {
        message: "JSearch API is currently unavailable. Serving cached data if available.",
        fallback: true,
      };
    }

    const data = await response.json();
    await setCache(cacheKey, JSON.stringify(data), 1800); // Store as string

    let existingJob = await JobModel.findOne({ where: { query } });

    if (existingJob instanceof JobModel) {
      await existingJob.update({ results: JSON.stringify(data) });
    } else {
      await JobModel.create({query, results: JSON.stringify(data)});
    }

    return data;
  } catch (error) {
    console.error("❌ JSearch API failed:", error instanceof Error ? error.message : error);
    return { message: "Error fetching jobs. Please try again later." };
  }
};

export default fetchJobs;