// const METHODS = {
//     GET: 'GET',
//     POST: 'POST',
//     PUT: 'PUT',
//     DELETE: 'DELETE'
// };

// interface Data {
//     data: any,
//     timeout?: number
// }

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete'
}

type Options = {
  method: Method;
  data?: any;
};

class HTTPRequestClass {
    // static API_URL = 'https://ya-praktikum.tech/api/v2';
    // protected endpoint: string;
    
    // constructor(endpoint: string) {
    //   this.endpoint = `${HTTPRequestClass.API_URL}${endpoint}`;
    // }

    // get = (url: string, options = {} as Data) => {
      
    //     const modifiedData = (newdata: any) => {
    //         return Object.keys(newdata)
    //         .map((key, index) => {
    //             return index === 0 ? `?${key}=${newdata[key]}` : `${key}=${newdata[key]}`;
    //         })
    //         .join('&'); 
    //     }
    //     let asd
    //     if (options.data) {
    //       asd = modifiedData(options.data)
    //     } else {
    //       asd = ''
    //     }

    //     return this.request(`${url}${asd}`, { ...options, method: METHODS.GET }, options.timeout);
    // };
    // post = (url: string, options = {} as Data) => {
    //     if (options && typeof options.data !== 'string') {
    //             options.data = JSON.stringify(options.data);
    //     }
    //     return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    // }
    // put = (url: string, options = {} as Data) => {
    //     if (options && typeof options.data !== 'string') {
    //             options.data = JSON.stringify(options.data);
    //     }
    //     return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    // }
    // delete = (url: string, options = {} as Data) => {
    //     return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    // }


    // request = (url: string, options: { method: any; data: any; timeout?: number | undefined; headers?: any; }, timeout = 5000) => {
    //     let { method, data, headers } = options;
    //     return new Promise((resolve, reject) => {
    //       const xhr = new XMLHttpRequest();

    //       xhr.timeout = timeout;
          
    //       xhr.responseType = 'json';
    //       console.log(url)
    //       xhr.open(method, url);
          
    //       xhr.onload = () => {
    //         resolve(xhr);
    //       };

    //       xhr.onabort = reject;
    //       xhr.onerror = reject;
    //       xhr.ontimeout = reject;

    //       if (method === 'GET' || !data) {
    //         xhr.send();
    //       } else {
    //         headers && xhr.setRequestHeader(
    //           Object.keys(headers)[0],
    //           Object.values(headers)[0]
    //         );
    //         xhr.send(data);
    //       }
    //     });	
    // };

    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = `${HTTPRequestClass.API_URL}${endpoint}`;
    }
  
    public get<Response>(path = '/'): Promise<Response> {
      return this.request<Response>(this.endpoint + path);
    }
  
    public post<Response = void>(path: string, data?: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Post,
        data,
      });
    }
  
    public put<Response = void>(path: string, data: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Put,
        data,
      });
    }
  
    public patch<Response = void>(path: string, data: unknown): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Patch,
        data,
      });
    }
  
    public delete<Response>(path: string): Promise<Response> {
      return this.request<Response>(this.endpoint + path, {
        method: Method.Delete,
      });
    }
  
    private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
      const {method, data} = options;
  
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
  
        xhr.onreadystatechange = (e) => {
  
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status < 400) {
              resolve(xhr.response);
            } else {
              reject(xhr.response);
            }
          }
        };
  
        xhr.onabort = () => reject({reason: 'abort'});
        xhr.onerror = () => reject({reason: 'network error'});
        xhr.ontimeout = () => reject({reason: 'timeout'});
  
        xhr.setRequestHeader('Content-Type', 'application/json');
  
        xhr.withCredentials = true;
        xhr.responseType = 'json';
  
        if (method === Method.Get || !data) {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(data));
        }
      });
    }
}
export default HTTPRequestClass