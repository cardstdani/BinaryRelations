var matrix = [];
var matrixText = "";

function checkString(string) {
    if ((string[0] == "(" && string[string.length - 1] == ")") && string.slice(1, string.length - 1).split(",").length == 2) {
        return true;
    }
    return false;
}

function generateProperties() {
    var outReflexive = "";
    var outAntireflexive = "";
    
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (i == j) {
                outReflexive += "<span style='color:" + (matrix[i][j] == 1 ? "#00ff00" : "#ff0000") + "'>" + matrix[i][j] + "</span> ";
                outAntireflexive += "<span style='color:" + (matrix[i][j] == 1 ? "#ff0000" : "#00ff00") + "'>" + matrix[i][j] + "</span> ";
                continue;
            }
            outReflexive += matrix[i][j] + " ";
            outAntireflexive += matrix[i][j] + " ";
        }
        outReflexive += "<br>";
        outAntireflexive += "<br>";
    }
    document.getElementById("reflexiveText").innerHTML = outReflexive;
    document.getElementById("antireflexiveText").innerHTML = outAntireflexive;
}

function generateMatrix() {
    var input = document.getElementById("inputRelation").value.replace(/\s/g, '');
    var pairs = input.split(/\,\s?(?![^\(]*\))/);
    var out = "";

    var setA = new Set();
    var setB = new Set();

    for (var i = 0; i < pairs.length; i++) {
        if (checkString(pairs[i])) {
            pairs[i] = pairs[i].slice(1, pairs[i].length - 1).split(",");

            setA.add(pairs[i][0]);
            setB.add(pairs[i][1]);
        } else {
            alert("Error");
            return;
        }
    }

    setA = Array.from(setA).sort();
    setB = Array.from(setB).sort();
    matrix = [];
    for (var i of setA) {
        matrix.push([]);
        for (var j of setB) {
            var added = false;
            for (var k of pairs) {
                if (k[0] == i && k[1] == j) {
                    matrix[matrix.length - 1].push(1);
                    added = true;
                    break;
                }
            }

            if (!added) { matrix[matrix.length - 1].push(0); }
        }
    }

    matrixText = "";
    for (var i of matrix) { matrixText += "[" + i.toString() + "],"; out += i.toString().split(",").join(" ") + "<br>"; }
    matrixText = "[" + matrixText.slice(0, matrixText.length - 1) + "]";

    document.getElementById("outText").innerHTML = out;
}

window.onload = (event) => {
    generateMatrix();
    generateProperties();

    document.getElementById("buttonCopy").addEventListener("click", function() {
        navigator.clipboard.writeText(matrixText);
        alert("Copied to clipboard");
    });

    document.getElementById("buttonMatrix").addEventListener("click", function() {
        generateMatrix();
        generateProperties();
    });
};