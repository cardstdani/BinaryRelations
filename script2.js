var currentRelations = 1;

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

window.onload = (event) => {
    document.getElementById("buttonAddRelation").addEventListener("click", function() {
        addRelation();
    });
    
    document.getElementById("buttonDeleteRelation").addEventListener("click", function() {
        deleteRelation();
    });
};