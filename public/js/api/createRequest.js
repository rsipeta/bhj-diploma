/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    // if(options.responseType){
    //     xhr.responseType = options.responseType;
    // } else{
    //     xhr.responseType = 'json';
    // }
   

    const formData = new FormData();
    let queryParams = '';
    if (options.data){      // !== undefined
        if (options.method === 'GET'){
            queryParams = '?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&');
            } else{
                Object.entries(options.data).forEach(v => formData.append(...v));
            }
        }
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE){
                let err = null;
                let resp = null;

                if (xhr.status === 200){
                    if (xhr.response?.success) {
                        resp = xhr.response;
                    } else {
                        err = xhr.response;
                    }
                } else {
                    err = new Error('Response status: ' + xhr.status);
                }

                if (options.callback){
                    options.callback(err, resp);
                }
                return xhr;
            }
        }


        try {
            xhr.open(options.method, options.url + queryParams);
            xhr.send(formData);
          }
          catch (e) {
            if (options.callback){
                options.callback(e);  // перехват сетевой ошибки
            }
          }

          return xhr;
};
