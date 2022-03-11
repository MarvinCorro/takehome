class ApiService{

    get = async (url, callback) => {

        var request = await fetch(url);
        if(request.status === 200) {
            var payload = request.json()
            if(callback !== undefined)
                callback.apply(payload)
            this.cm.publish('ComManager/HandleDone', {'data': payload});

        } else if( request.status === 400 ) {
            throw new Error(request.error())
        }

        return payload
    }

    get_synchronous = async (url, callback) => {

        const request = new XMLHttpRequest();
        request.open("GET", url, false); // <-- completely sync and deprecated
        request.send()
        if(request.status === 200) {
            var payload = request.json()
            if(callback !== undefined)
                callback.apply(payload)
            this.cm.publish('ComManager/HandleDone', {'data': payload});

        } else if( request.status === 400 ) {
            throw new Error(request.error())
        }

        return payload
    }

    post = async (url, params) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(params.data) // body data type must match "Content-Type" header
        });

        if(!response.ok) {
            throw new Error(response.error())
        }


        if(params.callback !== undefined) {
            params.callback.apply(response.json());
        }


        this.cm.publish('ComManager/HandleDone', params)
        return response.json();
    }

}


const apiService = new ApiService();
window.apiService = apiService;