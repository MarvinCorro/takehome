class ApiService{

    get = async (url, params, callback) => {

        var request = await fetch(url, {
            method: 'GET',
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

    get_synchronous = (url, params, callback) => {

        const request = new XMLHttpRequest();

        request.open("GET", url, false);

        //lol headers
        request.setRequestHeader('Access-Control-Allow-Origin', "*")
        request.setRequestHeader('Referrer-Policy', "no-referrer")
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        request.setRequestHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
        request.setRequestHeader('Access-Control-Allow-Credentials', 'true')
        request.send()

        if(request.status === 200) {
            var payload = JSON.parse(request.responseText)
            if(callback !== undefined)
                callback.apply(payload)
            params['data'] =  payload
            cm.publish('ComManager/HandleDone', params);

        } else if( request.status === 400 ) {
            throw new Error(request.error())
        }
        return payload
    }

    post = async (url, params, callback) => {
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

    delete = async (url, params, callback) => {
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
export default apiService;
window.apiService = apiService;