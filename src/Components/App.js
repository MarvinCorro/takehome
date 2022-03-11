import React, {Component} from 'react';
import Factory from 'Components/Factory'
import Welcome from "./Views/Welcome"


export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        var store = {}
        window.cm.init(store);

    }


    //TODO create page render
    render ()  {

        return (
            <div id={'main'}>
                <Welcome />
            </div>
        )
    }
}
