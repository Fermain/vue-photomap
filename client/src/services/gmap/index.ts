import { Loader, LoaderOptions } from 'google-maps';

const options: LoaderOptions = {
    libraries: [
        'places',
    ],
};

const loader = new Loader(process.env.VUE_APP_GOOGLE_API_KEY, options);

export class GmapService {
    public map!: google.maps.Map;

    constructor(
        public targetElement: Element,
        public center: google.maps.LatLngLiteral,
    ) {
        loader.load().then(() => {
            this.createMap(center);
        });
    }

    public createMap(center: google.maps.LatLngLiteral) {
        this.map = new google.maps.Map(this.targetElement, {
            center,
            zoom: 8,
        });
    }
}
