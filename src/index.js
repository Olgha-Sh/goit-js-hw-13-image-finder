import './styles.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import imageApi from './js/apiService.js';
import imageTemplate from './template/image.hbs';
import 'pnotify/src/PNotifyBrightTheme.css';
import PNotify from 'pnotify/dist/es/PNotify';
import * as basicLightbox from 'basiclightbox';

const searchInput = document.querySelector('input[name=query]');
const searchForm = document.querySelector('#search-form');
const loadMore = document.querySelector('button[data-action=load-more]');
const gallery = document.querySelector('.gallery');

let paginator;

searchForm.addEventListener('submit', searchImages);

function searchImages(e) {
  e.preventDefault();
  cleanDisplay();
  paginator = 1;
  const name = searchInput.value;
  if (name.length > 2) {
    imageApi.searchName(name, paginator).then(data => {
      if (data.hits.length >= 1) {
        addImages(data.hits);
        loadMore.classList.remove('is-hidden');
      } else {
        PNotify.alert(`Enter the correct image search ${name}`);
      }
    });
  } else {
    PNotify.error('Sorry you typed the wrong word');
  }
}

loadMore.addEventListener('click', loadMoreImages);

function loadMoreImages() {
  paginator += 1;
  const name = searchInput.value;
  imageApi.searchName(name, paginator).then(data => {
    addImages(data.hits);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  });
}

function cleanDisplay() {
  gallery.innerHTML = '';
  loadMore.classList.add('is-hidden');
}

function addImages(images) {
  const markup = imageTemplate(images);
  return gallery.insertAdjacentHTML('beforeend', markup);
}

document.querySelector('.gallery').onclick = e => {
  if (e.target.dataset.src != null) {
    basicLightbox.create(`<img src="${e.target.dataset.src}">`).show();
  }
};
