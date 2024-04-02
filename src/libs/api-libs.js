import dotenv from 'dotenv';
dotenv.config();

export const getAnimeData = async (resource, query) => {
    const api = await fetch(`${process.env.NEXT_PUBLIC_ANIME_BASE_API}/${resource}?${query}`);
    const data = await api.json();
    return data
}

export const getAnimeById = async (id, resource) => {
    const api = await fetch(`${process.env.NEXT_PUBLIC_ANIME_BASE_API}/anime/${id}/${resource}`);
    const data = await api.json();
    return data
}