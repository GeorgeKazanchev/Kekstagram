const pictures = [
  {
    url: 'photos/1.jpg',
    likes: 15,
    description: 'Вид на наш отель',
    comments: [
      {
        text: 'Как красиво!',
        avatarUrl: 'img/avatar-1.svg',
      },
    ],
  },
  {
    url: 'photos/2.jpg',
    likes: 36,
    description: 'Идём плавать',
    comments: [],
  },
  {
    url: 'photos/3.jpg',
    likes: 135,
    description: 'Это ли не рай?',
    comments: [
      {
        text: 'Фантастически красивая фотка!',
        avatarUrl: 'img/avatar-1.svg',
      },
      {
        text: 'Этот вид будто взят из фильмов про Пиратов Карибского моря) Чем-то мне напомнило',
        avatarUrl: 'img/avatar-2.svg',
      },
      {
        text: 'Вааааау) Теперь тоже туда хочу',
        avatarUrl: 'img/avatar-3.svg',
      },
      {
        text: 'Будут ещё фотки из этого места?)',
        avatarUrl: 'img/avatar-4.svg',
      },
      {
        text: 'Мы с Серёжей тоже когда-то побывали в таком месте, впечатлений на всю жизнь!',
        avatarUrl: 'img/avatar-5.svg',
      },
    ],
  },
  {
    url: 'photos/4.jpg',
    likes: 47,
    description: 'Катюха)',
    comments: [
      {
        text: 'Завидую, братан',
        avatarUrl: 'img/avatar-2.svg',
      },
      {
        text: 'Красотка!',
        avatarUrl: 'img/avatar-3.svg',
      },
      {
        text: 'Зачем она взяла на пляж дорогущую камеру?',
        avatarUrl: 'img/avatar-6.svg',
      },
      {
        text: 'Лайк однозначно',
        avatarUrl: 'img/avatar-5.svg',
      },
      {
        text: '))',
        avatarUrl: 'img/avatar-3.svg',
      },
      {
        text: 'Это вы где?',
        avatarUrl: 'img/avatar-1.svg',
      },
      {
        text: 'Блин, теперь и мне на пляж захотелось...',
        avatarUrl: 'img/avatar-2.svg',
      },
      {
        text: 'Это Canon у неё? Что-то не могу разглядеть',
        avatarUrl: 'img/avatar-4.svg',
      },
      {
        text: '10/10',
        avatarUrl: 'img/avatar-1.svg',
      },
      {
        text: 'Вы ещё в отпуске или уже вернулись?',
        avatarUrl: 'img/avatar-5.svg',
      },
      {
        text: 'Катюха вся такая на спорте)',
        avatarUrl: 'img/avatar-3.svg',
      },
    ],
  },
  {
    url: 'photos/5.jpg',
    likes: 194,
    description: 'Зашли сегодня в необычный ресторан',
    comments: [
      {
        text: 'Хехехе',
        avatarUrl: 'img/avatar-2.svg',
      },
      {
        text: 'Какое необычное блюдо)',
        avatarUrl: 'img/avatar-4.svg',
      },
      {
        text: 'Мне лично было-бы неприятно их есть...',
        avatarUrl: 'img/avatar-6.svg',
      },
    ],
  },
  {
    url: 'photos/6.jpg',
    likes: 163,
    description: '^_^',
    comments: [
      {
        text: 'Твоя?)',
        avatarUrl: 'img/avatar-6.svg',
      },
      {
        text: 'Где сфоткал?',
        avatarUrl: 'img/avatar-3.svg',
      },
      {
        text: 'Ого! Это McLaren?',
        avatarUrl: 'img/avatar-1.svg',
      },
      {
        text: 'Тачка - просто пушка',
        avatarUrl: 'img/avatar-2.svg',
      },
      {
        text: 'У владельца разрешение спросил, чтобы сфотографировать?',
        avatarUrl: 'img/avatar-5.svg',
      },
      {
        text: 'Мне как-то больше кабриолеты нравятся. Но эта тоже ничего',
        avatarUrl: 'img/avatar-4.svg',
      },
    ],
  },
  {
    url: 'photos/7.jpg',
    likes: 90,
    description: 'Им нужно увеличить порции...',
    comments: [
      {
        text: 'Это полноценное блюдо, серьёзно?) Одна клубничка?',
        avatarUrl: 'img/avatar-2.svg',
      },
      {
        text: 'Не подскажете, что это за место?',
        avatarUrl: 'img/avatar-3.svg',
      },
    ],
  },
  {
    url: 'photos/8.jpg',
    likes: 40,
    description: 'Начинаю правильно питаться',
    comments: [
      {
        text: 'Выглядит аппетитно) Удачи с ЗОЖ',
        avatarUrl: 'img/avatar-1.svg',
      },
    ],
  },
  {
    url: 'photos/9.jpg',
    likes: 118,
    description: 'Вы когда-нибудь видели, чтобы кто-то летал так низко?',
    comments: [
      {
        text: 'Честно говоря, выглядит довольно страшно. А если он врежется куда-нибудь?',
        avatarUrl: 'img/avatar-5.svg',
      },
      {
        text: 'Ты о чём? Не вижу ничего летающего на этой фотке',
        avatarUrl: 'img/avatar-6.svg',
      },
    ],
  },
  {
    url: 'photos/10.jpg',
    likes: 130,
    description: 'Очень удобная вещь! Всем советую',
    comments: [],
  },
  {
    url: 'photos/11.jpg',
    likes: 48,
    description: 'Одна из фоток с нашего отпуска на Ямайке',
    comments: [
      {
        text: 'Сууупер',
        avatarUrl: 'img/avatar-2.svg',
      },
    ],
  },
  {
    url: 'photos/12.jpg',
    likes: 153,
    description: 'Моя новенькая Audi',
    comments: [
      {
        text: 'Ого! За сколько взял?',
        avatarUrl: 'img/avatar-6.svg',
      },
      {
        text: 'Как можно на такой машине ездить по таким улицам -_-',
        avatarUrl: 'img/avatar-2.svg',
      },
    ],
  },
  {
    url: 'photos/13.jpg',
    likes: 147,
    description: '#ЗОЖ',
    comments: [
      {
        text: 'Трава какая-то, ей богу...',
        avatarUrl: 'img/avatar-4.svg',
      },
      {
        text: 'А я такое люблю - и вкусно, и полезно',
        avatarUrl: 'img/avatar-5.svg',
      },
    ],
  },
  {
    url: 'photos/14.jpg',
    likes: 168,
    description: 'Суши-кот)',
    comments: [
      {
        text: ')',
        avatarUrl: 'img/avatar-6.svg',
      },
      {
        text: 'Ахаха',
        avatarUrl: 'img/avatar-1.svg',
      },
      {
        text: 'В чьё больное сознание пришла мысль положить в суши ...кота?',
        avatarUrl: 'img/avatar-3.svg',
      },
    ],
  },
  {
    url: 'photos/15.jpg',
    likes: 136,
    description: 'Не могу нарадоваться новой покупкой',
    comments: [
      {
        text: 'Ты на WB их заказал?',
        avatarUrl: 'img/avatar-3.svg',
      },
    ],
  },
  {
    url: 'photos/16.jpg',
    likes: 178,
    description: 'Просто невероятный вид!',
    comments: [
      {
        text: 'Ооооох, как-бы я хотел оказаться там внизу...',
        avatarUrl: 'img/avatar-5.svg',
      },
    ],
  },
  {
    url: 'photos/17.jpg',
    likes: 97,
    description: 'Сходили на концерт в Сан-Паоло',
    comments: [
      {
        text: 'А что за концерт?',
        avatarUrl: 'img/avatar-2.svg',
      },
      {
        text: 'Какие молодцы, культурно развиваетесь',
        avatarUrl: 'img/avatar-4.svg',
      },
    ],
  },
  {
    url: 'photos/18.jpg',
    likes: 176,
    description: 'Собираюсь купить эту красавицу) Что думаете?',
    comments: [
      {
        text: 'На твоём месте я бы не думал, а давно бы уже купил её :)',
        avatarUrl: 'img/avatar-5.svg',
      },
    ],
  },
  {
    url: 'photos/19.jpg',
    likes: 29,
    description: 'Смотрите, что жена купила. Просто чудо инженерной мысли!',
    comments: [
      {
        text: 'Честно говоря, выглядит странновато)',
        avatarUrl: 'img/avatar-5.svg',
      },
    ],
  },
  {
    url: 'photos/20.jpg',
    likes: 67,
    description: 'Это был невероятный отпуск! Надо будет слетать туда снова',
    comments: [],
  },
  {
    url: 'photos/21.jpg',
    likes: 199,
    description: 'Тайский салат с курицей и лаймом',
    comments: [
      {
        text: 'Это ты сама приготовила? Дашь рецепт?',
        avatarUrl: 'img/avatar-3.svg',
      },
      {
        text: 'Выглядит аппетитно)',
        avatarUrl: 'img/avatar-1.svg',
      },
    ],
  },
  {
    url: 'photos/22.jpg',
    likes: 145,
    description: 'Очень красиво!',
    comments: [],
  },
  {
    url: 'photos/23.jpg',
    likes: 136,
    description: 'Какой милаха)',
    comments: [
      {
        text: 'Дааааа)',
        avatarUrl: 'img/avatar-1.svg',
      },
    ],
  },
  {
    url: 'photos/24.jpg',
    likes: 21,
    description: 'Мы наконец-то сходили на концерт Linkin Park',
    comments: [
      {
        text: '|_|',
        avatarUrl: 'img/avatar-5.svg',
      },
    ],
  },
  {
    url: 'photos/25.jpg',
    likes: 184,
    description: 'o_O',
    comments: [],
  },
];

module.exports = {
  pictures,
};
