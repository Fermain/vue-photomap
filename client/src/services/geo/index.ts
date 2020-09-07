export class GeoService {
    public enabled = false;
    private supported = !!navigator.geolocation;
    private permissions = !!navigator.permissions;
    private denied = false;

    constructor() {
        navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus: PermissionStatus) => {
            this.check(permissionStatus);
            this.listen(permissionStatus);
        });
    }

    public check(permissionStatus: PermissionStatus) {
        if (!this.supported || !this.permissions) {
            this.denied = false;
            this.enabled = false;
            return;
        }

        switch (permissionStatus.state.toString()) {
            case 'granted':
                this.enabled = true;
                this.denied = false;
                break;

            case 'prompt':
                this.enabled = false;
                this.denied = false;
                break;

            case 'denied':
                this.enabled = false;
                this.denied = true;
                break;

            default:
                this.enabled = false;
                this.denied = true;
                break;
        }
    }

    public listen(permissionStatus: PermissionStatus) {
        permissionStatus.addEventListener('change', (event: Event) => {
            this.check(permissionStatus);
        });
    }

    public request(callback: (position: Position) => void) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
            callback(position);
        });
    }
}
