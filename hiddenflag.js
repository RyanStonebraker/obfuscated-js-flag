var flag = document.getElementById("fl4g");

var flag_arr = [
  0x3A8,
  744,
  863,
  523,
  17300,
  16966,
  0x49CE,
  18670,
  18740,
  052201,
  21573,
  31850,
  43378,
  0125410,
  43961,
  0xAE15,
  44130,
  50177,
  52355,
  53076,
  0x1CD5F,
  117980,
  176659,
  176677,
  178491,
  178446,
  0544156
];

var corpuses = [];
var corpusNames = [
  "moby10b.txt",
  "lorem.txt"
];

corpusNames.forEach(function (name) {
  const request = new XMLHttpRequest();
  const url='text/' + name;
  request.open("GET", url);
  request.send();
  request.onreadystatechange=(e)=>{
    if (request.readyState == 4 && request.status == 200)
      corpuses.push(request.responseText);

    if (corpuses.length == corpusNames.length)
        flag.textContent += textSearch();
  }
});

var seed = 0x1eef;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function intermixCorpuses() {
  var combinedCorpuses = "";
  for (var i = 0; i < corpuses.length - 1; ++i) {
    for (var j = 0; j < corpuses[i].length; ++j) {
      combinedCorpuses += corpuses[i][j];
      if (i < corpuses[i+1].length)
        combinedCorpuses += corpuses[i+1][j];
    }
  }
  return combinedCorpuses;
}

function textSearch() {
  var corpus = intermixCorpuses();
  var found_text = "";
  var indices = "";
  for (var i = 0; i < flag_arr.length; ++i) {
    seed = seed ^ Math.floor(random() * 0xfff) + 0x08e;
    found_text += corpus[flag_arr[i] ^ Math.floor(random() * 1000)];
  }

  return found_text;
}
