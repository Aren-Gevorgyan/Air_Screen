import { apiKey, BASE_URL } from "@/assets/constants";

export const fetchMovies = async () => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json();
};