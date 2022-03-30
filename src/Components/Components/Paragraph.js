import React from "react"

export default class Button extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'isDirty': false,
        }
        this.id = 'Button'
        this.path = this.props.path + '/' + this.id

        cm.subscribe(this.path + '/refresh', this.refresh.bind(this))
        cm.subMap[this.path + '/refresh'] = this.path + '/refresh'
        cm.componentMap[this.path] = this

        if(this.props.submap !== undefined) {
            var submap = this.props.submap
            for(let i = 0; i < submap.length; i++) {
                cm.subscribe(submap['topic'], submap['callback'].bind(this))
            }
        }
    }

    refresh() {
        this.setState(Object.assign( {}, this.state, {'isDirty': !this.state['isDirty']} ) )
    }

    onClick(e) {
        //do nothing for now
    }

    render() {

        return (
            <p>
                {this.props.text}
            </p>
        );
    }
}