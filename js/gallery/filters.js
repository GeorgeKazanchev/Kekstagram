'use strict';

(function() {
  const RANDOM_PICTURES_COUNT = 10;

  const filtersContainerElement = document.querySelector('.img-filters');
  const defaultFilterElement = document.querySelector('#filter-default');
  const randomFilterElement = document.querySelector('#filter-random');
  const discussedFilterElement = document.querySelector('#filter-discussed');

  let pictures = [];

  const setPictures = (data) => {
    pictures = data;
  };

  const showFilters = () => {
    filtersContainerElement.classList.remove('img-filters--inactive');
  };

  const resetActiveFilter = () => {
    const activeElements = filtersContainerElement.querySelectorAll('.img-filters__button--active');
    activeElements.forEach((elem) => {
      elem.classList.remove('img-filters__button--active');
    });
  };

  const getRandomPictures = () => {
    const randomPictures = [];
    const picturesLeft = [...pictures];

    while (randomPictures.length < RANDOM_PICTURES_COUNT && picturesLeft.length > 0) {
      const randomIndex = window.util.getRandomArrayIndex(picturesLeft);
      randomPictures.push(...picturesLeft.splice(randomIndex, 1));
    }

    return randomPictures;
  };

  const getMostDiscussedPictures = () => {
    return [...pictures].sort((a, b) => b.comments.length - a.comments.length);
  };

  const renderWithDebounce = window.debounce(window.render.gallery);

  const filterByDefault = () => {
    renderWithDebounce(pictures);
    resetActiveFilter();
    defaultFilterElement.classList.add('img-filters__button--active');
  };

  const filterByRandom = () => {
    renderWithDebounce(getRandomPictures());
    resetActiveFilter();
    randomFilterElement.classList.add('img-filters__button--active');
  };

  const filterByCommentsCount = () => {
    renderWithDebounce(getMostDiscussedPictures());
    resetActiveFilter();
    discussedFilterElement.classList.add('img-filters__button--active');
  };

  defaultFilterElement.addEventListener('click', () => {
    filterByDefault();
  });

  randomFilterElement.addEventListener('click', () => {
    filterByRandom();
  });

  discussedFilterElement.addEventListener('click', () => {
    filterByCommentsCount();
  });

  window.filters = {
    setPictures,
    show: showFilters,
  };
})();
