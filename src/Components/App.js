import React, {Component} from 'react';
import cm from './ComManager'
import apiService from './Services/ApiService'

import viewsBuilder from "./Views/ViewsBuilder"
import Factory from "./Components/Factory"
import Button from "./Components/Button"
import Table from "./Components/Table"


export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        var store = {}
        cm.init(store);
        this.path = this.id = 'App'

    }


    render ()  {

        return (
            <div id={'main'}>
                <Factory
                    path={this.path}
                    currentPage={'folders'}
                    viewsPath={'folders/inbox'}
                    views={viewsBuilder['folders']['inbox']}
                />
            </div>
        )
    }
}
