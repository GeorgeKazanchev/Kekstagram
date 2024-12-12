'use strict';

(function() {
  const PICTURES_COUNT = 25;
  const MIN_LIKES_COUNT = 15;
  const MAX_LIKES_COUNT = 200;
  const MAX_COMMENTS_COUNT = 2;

  const COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ];

  const DESCRIPTIONS = [
    `Тестим новую камеру!`,
    `Затусили с друзьями на море`,
    `Как же круто тут кормят`,
    `Отдыхаем...`,
    `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
    `Вот это тачка!`,
  ];

  const generatePictures = () => {
    const pictures = [];
    for (let i = 0; i < PICTURES_COUNT; ++i) {
      const url = `photos/${i + 1}.jpg`;
      const likes = Math.floor(
        Math.random() * (MAX_LIKES_COUNT - MIN_LIKES_COUNT) + MIN_LIKES_COUNT
      );
      const description = window.util.getRandomArrayItem(DESCRIPTIONS);
      const commentsCount = window.util.getRandomInRange(1, MAX_COMMENTS_COUNT);
      const comments = new Array(commentsCount).fill(window.util.getRandomArrayItem(COMMENTS));

      pictures.push({
        url,
        likes,
        comments,
        description,
      });
    }
    return pictures;
  };

  window.data = {
    generatePictures,
  };
})();
