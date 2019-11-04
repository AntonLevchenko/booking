(function () {
    let map = document.querySelector('.map');
    let mapCardContainer = map.querySelector('.map__cards-container');
    let mapCard = document.querySelector('#map__card')
        .content
        .querySelector('.map__card');
    let mapPin = document.querySelector('#map__card')
        .content
        .querySelector('.map__pin');
    let mapPins = map.querySelector('.map__pins');
    let addressInput = noticeForm.elements['address'];
    const PIN_SIZES_SMALL = {
        width: 46,
        height: 46
    };
    const PIN_TRIANGLE_HEIGHT = 5;
    let advertisementsList = null;

    function renderCardFeatures(card) {
        let holder = document.createDocumentFragment();

        for (let feature of card.offer.features) {
            let li = document.createElement('li');
            li.className = `feature feature--${feature}`;

            holder.append(li);
        }

        return holder;
    }

    function renderCardPhotos(holder, photos) {
        let li = holder.querySelector('li');
        for (let i = 0; i < photos.length; i++) {
            let photoHolder = li.cloneNode(true);
            photoHolder.querySelector('img').src = photos[i];
            holder.append(photoHolder);
        }
        li.remove();
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
        renderCardPhotos(cardElement.querySelector('.popup__pictures'), card.offer.photos);

        return cardElement;
    }

    function renderMapPin(card) {
        let pinElement = mapPin.cloneNode(true);
        let pinImg = pinElement.querySelector('img');

        pinElement.style.left = card.location.x  + 'px';
        pinElement.style.top = card.location.y - PIN_SIZES_SMALL.height + PIN_TRIANGLE_HEIGHT + 'px';
        pinElement.setAttribute('data-id', card.id);

        pinImg.src = card.author.avatar;
        pinImg.alt = card.offer.title;

        return pinElement;
    }

    function renderMapPins(pins) {
        advertisementsList = window.utils.addIDToElems(pins);

        for (let i = 0; i < advertisementsList.length; i++) {
            let pin = renderMapPin( advertisementsList[i] );
            mapPins.append( pin );
            pin.addEventListener('click', pinClickHandler);
        }
    }

    function removeMapPins() {
        let mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        mapPins.forEach(pin => {
            pin.remove();
        });
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

    function setPointerCoords(coords) {
        addressInput.value = `x: ${coords.x}, y: ${coords.y}`;
    }

    window.map = {
        renderMapPins,
        removeMapPins,
        removeMapCard,
        setPointerCoords
    }
})();
