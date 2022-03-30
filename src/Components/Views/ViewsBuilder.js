var viewsBuilder = {
    'folders': {
        'inbox': [
            {
                'type': 'Table', 'props': {
                    'dataKeyPath': 'folders/inbox'
                    , 'path': 'Table'
                    , 'dataKey': 'folders'
                    , 'key': 'table'
                    , onClick: (state, rowInfo, column, instance) => {

                        return {
                            onClick: e => {
                                cm.publish("Factory/updateState", {
                                    'views': [],
                                    'viewsPath': 'folders/inbox',
                                    'currentPage': 'messages'
                                })

                            }
                        }
                    }
                }
            }
        ],
        'messages': [
            {
                'type': 'Button', 'props': {
                    'type': 'button', 'path': 'Button', 'text': 'Delete', 'key': 'delete',
                    'onClick': (e) => {
                        // cm.publish(this.id)
                    }
                }
            },
            {'type': 'Button', 'props': {'type': 'button', 'path': 'Button', 'text': 'Move', 'key': 'move'}},
            
        ]
    }
}

export default viewsBuilder