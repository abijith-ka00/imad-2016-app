var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


var articles= {
   'article-one' :{
    title:'article-one|abijith ka',
    heading:'article-one',
    date:'sep 18, 2016' ,
    content: `<p>
            This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
        </p>
        
        <p>
            This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
        </p>
        
        <p>
            This is the content of my first article.This is the content of my first article.This is the content of my first article.This is the content of my first article.
        </p>`
},
   'article-two' : { 
    title:'article-two|abijith ka',
    heading:'article-two',
    date:'sep 12, 2016' ,
    content: `<p>
            This is the content of my second article.
        </p>`},
   'article-three' : {
    title:'article-three|abijith ka',
    heading:'article-three',
    date:'sep 10, 2016' ,
    content: `<p>
            This is the content of my third article.
        </p>`
    
   }
};

function createTemplate (data) {
    var title= data.title;
    var date= data.date;
    var heading= data.heading;
    var content= data.content;

var htmlTemplate=
`<html>
<head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
</head>    
<body>
<div class="container">
    <div>
        <a href='/'>home</a>
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
        ${date}
    </div>
    <div>
        ${content}
    </div>
</div>
</body>

</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function (req, res){
    counter=counter+1;
    res.send(counter.toString());
})

function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user1', function (req,res){
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user1"(username, password)VALUES ($1, $2)', [username, dbString], function (err, result){ 
    if (err) {
        res.status(500).send(err.toString());
    } else {
        res.send('User succesfulli created: ' + username);
    
    }
        
    });
    
});


app.get('/:articleName', function  (req,  res){
    var articleName= req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
