var matrix = [];
var matrixText = "";
var homogenea = true;

function checkString(string) {
    if ((string[0] == "(" && string[string.length - 1] == ")") && string.slice(1, string.length - 1).split(",").length == 2) {
        return true;
    }
    return false;
}

let MatrixProduct = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((acc, _, n) => acc + A[i][n] * B[n][j], 0)))

function generateProperties() {
    var outReflexive = "";
    var outAntireflexive = "";
    var outSimetry = "";
    var outAsimetry = "";
    var outTransitive = "";

    homogenea = document.getElementById("homogeneaToggle").checked;
    var matrix2 = homogenea || matrix.length == matrix[0].length ? MatrixProduct(matrix, matrix) : [];

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            try {
                outTransitive += matrix2[i][j] >= 2 ? "<span style='color:var(--greenColor)'>" + matrix[i][j] + "</span> " : matrix[i][j] + " ";
            } catch {
                outTransitive += matrix[i][j] + " ";
            }

            if (i == j) {
                outSimetry += matrix[i][j] + " ";
                outAsimetry += matrix[i][j] + " ";
                outReflexive += "<span style='color:" + (matrix[i][j] == 1 ? "var(--greenColor)" : "var(--redColor)") + "'>" + matrix[i][j] + "</span> ";
                outAntireflexive += "<span style='color:" + (matrix[i][j] == 1 ? "var(--redColor)" : "var(--greenColor)") + "'>" + matrix[i][j] + "</span> ";
                continue;
            } else if (j < matrix.length && i < matrix[0].length) {
                outSimetry += "<span style='color:" + (matrix[i][j] == matrix[j][i] ? "var(--greenColor)" : "var(--redColor)") + "'>" + matrix[i][j] + "</span> ";
                outAsimetry += "<span style='color:" + (matrix[i][j] == matrix[j][i] ? "var(--redColor)" : "var(--greenColor)") + "'>" + matrix[i][j] + "</span> ";
            } else {
                outSimetry += "<span style='color:var(--redColor)'>" + matrix[i][j] + "</span> ";
                outAsimetry += "<span style='color:var(--greenColor)'>" + matrix[i][j] + "</span> ";
            }
            outReflexive += matrix[i][j] + " ";
            outAntireflexive += matrix[i][j] + " ";
        }
        outReflexive += "<br>";
        outAntireflexive += "<br>";
        outSimetry += "<br>";
        outAsimetry += "<br>";
        outTransitive += "<br>";
    }

    document.getElementById("reflexiveText").innerHTML = outReflexive;
    document.getElementById("ireflexiveText").innerHTML = outAntireflexive;
    document.getElementById("simetryText").innerHTML = outSimetry;
    document.getElementById("asimetryText").innerHTML = outAsimetry;
    document.getElementById("transitivityText").innerHTML = outTransitive;
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

    if (homogenea) {
        if (setA.size >= setB.size) {
            setB = setA;
        } else {
            setA = setB;
        }
    }

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

            if (!added) {
                matrix[matrix.length - 1].push(0);
            }
        }
    }

    matrixText = "";
    for (var i of matrix) {
        matrixText += "[" + i.toString() + "],";
        out += i.toString().split(",").join(" ") + "<br>";
    }
    matrixText = "[" + matrixText.slice(0, matrixText.length - 1) + "]";

    document.getElementById("outText").innerHTML = out;
    generateProperties();
}

function generateRelation() {
    try {
        matrix = JSON.parse(document.getElementById("inputMatrixRelation").value);
    } catch {
        alert("Error");
        return;
    }

    var outRelationText = "";
    for (var i = 0; i<matrix.length; i++) {
        for (var j = 0; j<matrix[0].length; j++) {
            if(matrix[i][j]==1) {
                outRelationText += "(" + (i+1) + "," + (j+1) + "),";
            }
        }
    }
    document.getElementById("outRelationText").innerHTML = outRelationText.slice(0, outRelationText.length-1);
}

window.onload = (event) => {
    document.getElementById("homogeneaToggle").checked = true;

    document.getElementById("homogeneaToggle").addEventListener('change', e => {
        homogenea = document.getElementById("homogeneaToggle").checked;
    });    

    document.getElementById("buttonCopy").addEventListener("click", function() {
        navigator.clipboard.writeText(matrixText);
        alert("Copied to clipboard");
    });

    document.getElementById("buttonMatrix").addEventListener("click", function() {
        generateMatrix();
    });

    document.getElementById("buttonRelation").addEventListener("click", function() {
        generateRelation();
    });

    generateMatrix();
};