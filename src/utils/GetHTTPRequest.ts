const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

interface Data {
    data: any,
    timeout?: number
}

class HTTPRequestClass {
    get = (url: string, options = {} as Data) => {
      
        const modifiedData = (newdata: any) => {
            return Object.keys(newdata)
            .map((key, index) => {
                return index === 0 ? `?${key}=${newdata[key]}` : `${key}=${newdata[key]}`;
            })
            .join('&'); 
        }
        let asd
        if (options.data) {
          asd = modifiedData(options.data)
        } else {
          asd = ''
        }

        return this.request(`${url}${asd}`, { ...options, method: METHODS.GET }, options.timeout);
    };
    post = (url: string, options = {} as Data) => {
        if (options && typeof options.data !== 'string') {
                options.data = JSON.stringify(options.data);
        }
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    }
    put = (url: string, options = {} as Data) => {
        if (options && typeof options.data !== 'string') {
                options.data = JSON.stringify(options.data);
        }
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    }
    delete = (url: string, options = {} as Data) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    }


    request = (url: string, options: { method: any; data: any; timeout?: number | undefined; headers?: any; }, timeout = 5000) => {
        let { method, data, headers } = options;
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.timeout = timeout;
          
          xhr.responseType = 'json';
          console.log(url)
          xhr.open(method, url);
          
          xhr.onload = () => {
            resolve(xhr);
          };

          xhr.onabort = reject;
          xhr.onerror = reject;
          xhr.ontimeout = reject;

          if (method === 'GET' || !data) {
            xhr.send();
          } else {
            headers && xhr.setRequestHeader(
              Object.keys(headers)[0],
              Object.values(headers)[0]
            );
            xhr.send(data);
          }
        });	
    };
}
