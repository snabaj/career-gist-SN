import { setCache, getCache } from "../../cache/redisCacheService.js";
import JobModel from "../../models/JobModel.js";

export const fetchJobs = async (query: string) => {
  const cacheKey = `job-search:${query}`;

  const cachedJobs = await getCache(cacheKey);
  if (cachedJobs) {
    console.log("📌 Serving jobs from cache...");
    return cachedJobs;
  }

  try {
    const response = await fetch(`https://jobs.github.com/positions.json?search=${query}`);

    if (!response.ok) {
      console.warn("⚠️ GitHub Jobs API returned an error:", response.status);
      return {
        message: "GitHub Jobs API is currently unavailable. Serving cached data if available.",
        fallback: true
      };
    }

    const data = await response.json();
    await setCache(cacheKey, data, 3600);
    await JobModel.upsert({ query, results: JSON.stringify(data) });

    return data;
  } catch (error) {
    console.error("❌ GitHub Jobs API failed:", error instanceof Error ? error.message : error);

    const savedJobs = await JobModel.findOne({ where: { query } });
    if (savedJobs) {
      console.warn("⚠️ API is down, but serving jobs from PostgreSQL...");
      return JSON.parse(savedJobs.results);
    }

    return {
      message: "GitHub Jobs API is unavailable, and no cached data exists.",
      error: true
    };
  }
};

export default fetchJobs;