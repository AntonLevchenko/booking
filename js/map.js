let advertisementsTitle = [
    'Бо льшая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дв орец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый него степриимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по коле но в воде'
];
let advertisementsTimes = ['12:00', '13:00', '14:00'];
let advertisementsFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let advertisementsPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let advertisementsTypes = ['palace', 'flat', 'ho use', 'bungalo'];
let mapFiltersContainer = document.querySelector('.map__filters-container');
let mapCard = document.querySelector('#map__card')
            .content
            .querySelector('.map__card');
let advertisementsList = createAdvertisements();
let pictureList = mapCard.querySelector('.popup__pictures');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function createAdvertisements() {
    let advertisements = [];

    for (let i = 0; i < 8; i++) {
        let advertisement = {
            'author': {
                'avatar': `img/avatars/user${i < 10 ? '0' + (i + 1) : i + 1}.png`
            },
            'offer': {
                'title': advertisementsTitle[i],
                'address': `${location.x}, ${location.y}`,
                'price': randomInteger(1000, 1000000),
                'type': advertisementsTypes[randomInteger(0, advertisementsTypes.length - 1)],
                'rooms':  randomInteger(1, 5),
                'guests':  randomInteger(1, 20),
                'checkin': advertisementsTimes[randomInteger(0, advertisementsTimes.length - 1)],
                'checkout': advertisementsTimes[randomInteger(0, advertisementsTimes.length - 1)],
                'features': advertisementsFeatures.slice(randomInteger(0, advertisementsFeatures.length - 1), randomInteger(0, advertisementsFeatures.length - 1)),
                'description': 'Description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur doloribus explicabo modi molestias nam, numquam perferendis placeat rerum temporibus.',
                'photos': advertisementsPhotos[randomInteger(0, advertisementsPhotos.length - 1)],
            },
            'location': {
                'x': randomInteger(0, 200),
                'y': randomInteger(130, 630),
            }
        };

        advertisements.push(advertisement);
    }

    return advertisements;
}

//
document.querySelector('.map').classList.remove('map--faded');
//

function renderCardFeatures(card) {
    let holder = document.createDocumentFragment();

    for (let feature of card.offer.features) {
        let li = document.createElement('li');
        li.className = `feature feature--${feature}`;

        holder.append(li);
    }

    return holder;
}

function renderMapCard(card) {
    let cardElement = mapCard.cloneNode(true);
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardElement.querySelector('.popup__text-time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
    cardElement.querySelector('.popup__features').append( renderCardFeatures(card) );
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__pictures img').src = card.offer.photos;

    return cardElement;
}

function renderMapCards() {
    for (let i = 0; i < 8; i++) {
        mapFiltersContainer.before( renderMapCard(advertisementsList[i]) );
    }
}

renderMapCards();