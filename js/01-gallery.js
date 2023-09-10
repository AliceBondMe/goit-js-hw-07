import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
let instance;

createMarkup();

galleryEl.addEventListener("click", handleClick);

function handleClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const bigImageRef = evt.target.dataset.source;

  instance = basicLightbox.create(
    `
    <img src="${bigImageRef}" width="800" height="600">
`,
    {
      onShow: (instance) => window.addEventListener("keydown", handleKeydown),
      onClose: (instance) =>
        window.removeEventListener("keydown", handleKeydown),
    }
  );
  instance.show();
}

function handleKeydown(evt) {
  if (evt.key === "Escape") {
    instance.close();
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
