(function () {

    let map = document.querySelector('.map');
    let mainPin = map.querySelector('.map__pin--main');
    let noticeForm = document.querySelector('.notice__form');
    let formReset = noticeForm.querySelector('.form__reset');
    let enabledForm = false;

    function enableForm() {
        window.form.enabledForm = true;

        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');

        renderMapPins();
    }

    function disableForm() {
        window.form.enabledForm = false;

        map.classList.add('map--faded');
        noticeForm.classList.add('notice__form--disabled');

        window.dragAndDrop.resetPinCoords();
        removeMapPins();
    }

    mainPin.addEventListener('mouseup', function (e) {
        enableForm();
    });

    noticeForm.addEventListener('reset', function (evt) {
       evt.preventDefault();

       noticeForm.reset();
       disableForm()
    });

    window.form = {
        enabledForm
    }
})();
