import React from "react"
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'


export default class Table extends React.Component {
    constructor(props) {
        super(props)
        this.id = 'Table'
        this.path = this.props.path + '/' + this.id
        this.dataKey = this.props.dataKey
        this.state = {
            isDirty: false,
            hasRefreshed: false,
            data: [],
            selected: [],
            dataKey: this.props.dataKey,
            dataKeyPath: this.props.dataKeyPath,
        }

        //one time generic for init()
        var t1 = cm.subscribe(this.id + '/refresh', this.refresh.bind(this))
        var t2 = cm.subscribe(this.id + '/updateState', this.updateState.bind(this))
        cm.subMap[this.id + '/refresh'] = t1
        cm.subMap[this.id + '/updateState'] = t2


        var t3 = cm.subscribe(this.path + '/refresh', this.refresh.bind(this))
        var t4 = cm.subscribe(this.path + '/updateState', this.updateState.bind(this))
        cm.subMap[this.path + '/refresh'] = t3
        cm.subMap[this.path + '/updateState'] = t4
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
        if(params.data !== undefined) {
            obj['data'] = params.data[params.dataKey]
        }
        if(params.dataKey !== undefined) {
            obj['dataKey'] = params.dataKey
        }
        if(params.dataKey !== undefined) {
            obj['dataKeyPath'] = params.dataKeyPath
        }
        if(params.selected !== undefined) {
            obj['selected'] = params.selected
        }

        this.setState( Object.assign( {}, this.state, obj ) )
    }

    getHeaders(data) {
        var sampleData = data[0]

        var keys = Object.keys(sampleData)
        var headers = keys.map( (key, id) => {
            return {
                Header: key,
                accessor: key,
            }
        })
        return headers
    }

    onRowClick(e, handleOriginal) {

    }

    getRowData(data) {
        return data
    }

    handleRowSelected(selectedData) {
        this.setState(Object.assign( {}, this.state, {selected: selectedData['selectedRows']} ))
    }



    render() {
        var styles = {}
        let dataKeyPath = this.state.dataKeyPath

        if(this.state.data.length === 0 && !this.state.hasRefreshed) {
            if(cm.cache[dataKeyPath] === undefined) {
                return(
                    <div>
                    <ReactTable
                        columns={[]}
                        data={[]}
                    />
                    </div>);
                }
            this.setState( Object.assign( {}, this.state, {data: cm.cache[dataKeyPath], hasRefreshed: true} ) )
        }

        var data = this.state.data
        var columns = this.getHeaders(data)
        var processedData = this.getRowData(data)
        return (
            <div>
                <ReactTable
                    columns={columns}
                    data={processedData}
                    getTdProps={this.props.onClick.bind(this)}
                    pagination
                />
            </div>
        );
    }
}