import PubSub from 'pubsub-js'

class ComManager{

    constructor() {
        this.id = 'ComManager'
        this.subMap = {}
        this.componentMap = {}
    }

    init(store) {
        window.cache = this.cache = store

        var post = this.id + '/Post'
        var get = this.id + '/Get'
        var put = this.id + '/Put'
        var remove = this.id + '/Delete'
        var select = this.id + '/SelectID'


        var t1 = PubSub.subscribe(this.id + '/HandleDone', (sender, data) => {
            this.handleDone(data)
        })

        var t2 = PubSub.subscribe(this.id + '/UpdateStore', (sender, data) => {
            this.UpdateStore(data)
        })

        var t3 = PubSub.subscribe(this.id + '/apiService/GET', (sender, data) => {
            this.apiGet(data.url, data)
        })

        var t4 = PubSub.subscribe(this.id + '/apiService/GETSYNC', (sender, data) => {
            this.apiGetSynchronous(data.url, data)
        })

        var t5 = PubSub.subscribe(this.id + '/apiService/POST', (sender, data) => {
            this.apiPost(data.url, data)
        })

        var t6 = PubSub.subscribe(this.id + '/apiService/DELETE', (sender, data) => {
            this.apiDelete(data.url, data)
        })

        this.subMap[this.id + '/HandleDone'] = t1
        this.subMap[this.id + '/UpdateStore'] = t2
        this.subMap[this.id + '/apiService/GET'] =t3
        this.subMap[this.id + '/apiService/GETSYNC'] = t4
        this.subMap[this.id + '/apiService/POST'] = t5
        this.subMap[this.id + '/apiService/DELETE'] = t6

        // get the stuff we initally need
        apiService.get_synchronous('http://localhost:3000/folders', {
            'sender': this.id, 'notifyList': ['ComManager/UpdateStore'], 'route': 'folders', 'type': 'GET',
        })

        apiService.get_synchronous('http://localhost:3000/folders/inbox', {
            'sender': this.id, 'notifyList': ['ComManager/UpdateStore', 'Table/updateState','Table/Refresh'], 'route': 'folders/inbox', 'type': 'GET'
                , 'dataKey': 'folders'
        })

        apiService.get_synchronous('http://localhost:3000/filters', {
            'sender': this.id, 'notifyList': ['ComManager/UpdateStore'], 'route': 'filters', 'type': 'GET'
        })

        apiService.get_synchronous('http://localhost:3000/settings', {
            'sender': this.id, 'notifyList': ['ComManager/UpdateStore'], 'route': 'settings', 'type': 'GET'
        })
    }

    apiGet = (url, params) => {
        apiService.get(url, params, params.callback)
    }

    apiGetSynchronous = (url, params) => {
        apiService.get_synchronous(url, params, params.callback)
    }

    apiPost = (url, params) => {
        apiService.post(url, params, params.callback)
    }

    apiDelete = (url, params) => {
        apiService.post(url, params, params.callback)
    }

    subscribe = (topic, callback) => {
        return PubSub.subscribe(topic, callback)
    }

    publish = (topic, params) => {
        PubSub.publish(topic, params)
    }

    UpdateStore = (params) => {
        this.cache[params.route] = params.data
    }

    handleDone = (params) => {
        var notifyList = params.notifyList || []
        for(let counter = 0; counter < notifyList.length; counter++) {
            let notify = notifyList[counter]
            PubSub.publish(notify, params)
        }
    }


}

const cm = new ComManager();
export default cm;
window.cm = cm;