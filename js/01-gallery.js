import { galleryItems } from './gallery-items.js';


const galleryContainer = document.querySelector('.gallery');
const galleryImage = onClickGalleryContainer(galleryItems);
let modalContainer;

galleryContainer.insertAdjacentHTML('beforeend', galleryImage);
galleryContainer.addEventListener('keydown', onGalleryContainerClose);

function onClickGalleryContainer(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
             <a class="gallery__link" href="${original}">
                <img class="gallery__image lazyload"
                    data-src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
        `;
    }).join('');
};

galleryContainer.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modalContainer = basicLightbox.create(`
		<img src="${event.target.dataset.source}" width="1280" height="900">
	`);
  modalContainer.show();
});

function onGalleryContainerClose(event) {
  if (event.code !== 'Escape') {
    return;
  }
 modalContainer.close();
};
