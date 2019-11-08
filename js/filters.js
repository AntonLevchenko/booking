(function () {
    let filtersForm = document.querySelector('.map__filters');
    let filters = filtersForm.querySelectorAll('.map__filter');
    let filteredAds = [];
    const PricesRange = {
        MEDIUM_MIN: '10000',
        MEDIUM_MAX: '50000'
    };
    let filterNameToFilter = {
        'housing-type': filterByType,
        'housing-price': filterByPrice,
        'housing-rooms': filterByRooms,
        'housing-guests': filterByGuests,
    };

    function filterByType(ads, filter) {
        return ads.filter(ad => {
            return ad.offer.type === filter;
        })
    }

    function filterByPrice(ads, filter) {
        return ads.filter(ad => {
            switch (filter) {
                case 'low': {
                    return ad.offer.price < PricesRange.MEDIUM_MIN;
                    break;
                }
                case 'middle': {
                    return ad.offer.price >= PricesRange.MEDIUM_MIN && ad.offer.price <= PricesRange.MEDIUM_MAX;
                    break;
                }
                case 'high': {
                    return ad.offer.price > PricesRange.MEDIUM_MAX;
                    break;
                }
            }
        })
    }

    function filterByRooms(ads, filter) {
        return ads.filter(ad => {
            return ad.offer.rooms.toString() === filter;
        })
    }

    function filterByGuests(ads, filter) {
        return ads.filter(ad => {
            return ad.offer.guests.toString() === filter;
        })
    }

    function filterByFeature(ads, filter) {
        return ads.filter(ad => {
            return ad.offer.features.includes(filter);
        })
    }

    function resetFilters() {
        filtersForm.reset();
    }

    filtersForm.addEventListener('change', function (evt) {
        filteredAds = window.map.getAdvertisementsList().slice();

        let appliedFilters = Array.from(filters).filter(filter => {
            return filter.value !== 'any';
        });

        let checkedFeatures = Array.from(filtersForm.querySelectorAll('[name="features"]:checked'));

        appliedFilters.forEach(filter => {
            filteredAds = filterNameToFilter[filter.name](filteredAds, filter.value);
        });

        checkedFeatures.forEach(feature => {
            filteredAds = filterByFeature(filteredAds, feature.value);
        });

        window.map.rebuildMaps(filteredAds);
    });

    window.filter = {
        resetFilters
    }
})();
