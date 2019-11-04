(function () {
    const URL = 'https://js.dump.academy/keksobooking';

    function createXHR(method, onLoad, onError, URL) {
        let xhr = new XMLHttpRequest();
        xhr.responseType =  'json';
        xhr.timeout = 10000;

        xhr.addEventListener('load', function (evt) {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                let errorMessage = xhr.response.map(error => error.fieldName + error.errorMessage).join(', ');
                onError('Errors: ' + errorMessage);
            }
        });

        xhr.addEventListener('error', function (evt) {
            onError(xhr.status + xhr.statusText);
        });

        xhr.addEventListener('timeout', function (evt) {
            onError('Time left');
        });

        xhr.open(method, URL);

        return xhr;
    }

    function load(onLoad, onError) {
        createXHR('GET', onLoad, onError, `${URL}/data`).send();
    }

    function save(data, onLoad, onError) {
        createXHR('POST', onLoad, onError, URL).send(data);
    }

    window.backend = {
        load,
        save
    }
})();
