(function () {
    const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
    let avatarPreview = document.querySelector('.notice__preview img');
    let avatarInput = document.querySelector('#avatar');
    let previewPhotoContainer = document.querySelector('.form__photo-container');
    let previewPhotoInput = previewPhotoContainer.querySelector('#images');
    let previewPhotoList = previewPhotoContainer.querySelector('.preview-list');

    function filtrationByCorrectType(file) {
        return FILE_TYPES.some(type => {
            return file.name.toLowerCase().endsWith(type);
        })
    }

    function uploadFile(chooser, func) {
        let files = Array.from(chooser.files).filter(filtrationByCorrectType);

        if (!files) return;

        files.forEach(file => {
            let reader = new FileReader();

            reader.addEventListener('load', function (evt) {
                func(evt.target.result);
            });

            reader.readAsDataURL(file);
        })
    }

    function uploadAvatar(src) {
        avatarPreview.src = src;
    }

    function uploadImagePreview(src) {
        let preview = `
            <li>
                <img src="${src}" alt="">
            </li>
        `;

        previewPhotoList.insertAdjacentHTML('afterbegin', preview);
    }

    avatarInput.addEventListener('change', function (evt) {
        uploadFile(avatarInput, uploadAvatar);
    });

    previewPhotoInput.addEventListener('change', function (evt) {
       uploadFile(previewPhotoInput, uploadImagePreview);
    });
})();
