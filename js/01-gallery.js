import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
let instance;

createMarkup();

galleryEl.addEventListener("click", handleClick);

function handleClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const bigImageRef = evt.target.dataset.source;

  instance = basicLightbox.create(`
    <img src="${bigImageRef}" width="800" height="600">
`);
  instance.show();
  document.addEventListener("keydown", handleKeydown);
}

function handleKeydown(evt) {
  if (evt.key === "Escape") {
    instance.close();
  }
  doNotListenEsc();
}

function doNotListenEsc() {
  if (!instance.visible()) {
    document.removeEventListener("keydown", handleKeydown);
  }
}

function createMarkup() {
  const markup = galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);
}
