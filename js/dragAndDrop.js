(function () {
    let mapPin = document.querySelector('.map__pin--main');
    let mapPins = document.querySelector('.map__pins');
    let mapFilters = document.querySelector('.map__filters-container');
    const PIN_SIZES = {
        width: 62,
        height: 62
    };
    const PIN_TRIANGLE_HEIGHT = 15;
    const DRAG_LIMIT = {
        x: {
            min: PIN_SIZES.width / 2,
            max: (mapPins.offsetWidth - PIN_SIZES.width / 2)
        },
        y: {
            min: 130,
            max: mapPins.clientHeight - mapFilters.offsetHeight
        }
    };

    function limitCoords(moveCoords) {

        if (moveCoords.left < DRAG_LIMIT.x.min) {
            moveCoords.left = DRAG_LIMIT.x.min;
        }

        if (moveCoords.left > DRAG_LIMIT.x.max) {
            moveCoords.left = DRAG_LIMIT.x.max;
        }

        if (moveCoords.top < DRAG_LIMIT.y.min) {
            moveCoords.top = DRAG_LIMIT.y.min;
        }

        if (moveCoords.top > DRAG_LIMIT.y.max) {
            moveCoords.top = DRAG_LIMIT.y.max;
        }
    }

    mapPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        let dragged = false;
        // let startCoords = {
        //     x: evt.clientX,
        //     y: evt.clientY
        // };

        let shift = {
            x: evt.clientX - mapPin.getBoundingClientRect().left,
            y: evt.clientY - mapPin.getBoundingClientRect().top
        };

        function onMouseMove(moveEvt) {

            let moveCoords = {
                top: moveEvt.clientY + mapPins.getBoundingClientRect().top + shift.y + PIN_SIZES.height / 2,
                left: moveEvt.clientX - mapPins.getBoundingClientRect().left + shift.x + PIN_SIZES.width / 2,
            };

            mapPin.style.top = moveCoords.top + 'px';
            mapPin.style.left = moveCoords.left + 'px';
            // dragged = true;
            //
            // let shift = {
            //     x: startCoords.x - moveEvt.clientX,
            //     y: startCoords.y - moveEvt.clientY
            // };
            //
            // startCoords = {
            //     x: moveEvt.clientX,
            //     y: moveEvt.clientY
            // };
            //
            // let moveCoords = {
            //     top: mapPin.offsetTop - shift.y,
            //     left: mapPin.offsetLeft - shift.x
            // };
            //
            // limitCoords(moveCoords);
            //
            // mapPin.style.top = moveCoords.top + 'px';
            // mapPin.style.left = moveCoords.left + 'px';
            //
            // let pointerCoords = {
            //     x: mapPin.offsetLeft,
            //     y: mapPin.offsetTop + PIN_TRIANGLE_HEIGHT + PIN_SIZES.height / 2
            // };
            //
            // window.map.setPointerCoords(pointerCoords);
        }

        function onMouseUp(upEvt) {

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();