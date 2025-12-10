import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
const lightbox = new SimpleLightbox(".gallery a", {
    captions: true,
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, }) => `
        <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="info">
        <li><b>Likes:</b> ${likes}</li>
        <li><b>Views:</b> ${views}</li>
        <li><b>Comments:</b> ${comments}</li>
        <li><b>Downloads:</b> ${downloads}</li>
        </ul>
        </li>
        `
        )
        .join("");
    
    galleryContainer.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
}
export function clearGallery() {
    galleryContainer.innerHTML = "";
}
export function showLoader() {
    galleryContainer.classList.add("loading");
}
export function hideLoader() {
    galleryContainer.classList.remove("loading")
}
export function showLoadMoreButton() {
    LoadMoreButton.hidden = false;
}
export function hideLoadMoreButton() {
    LoadMoreButton.hidden = true;
}