const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.set("json spaces", 2);
const bodyParser = require('body-parser');
const { append } = require('express/lib/response');
app.use(bodyParser.json())

var mock = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
  ];



// add your code here

app.get('/', function(req, res){
let body = {status: 'ok'};
res.send(body).status(200);
});

app.get('/api/TodoItems', function(req, res){
    res.send(mock).status(200);
    });

app.get('/api/TodoItems/:Number', function(req, res){
    var toDo = mock.find(item => item.todoItemId == req.params.Number);
    res.send(toDo).status(200);
    });


app.post('/api/TodoItems', (req, res) => {
    for (let i=0; i<mock.length; i++){
        if (mock[i].todoItemId == req.body.todoItemId){
            mock.splice(i,1, req.body)
            res.status(201).send(req.body);
            console.log(mock)
            return
                }
        else {
            mock.push(req.body)
            console.log("its in the else")
            res.status(201).send(req.body);
        return
    }}});


app.delete("/api/TodoItems/:number", function(req, res){
console.log(req.params.number);
res.send(mock[req.params.number]).status(200);
})


module.exports = app;
