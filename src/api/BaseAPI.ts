import HTTPRequestClass from '../utils/GetHTTPRequest'

export default abstract class BaseAPI {
    protected http: HTTPRequestClass;

    protected constructor(endpoint: string) {
        this.http = new HTTPRequestClass(endpoint);
    }

    create() { throw new Error('Not implemented'); }
    request() { throw new Error('Not implemented'); }
    update() { throw new Error('Not implemented'); }
    delete() { throw new Error('Not implemented'); }
}