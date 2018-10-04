var randCat = document.getElementById("randCat");

const request = new XMLHttpRequest();
const url='http://aws.random.cat/meow';
request.open("GET", url);
request.send();
request.onreadystatechange=(e)=>{
  if (request.readyState == 4 && request.status == 200) {
    randCat.src = JSON.parse(request.responseText).file;
  }
}
