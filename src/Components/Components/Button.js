import React from "react"

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'isDirty': false,
        }
        this.id = 'button'
        this.path = this.props.path + this.id

        cm.subscribe(this.path + '/refresh', this.changeState.bind(this))
        cm.subMap[this.path + '/refresh'] = this.path + '/refresh'
        cm.componentMap[this.path] = this
    }

    changeState() {
        this.setState({'isDirty': !this.state['isDirty']} )
    }
    render() {

        return (
            <button type={this.props.type||'button'} onClick={this.props.onClick.bind(this)} >{this.props.text}</button>
        );
    }
}