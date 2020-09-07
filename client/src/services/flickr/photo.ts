export interface FlickrPhotoResults {
    photos: FlickrPhotos;
    stat: string;
}

export interface FlickrPhotos {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: FlickrPhoto[];
}

export class FlickrPhoto {
    public url: string;

    constructor(
        public id: string,
        public owner: string,
        public secret: string,
        public server: string,
        public farm: number,
        public title: string,
        public ispublic?: number,
        public isfriend?: number,
        public isfamily?: number,
    ) {
        this.url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    }
}
