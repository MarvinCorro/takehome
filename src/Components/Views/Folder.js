import React from "react"
import Factory from "../Components/Factory"
import Table from '../Components/Table'
import Button from '../Components/Button'



export default class Folder extends React.Component {
    constructor(props) {
        super(props)
        this.id = 'Folder'

        this.state = {
            isDirty: false,
            current: this.props.current
        }

        this.id = 'Folder'
        this.path = this.props.path + '/' + this.id

        cm.subscribe(this.path + '/refresh', this.refresh.bind(this))
        cm.subscribe(this.path + '/changeCurrent', this.changeCurrent.bind(this))
        cm.subMap[this.path + '/refresh'] = this.path + '/refresh'
        cm.subMap[this.path + '/changeCurrent'] = this.path + '/refresh'
        cm.componentMap[this.path] = this
    }

    refresh() {
        this.setState(Object.assign( {}, this.state, {'isDirty': !this.state['isDirty']} ) )
    }

    changeCurrent(params) {
        this.setState(Object.assign( {}, this.state, {'current': params.data} ) )
    }

    render() {
        var views = this.props.views
        var current = this.state.current;
        debugger
        return React.createElement(view['type'], view.props);

    }

}