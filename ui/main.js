//counter code
var submit = document.getElementById('submit_btn');
submit.onclick = function (){
    
  var request = new XMLHttpRequest();
 
 request.onreadystatechange = function () {
 if (request.readyState === XMLHttpRequest.DONE) {
     if (request.status === 200) {
         var names = request.responseText;
         names = JSON.parse(names);
         var list ='';
         for (var i=0; i < names.legth; i++) {
             list == '<li>' + names[i] + '</li>';
         }
         var ul = document.getElementById('namelist');
         ul.innerHTML = list ;
     }
 }
 
};
var nameInput = document.getElementById('name');
var name = nameInput.value;
request.open('POST' , 'http://abijith-ka00.imad.hasura-app.io/submit=name?name='+ name, true);
request.send(JSON.strinfigy({username : username, password : password}));

};