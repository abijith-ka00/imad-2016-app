

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/index.html', function (req, res) {
    res.senFile(path.join(__dirname, 'ui' ,'index.html'));
});

app.get('/ui/main.js', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'main.js'));
})

res.status(500).send(err.toString());

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
