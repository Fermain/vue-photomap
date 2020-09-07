import { http } from './http';
import { FlickrPhotoResults, FlickrPhoto } from './photo';

export class FlickrService {
    public baseUrl = 'https://www.flickr.com/services/rest/';

    private globalConfig = {
        api_key: process.env.VUE_APP_FLICKR_API_KEY,
        format: 'json',
        nojsoncallback: '1',
        per_page: '32',
    };

    public async search(params: object) {
        const url = new URL(this.baseUrl);
        const method = 'flickr.photos.search';

        url.search = new URLSearchParams({
            ...params,
            method,
            ...this.globalConfig,
        }).toString();

        const results = await http<FlickrPhotoResults>(url.toString());

        const photos = results.jsonBody?.photos?.photo.map((photo: any) => new FlickrPhoto(
            photo.id,
            photo.owner,
            photo.secret,
            photo.server,
            photo.farm,
            photo.title,
            photo.ispublic,
            photo.isfriend,
            photo.isfamily,
        ));

        return photos as FlickrPhoto[];
    }
}
