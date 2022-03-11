import React from "react"
import SmartDataTable from 'react-smart-data-table'


import 'react-smart-data-table/dist/react-smart-data-table.css'

export default class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.id = 'Table'
        this.path = this.props.path + '/' + this.id
        this.state = {
            isDirty: false,
            data: []
        }


        cm.subscribe(this.path + '/refresh', this.changeState.bind(this))
        cm.subMap[this.path + '/refresh'] = this.path + '/refresh'
        cm.componentMap[this.path] = this
    }

    changeState() {
        this.setState({'isDirty': !this.state['isDirty']} )
    }


    render() {

        var styles = {}
        var data = this.props.data
        var name = this.props.name || ""
        var className = this.props.className || ""

        return (
            <div>
                <SmartDataTable
                    data={data}
                    name={name}
                    className={className}
                    sortable/>
            </div>
        );
    }

}