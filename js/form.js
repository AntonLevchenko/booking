(function () {
    let map = document.querySelector('.map');
    let mainPin = map.querySelector('.map__pin--main');
    let noticeForm = document.querySelector('.notice__form');
    let enabledForm = false;

    function enableForm() {
        window.form.enabledForm = true;

        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        window.backend.load(window.map.onload);
    }

    function disableForm() {
        window.form.enabledForm = false;

        map.classList.add('map--faded');
        noticeForm.classList.add('notice__form--disabled');

        window.dragAndDrop.resetPinCoords();
        window.map.removeMapPins();
        window.map.removeMapCard();
        window.filter.resetFilters();
    }

    function onFormSubmited() {
        noticeForm.reset();
    }

    function onError(errorMessage) {
        let notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = errorMessage;
        document.body.append(notification);

        setTimeout(function () {
            notification.remove();
        }, 5000);
    }

    mainPin.addEventListener('mouseup', function (evt) {
        if (window.dragAndDrop.dragged) {
            return
        }

        enableForm();
    });

    noticeForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        window.backend.save(new FormData(noticeForm), onFormSubmited, onError);
    });

    noticeForm.addEventListener('reset', function (evt) {
        disableForm();
    });

    window.form = {
        enabledForm
    }
})();
