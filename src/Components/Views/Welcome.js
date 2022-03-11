import React from "react"
import SmartDataTable from 'react-smart-data-table'


import 'react-smart-data-table/dist/react-smart-data-table.css'

export default class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.id = 'Welcome'

        this.state = {
            isDirty: 0
        }
    }

    render() {

        var styles = {};
        var rowData = []


        return (
            <div>
                <table
                    data={testData}
                    name="test-table"
                    className="ui compact selectable table"
                    sortable/>
            </div>
        );
    }

}