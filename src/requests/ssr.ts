import { apiKey, BASE_URL } from "@/assets/constants";
import { ActorsType, MovieData } from "@/assets/types";

export const getMovie = async (id:  string ): Promise<MovieData> => {
    const url = `${BASE_URL}/movie/${id}?api_key=${apiKey}`;
    const response = await fetch(url, { cache: "force-cache" });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return await response.json();
}

export const getActors = async (id: string): Promise<{ cast: ActorsType }> => {
    const url = `${BASE_URL}/movie/${id}/credits?api_key=${apiKey}`;
    const response = await fetch(url, { cache: "force-cache" });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return await response.json();
}

export const getPopularMovies = async (): Promise<Array<MovieData>> => {
    const url = (page: number) =>
        `${BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    const [firstPage, secondPage] = await Promise.all([
        fetch(url(1), { cache: "force-cache" }),
        fetch(url(2), { cache: "force-cache" }),
    ]);

    if (!firstPage.ok || !secondPage.ok) {
        throw new Error('Failed to fetch data');
    }

    const firstPageData = await firstPage.json();
    const secondPageData = await secondPage.json();
    const data = [...firstPageData.results, ...secondPageData.results];

    return data;
}