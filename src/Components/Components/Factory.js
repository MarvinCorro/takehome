import React from "react"
import ComponentMapper from '../Common/ComponentMapper'
import ViewsBuilder from '../Views/ViewsBuilder'


export default class Factory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDirty: false,
            views: this.props.views,
            viewsPath: this.props.viewsPath,
            currentPage: this.props.currentPage,

        }
        this.id = 'Factory'
        this.path = this.props.path + '/' + this.id

        var t1 = cm.subscribe(this.id + '/refresh', this.refresh.bind(this))
        var t2 = cm.subscribe(this.id + '/updateState', this.updateState.bind(this))
        cm.subMap[this.id + '/refresh'] = t1
        cm.subMap[this.id + '/updateState'] = t2
        cm.componentMap[this.path] = this

        if(this.props.submap !== undefined) {
            var submap = this.props.submap
            for(let i = 0; i < submap.length; i++) {
                let t = cm.subscribe(submap['topic'], submap['callback'].bind(this))
                cm.subMap[this.id + '/' + submap['topic']] = t
            }
        }
    }

    refresh() {
        this.setState(Object.assign( {}, this.state, {'isDirty': !this.state['isDirty']} ) )
    }

    updateState(data, params) {
        var obj = {}

        if(params.viewsPath !== undefined) {
            obj['viewsPath'] = params.viewsPath
        }
        if(params.currentPage !== undefined) {
            obj['currentPage'] = params.currentPage
        }
        if(params.views.length !== 0) {
            obj['views'] = params.views
        } else {
            var path = (params.viewsPath ? params.viewsPath : this.state.viewsPath).split('/')
            debugger
            obj['views'] = ViewsBuilder[path[0]][params.currentPage]
        }


        this.setState( Object.assign( {}, this.state, obj ) )
    }

    render() {

        var views = this.state.views

        var renderedViews = views.map( (view, idx) => {
            return ComponentMapper[view['type']](view.props)
        })



        //
        debugger


        return (
            <div>
                {renderedViews}
            </div>
        );
    }

}