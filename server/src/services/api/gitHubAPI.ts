import { setCache, getCache } from "../../cache/redisCacheService";
import axios from "axios";
import JobModel from "../../models/JobModel.js";

export const fetchJobs = async (query: string) => {
  const cacheKey = `job-search:${query}`;

  const cachedJobs = await getCache(cacheKey);
  if (cachedJobs) {
    console.log("📌 Serving jobs from cache...");
    return cachedJobs;
  }

  try {
    const response = await axios.get(`https://jobs.github.com/positions.json?search=${query}`);

    if (response.status !== 200) throw new Error("GitHub Jobs API is down.");

    await setCache(cacheKey, response.data, 3600);

    await JobModel.upsert({ query, results: JSON.stringify(response.data) });

    return response.data;
  } catch (error) {
    console.error("❌ GitHub Jobs API failed:", error instanceof Error ? error.message : error);

    const savedJobs = await JobModel.findOne({ where: { query } });
    if (savedJobs) {
      console.warn("⚠️ API is down, but serving jobs from PostgreSQL...");
      return JSON.parse(savedJobs.results);
    }

    throw new Error("⚠️ GitHub Jobs API is currently unavailable. Please try again later.");
  }
};
