const MIN_PRICES = {
    'flat': 0,
    'bungalo': 1000,
    'house': 5000,
    'palace': 10000
};
let noticeForm = document.querySelector('.notice__form');
let noticeType = noticeForm.elements['type'];
let noticePrice = noticeForm.elements['price'];
let noticeTimeIn = noticeForm.elements['timein'];
let noticeTimeOut = noticeForm.elements['timeout'];
let noticeRoomNumber = noticeForm.elements['rooms'];
let noticeCapacity = noticeForm.elements['capacity'];

function onTypeChange(evt) {
    let type = evt.target.value;
    let minPrice = MIN_PRICES[type];

    noticePrice.value = '';
    noticePrice.min = minPrice;
    noticePrice.placeholder = minPrice;
}

function onTimeChange(evt) {
    let target = evt.target;
    let select = null;

    switch (target.name) {
        case 'timein':
            select = noticeTimeOut;
            break;
        case 'timeout':
            select = noticeTimeIn;
            break;
        default: return;
    }

    let value = target.value;

    for (let option of select.options) {
        if (option.value !== value) continue;

        return option.selected = true;
    }
}

function disableCapacity(value) {
    for (let option of noticeCapacity.options) {
        if (option.value === '0' && value == 0) {
            option.disabled = false;
            option.selected = true;
        } else if (option.value > value || option.value === '0' && value !== '0') {
            option.disabled = true;
        } else {
            option.disabled = false;
            option.selected = true;
        }
    }
}

function onRoomNumberChange(evt) {
    let maxCapacity = (+evt.target.value >= 100) ? 0 : +evt.target.value;

    disableCapacity(maxCapacity);
}

noticeType.addEventListener('change', onTypeChange);
noticeTimeIn.addEventListener('change', onTimeChange);
noticeTimeOut.addEventListener('change', onTimeChange);
noticeRoomNumber.addEventListener('change', onRoomNumberChange);