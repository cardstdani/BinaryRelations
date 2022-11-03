var imageInput;
var matrix = [];
var matrixText = "";

function matrixToText() {
    var out = "";
    matrixText="";
    
    for (var i of matrix) {
        matrixText += "[" + i.toString() + "],";
        out += i.toString().split(",").join(" ") + "<br>";
    }
    matrixText = "[" + matrixText.slice(0, matrixText.length - 1) + "]";
    
    return out;
}

function recognizeInputImage() {
  document.getElementById("outText").innerHTML = "<strong>Cargando...</strong>";

  Tesseract.recognize(
    URL.createObjectURL(imageInput.files[0]),
    'eng').then(({ data: { text } }) => {

      matrix = [];
      for(var i of text.split("\n")) {
          matrix.push([]);
          for(var j of i) {
              matrix[matrix.length-1].push(j);
          }
      }
      matrix.pop();
      
      document.getElementById("outText").innerHTML = matrixToText();
    })
}

window.onload = (event) => {
    imageInput = document.getElementById("inputImage");
    imageInput.addEventListener("input", function() {
        recognizeInputImage();
    });

    document.getElementById("buttonCopy").addEventListener("click", function() {
        navigator.clipboard.writeText(matrixText);
        alert("Copied to clipboard");
    });
};