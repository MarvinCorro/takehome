const express = require('express')
const app = express()
const fs = require('fs');
var cors = require('cors')
const port = 3000

//some cors stuff
app.use(cors())

//all gets
app.get('/', (req, res) => {
    res.json({'Hello_World': 'test_man'})
})

app.get('/folders/', (req, res) => {
    console.log("Running Folders End Point")
    let obj = JSON.parse(fs.readFileSync('./JSON/folders.js', 'utf8'));
    console.log(obj)
    res.json(obj)
})

app.get('/folders/:folder_name', (req, res) => {
    console.log("Running Folders 2 End Point")
    let which_folder = req.params['folder_name']
    console.log(which_folder)
    let folder = JSON.parse(fs.readFileSync('./JSON/folders/'+ which_folder + '.js', 'utf8'));
    console.log(folder)
    let message_key_list = []

    for(let counter = 0; counter < folder.length; counter++) {
        var obj = folder[counter]
        console.log(obj)
        let msg = find_message(obj['message-id'])
        console.log(msg)
        message_key_list.push(msg)
    }

    res.json({'folders': folder, 'messages': message_key_list})
})

app.get('/messages/:message_id', (req, res)=>{
    find_message(id)
    res.json(obj)
})

var find_message = (id) => {
    return JSON.parse(fs.readFileSync('./JSON/messages/' + id + '.js', 'utf8'));
}

app.get('/contacts', (req, res) => {
    let obj = JSON.parse(fs.readFileSync('./JSON/contacts.js', 'utf8'));
    res.json(obj)
})

app.get('/filters', (req, res) => {
    let obj = JSON.parse(fs.readFileSync('./JSON/filters.js', 'utf8'));
    res.json(obj)
})

app.get('/settings', (req, res) => {
    let obj = JSON.parse(fs.readFileSync('./JSON/settings.js', 'utf8'));
    res.json(obj)
})

//all post
// app.post('/message/new', (req, res) => {
//     res.json({'Hello_World': 'test_man'})
// })
//
// app.post('/messages/:message_id/:update_metadata', (req, res) => {
//     res.json({'Hello_World': 'test_man'})
// })
//
// app.post('/folders/:folder_name/:message_id', (req, res) => {
//     res.json({'Hello_World': 'test_man'})
// })
//
// app.post('/folders/:new_folder', (req, res) => {
//     res.json({'Hello_World': 'test_man'})
// })
//
// app.post('/create_contact/:contact_details', (req, res) => {
//     res.json({'Hello_World': 'test_man'})
// })
//
// app.post('/update_contacts/:id/:contact_details', (req, res) => {
//     res.json({'Hello_World': 'test_man'})
// })



app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})

