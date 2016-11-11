//counter code
var submit = document.getElementById('submit_btn');
submit.onclick = function (){
    
  var request = new XMLHttpRequest();
 
request.open('POST' , 'http://abijith-ka00.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({username : username, password : password}));

};