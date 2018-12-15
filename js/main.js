'use strict';

var OBJECT_DESK_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var picture = document.querySelector('#picture').content;
var pictures = document.querySelector('.pictures');
var bigPictureImg = document.querySelector('.big-picture');
var socialComment = document.querySelector('.social__comment');
var photoArray;
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

/**
 * возвращает случайное число в диапазоне от до
 * @param {number} min генерирует число ОТ
 * @param {number} max генерирует число ДО
 * @return {number} случайное число в диапазоне от  min до max
 */
var getRandInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * создает объект фотография
 * @param {*} count
 * @return {Array} массив фотографий
 */
var generatePhotoArray = function (count) {
  var photo = [];

  for (var i = 1; i < count + 1; i++) {
    photo.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandInteger(MIN_LIKES, MAX_LIKES),
      comments: comments[getRandInteger(0, comments.length)]
    });
  }
  return photo;
};

/**
 * отрисовывает фотографии
 */
var renderPhoto = function () {
  var fragment = document.createDocumentFragment();
  photoArray.forEach(function (value) {
    var template = picture.cloneNode(true);
    template.querySelector('.picture__likes').textContent = value.likes;
    template.querySelector('.picture__comments').textContent = value.comments.length;
    template.querySelector('.picture__img').src = value.url;
    fragment.appendChild(template);
  });
  pictures.appendChild(fragment);
};

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var renderBigPhoto = function (value) {
  var fragment = document.createDocumentFragment();
  var comment = [];
  bigPictureImg.querySelector('.big-picture__img img').src = 'photos/' + getRandInteger(1, 25) + '.jpg';

  for (var i = 0; i < getRandInteger(1, 3); i++) {
    comment.push(comments[getRandInteger(0, comments.length - 1)]);
  }

  comment.forEach(function (item) {
    var node = socialComment.cloneNode(true);
    node.querySelector('.social__text').textContent = item;
    node.querySelector('.social__picture').src = 'img/avatar-' + getRandInteger(1, 6) + '.svg';
    fragment.appendChild(node);
  });
  var commentsHolder = bigPictureImg.querySelector('.social__comments');
  commentsHolder.innerHTML = '';
  commentsHolder.appendChild(fragment);
  bigPictureImg.querySelector('.likes-count').textContent = value.likes;
  bigPictureImg.classList.remove('hidden');
};

var startUp = function () {
  photoArray = generatePhotoArray(OBJECT_DESK_PHOTOS);
  renderPhoto();
  renderBigPhoto(photoArray[0]);
};

startUp();


