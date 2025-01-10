'use strict';

(function() {
  const RANDOM_PICTURES_COUNT = 12;

  const filtersContainerElement = document.querySelector('.img-filters');
  const defaultFilterElement = document.querySelector('#filter-default');
  const randomFilterElement = document.querySelector('#filter-random');
  const discussedFilterElement = document.querySelector('#filter-discussed');

  let pictures = [];
  let activeFilter = document.querySelector('.img-filters__button--active');

  const setPictures = (data) => {
    pictures = data;
  };

  const showFilters = () => {
    filtersContainerElement.classList.remove('img-filters--inactive');
  };

  const changeActiveFilter = (filterElement) => {
    activeFilter.classList.remove('img-filters__button--active');
    filterElement.classList.add('img-filters__button--active');
    activeFilter = filterElement;
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
    changeActiveFilter(defaultFilterElement);
  };

  const filterByRandom = () => {
    renderWithDebounce(getRandomPictures());
    changeActiveFilter(randomFilterElement);
  };

  const filterByCommentsCount = () => {
    renderWithDebounce(getMostDiscussedPictures());
    changeActiveFilter(discussedFilterElement);
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
