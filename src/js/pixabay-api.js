import axios from "axios";

const apiKey = "53646537-90648830b558eb0aebf2e1e33";
const baseUrl = "https://pixabay.com/api/";
const perPage = 15;

export async function getImagesByQuery(query) {
    const response = await axios.get(baseUrl, {
        params: {
            key: apiKey,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        },
    });
    return {
        hits: response.data.hits,
        totalHits: response.data.totalHits,
    };
}