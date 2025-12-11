import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { clearForm } from "./js/render-functions";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const perPage = 15;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let query = "";
let page = 1;
let totalHits = 0;


form.addEventListener("submit", async (e) => {
    e.preventDefault();
     query = form["search-text"].value.trim();

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query",
            position: "topRight",
        });
        return;
    }

    page = 1;
    clearGallery(gallery);
    hideLoadMoreButton(loadMoreBtn);
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            return;
        }

        await delay(2000)

        createGallery(data.hits, gallery);

        if (data.hits.length === perPage && page * perPage < totalHits) {
            showLoadMoreButton();
        } 
         
    } catch (err) {
        iziToast.error({ message: "Error fetching images", position: "topRight" });
        console.error(err);
    } finally {
        hideLoader();
        clearForm(form);
    }
});

loadMoreBtn.addEventListener("click", async () => {
    page += 1;
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);

await delay(2000)

        createGallery(data.hits);

        const { height: cardHeight } =
            gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });

        if (page * perPage >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }
    } catch (err) {
        iziToast.error({
            message: "Error fetching more images",
            position: "topRight",
        });
        console.error(err);
    } finally {
        hideLoader();
    }
});