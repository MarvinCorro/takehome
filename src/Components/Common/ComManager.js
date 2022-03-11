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


        PubSub.subscribe(this.id + '/HandleDone', (sender, data) => {
            this.handleDone(data)
        })

        PubSub.subscribe(this.id + '/UpdateStore', (sender, data) => {
            this.UpdateStore(data)
        })

        this.subMap[this.id + '/HandleDone'] = this.id + '/HandleDone'
        this.subMap[this.id + '/UpdateStore'] = this.id + '/UpdateStore'
        // get the stuff we initally need
        window.apiService.get_synchronous('/folders')

        window.apiService.get_synchronous('/folders/inbox')

        window.apiService.get_synchronous('/filters')

        window.apiService.get_synchronous('/settings')


    }

    subscribe = (topic, callback) => {
        PubSub.subscribe(topic, callback)
    }

    publish = (topic, params) => {
        PubSub.publish(topic, params)
    }

    UpdateStore = (params) => {
        this.cache[params.sender] = params.data
    }

    handleDone = (params) => {
        var notifyList = params.notifyList
        notifyList.push(this.id + '/UpdateStore')
        for(let counter = 0; counter < notifyList.length; counter++) {
            let notify = notifyList[counter]
            PubSub.publish(notify, {'sender': params.sender, 'data': params.data})
        }
    }


}

const cm = new ComManager();
window.cm = cm;