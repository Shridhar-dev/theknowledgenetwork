var express = require("express");
var bodyparser = require('body-parser');
var app = express();
var pubmed = require('./pubmed')
var db = require('./db')
const util = require('util');



var port = process.env.port || 3000;
var path = require("path");

app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static('public'));
app.get('/authors', function(req, res){
	pubmed.findAuthorsWithTopic(req.query.topic, function(result){
		res.send(result);
	});
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.post('/login', function(req,res){
    db.validate(req.body.username, req.body.password, function(flag) {
        if(flag){
            res.redirect('/');
        }
        else {
            console.log("Bad cred")
            res.redirect('/login');
        }
    });

});


app.listen(port);
console.log("Server running at http://localhost:" + port);
