import React from "react"


export default class Messaage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDirty: false,
            page: this.props.current,

        }
        this.id = 'Factory'
        this.path = this.props.path + '/' + this.id

        cm.subscribe(this.id + '/refresh', this.refresh.bind(this))
        cm.subMap[this.id + '/refresh'] = this.path + '/refresh'
        cm.componentMap[this.path] = this
    }

    refresh() {
        this.setState(Object.assign( {}, this.state, {'isDirty': !this.state['isDirty']} ) )
    }

    updateState(data, params) {
        this.setState( Object.assign( {}, this.state, {data: params.data['folder']} ) )
    }

    render() {

        var views = this.props.views

        views = views.map( (view, idx) => {
            return React.createElement(view['type'], view.props);

        })
        //load folders

        debugger
        return (
            <div>
                {views}
            </div>
        );
    }

}