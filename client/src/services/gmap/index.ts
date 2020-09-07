import { Loader, LoaderOptions } from 'google-maps';

const options: LoaderOptions = {
    libraries: [
        'places',
    ],
};

const loader = new Loader(process.env.VUE_APP_GOOGLE_API_KEY, options);

export class GmapService {
    public map!: google.maps.Map;
    public search!: google.maps.places.Autocomplete;

    constructor(
        public targetElement: Element,
        public center: google.maps.LatLngLiteral,
        public searchElement: HTMLInputElement
    ) {
        loader.load().then(() => {
            this.createMap(center);
            this.createAutocomplete(searchElement);
        });
    }

    public createMap(center: google.maps.LatLngLiteral) {
        this.map = new google.maps.Map(this.targetElement, {
            center,
            zoom: 8,
        });
    }

    public createAutocomplete(searchElement: HTMLInputElement) {
        this.search = new google.maps.places.Autocomplete(searchElement);
        this.search.bindTo('bounds', this.map);
        this.search.addListener('place_changed', () => {
            this.onPlaceSearch();
        });
        this.getCurrentLocation();
    }

    private onPlaceSearch() {
        const place = this.search.getPlace();

        if (!place.geometry) {
            window.alert(`Google Maps: '${place.name}' could not be located.`);
            return;
        }

        if (place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
        } else {
            this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);
        }
    }

    public getCurrentLocation() {
        if(!!navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => { 
                this.map.setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }
}
