let advertisementsTitle = [
    'Бо льшая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дв орец',
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый него степриимный домик',
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по коле но в воде'
];
let advertisementsTimes = ['12:00', '13:00', '14:00'];
let advertisementsFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let advertisementsPhotos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
let advertisementsTypes = ['palace', 'flat', 'ho use', 'bungalo'];
let map = document.querySelector('.map');
let mapFiltersContainer = map.querySelector('.map__filters-container');
let mapCardContainer = map.querySelector('.map__cards-container');
let mapCard = document.querySelector('#map__card')
            .content
            .querySelector('.map__card');
let mapPin = document.querySelector('#map__card')
            .content
            .querySelector('.map__pin');
let mapPins = map.querySelector('.map__pins');
let advertisementsList = createAdvertisements();
let mainPin = map.querySelector('.map__pin--main');
let addressInput = noticeForm.elements['address'];
const PIN_SIZES = {
    width: 46,
    height: 46
};
const PIN_TRIANGLE_HEIGHT = 10;

function generateId() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
}

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
            'location': {
                'x': randomInteger(200, map.offsetWidth),
                'y': randomInteger(130, 630),
            },
            'offer': {
                'title': advertisementsTitle[i],
                'price': randomInteger(1000, 1000000),
                'type': advertisementsTypes[randomInteger(0, advertisementsTypes.length - 1)],
                'rooms':  randomInteger(1, 5),
                'guests':  randomInteger(1, 20),
                'checkin': advertisementsTimes[randomInteger(0, advertisementsTimes.length - 1)],
                'checkout': advertisementsTimes[randomInteger(0, advertisementsTimes.length - 1)],
                'features': advertisementsFeatures.slice(
                    randomInteger(0, advertisementsFeatures.length - 1),
                    randomInteger(0, advertisementsFeatures.length - 1)
                ),
                'description': 'Description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda' +
                    'consequuntur doloribus explicabo modi molestias nam, numquam perferendis placeat rerum temporibus.',
                'photos': advertisementsPhotos[randomInteger(0, advertisementsPhotos.length - 1)]
            },
            get address() {
                return `${this.location.x}, ${this.location.y}`
            },
            'id': generateId()
        };

        advertisements.push(advertisement);
    }

    return advertisements;
}

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
    cardElement.querySelector('.popup__text--address').textContent = card.address;
    cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardElement.querySelector('.popup__text-time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
    cardElement.querySelector('.popup__features').append( renderCardFeatures(card) );
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__pictures img').src = card.offer.photos;

    return cardElement;
}

function renderMapPin(card) {
    let pinElement = mapPin.cloneNode(true);
    let pinImg = pinElement.querySelector('img');

    pinElement.style.left = card.location.x - PIN_SIZES.width + 'px';
    pinElement.style.top = card.location.y + PIN_SIZES.height + PIN_TRIANGLE_HEIGHT + 'px';
    pinElement.setAttribute('data-id', card.id);

    pinImg.src = card.author.avatar;
    pinImg.alt = card.offer.title;

    return pinElement;
}

function renderMapPins() {
    for (let i = 0; i < 8; i++) {
        let pin = renderMapPin( advertisementsList[i] );
        mapPins.append( pin );
        pin.addEventListener('click', pinClickHandler);
    }
}

function pinClickHandler(evt) {
    let target = evt.target.closest('.map__pin');
    let id = target.dataset.id;
    let card = advertisementsList.find(card => card.id === id);

    target.classList.add('active');
    showMapCard(card);
}

function showMapCard(card) {
    removeMapCard();

    let mapCard = renderMapCard(card);
    mapCardContainer.append( mapCard );

    addCloseListener(mapCard);
}

function addCloseListener(card) {
    let closeBtn = card.querySelector('.popup__close');

    if (!closeBtn) return;

    closeBtn.addEventListener('click', function (e) {
        removeMapCard();
    });
}

function removeMapCard() {
    mapCardContainer.innerHTML = '';
}

function enabledForm() {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');

    renderMapPins();
}

function setPointerCoords(coords) {
    addressInput.value = `x: ${coords.x}, y: ${coords.y}`;
}

mainPin.addEventListener('mouseup', function (e) {
    enabledForm();
});

window.map = {
    setPointerCoords
};