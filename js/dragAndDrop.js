(function () {
    let mapPin = document.querySelector('.map__pin--main');
    let mapPins = document.querySelector('.map__pins');

    function limitCoords(moveCoords) {

        if (moveCoords.left < mapPin.offsetWidth / 2) {
            moveCoords.left = mapPin.offsetWidth / 2;
        }

        if (moveCoords.left > (mapPins.offsetWidth - mapPin.offsetWidth / 2)) {
            moveCoords.left = mapPins.offsetWidth - mapPin.offsetWidth / 2;
        }

        if (moveCoords.top < mapPin.offsetHeight / 2) {
            moveCoords.top = mapPin.offsetHeight / 2;
        }

        if (moveCoords.top > mapPins.clientHeight) {
            moveCoords.top = mapPins.clientHeight;
        }
    }

    mapPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        let dragged = false;
        let startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        function onMouseMove(moveEvt) {
            dragged = true;

            let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            let moveCoords = {
                top: mapPin.offsetTop - shift.y,
                left: mapPin.offsetLeft - shift.x
            };

            limitCoords(moveCoords);

            mapPin.style.top = moveCoords.top + 'px';
            mapPin.style.left = moveCoords.left + 'px';
        }

        function onMouseUp(upEvt) {

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();