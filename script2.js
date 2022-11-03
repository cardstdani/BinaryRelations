var currentRelations = 1;
var matrixText = "";

function addRelation() {
    currentRelations+=1;
    let clone = document.querySelector('#inputRelationContainer1').cloneNode(true);
    clone.setAttribute('id', "inputRelationContainer"+currentRelations.toString());
    clone.querySelector("#label").innerHTML = "R"+currentRelations.toString();
    
    document.querySelector('#leftSideDiv').appendChild(clone);
}

function deleteRelation() {
    if(currentRelations<=1){
        return;
    }
    currentRelations-=1;
    var parent = document.getElementById("leftSideDiv");
    parent.removeChild(parent.lastChild);
}

function matrixToText(matrix) {
    var out = "";
    matrixText="";
    
    for (var i of matrix) {
        matrixText += "[" + i.toString() + "],";
        out += i.toString().split(",").join(" ") + "<br>";
    }
    matrixText = "[" + matrixText.slice(0, matrixText.length - 1) + "]";
    return out;
}

function add(matrix1, matrix2) {
    if(matrix1.length!=matrix2.length || matrix1[0].length != matrix2[0].length) {
        return;
    }

    for(var i = 0; i<matrix1.length; i++) {
        for(var j = 0; j<matrix1[0].length; j++) {
            matrix1[i][j] |= matrix2[i][j];
        }
    }
    return matrixToText(matrix1);
}

function product(matrix1, matrix2) {
    if(matrix1.length!=matrix2.length || matrix1[0].length != matrix2[0].length) {
        return;
    }

    for(var i = 0; i<matrix1.length; i++) {
        for(var j = 0; j<matrix1[0].length; j++) {
            matrix1[i][j] *= matrix2[i][j];
        }
    }
    return matrixToText(matrix1);
}

function composition(matrix1, matrix2) {
    if(matrix1[0].length != matrix2.length) {
        alert("Error, invalid matrix sizes");
        return;    
    }

    var result = new Array(matrix1.length).fill(0).map(row => new Array(matrix2[0].length).fill(0));
    return matrixToText(result.map((row, i) => { return row.map((val, j) => { return matrix1[i].reduce((sum, elm, k) => sum + (elm*matrix2[k][j]) ,0) }) }));
}

function transposition(matrix1) {
    return matrixToText(matrix1[0].map((col, i) => matrix1.map(row => row[i])));
}

function calculate() {
    var input = document.getElementById("inputOperation").value;

    //Mess code down here, excuse me for this temporary fix
    try{
        if(input.includes("+")) {
            var m = input.split("+");

            document.getElementById("outText").innerHTML = add(JSON.parse(document.querySelector("#inputRelationContainer"+m[0].substring(1)).querySelector("#inputRelation").value), JSON.parse(document.querySelector("#inputRelationContainer"+m[1].substring(1)).querySelector("#inputRelation").value));
            return;
        } else if(input.includes("*")) {
            var m = input.split("*");

            document.getElementById("outText").innerHTML = product(JSON.parse(document.querySelector("#inputRelationContainer"+m[0].substring(1)).querySelector("#inputRelation").value), JSON.parse(document.querySelector("#inputRelationContainer"+m[1].substring(1)).querySelector("#inputRelation").value));
            return;
        } else if(input.includes("-1")) {
            var m = input.split("-1")[0];

            document.getElementById("outText").innerHTML = transposition(JSON.parse(document.querySelector("#inputRelationContainer"+m.substring(1)).querySelector("#inputRelation").value));
            return;
        } else if(input.includes("**")) {
            var m = input.split("**");

            document.getElementById("outText").innerHTML = composition(JSON.parse(document.querySelector("#inputRelationContainer"+m[0].substring(1)).querySelector("#inputRelation").value), JSON.parse(document.querySelector("#inputRelationContainer"+m[1].substring(1)).querySelector("#inputRelation").value));
            return;
        }
    } catch { alert("Error"); }
}

window.onload = (event) => {
    calculate();
    document.getElementById("buttonAddRelation").addEventListener("click", function() {
        addRelation();
    });
    
    document.getElementById("buttonDeleteRelation").addEventListener("click", function() {
        deleteRelation();
    });

    document.getElementById("buttonCalculate").addEventListener("click", function() {
        calculate();
    });

    document.getElementById("buttonCopy").addEventListener("click", function() {
        navigator.clipboard.writeText(matrixText);
        alert("Copied to clipboard");
    });
};