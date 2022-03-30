import React from "react"
import Table from '../Components/Table'
import Button from '../Components/Button'
import Folders from '../Views/Folder.js'


const ComponentMapper = {
    'Table': (props) => {
        return React.createElement(Table, props)
    },
    'Button': (props) => {
        return React.createElement(Button, props)
    },
    'Folders': (props) => {
        return React.createElement(Folders, props)
    },
}

export default ComponentMapper