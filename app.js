var textValue = document.getElementById("textTodo");

var ulli = document.createElement("ol");
ulli.setAttribute("id", "UlList");
var conttainerlist = document.getElementById("containerList");
conttainerlist.appendChild(ulli);

//----Geting Data From Database real time 

firebase.database().ref('User Data').on('child_added', function(data) {
    //---Create LI LIST IN UL----
     var createLi = document.createElement("li");
     var textLi = document.createTextNode(data.val().goal);
     //----Create Delete Button------
     var delBtn = document.createElement("button");
     var delBtnText = document.createTextNode("Delete");
     delBtn.setAttribute("onclick","deleteValue(this)");
     delBtn.setAttribute("class","deleteItem");
     delBtn.setAttribute("id",data.val().key)

     //----create Update Button----
     var updateBtn = document.createElement("button");
     var textUpdate = document.createTextNode("Update");
     updateBtn.setAttribute("onclick","editValue(this)")
     updateBtn.setAttribute("class","editvalue")
     updateBtn.setAttribute("id",data.val().key);


     updateBtn.appendChild(textUpdate)
     createLi.appendChild(textLi);
     ulli.appendChild(createLi);
     delBtn.appendChild(delBtnText);
     createLi.appendChild(delBtn);
     createLi.appendChild(updateBtn);
     console.log(createLi)

})


function addList() {
    //---User Get gaol and store in object.
    let key = firebase.database().ref("User Data").push().key;
    let userGaol = {
        key: key,
        goal: textValue.value
    }
    firebase.database().ref("User Data/" + key).set(userGaol);
    textValue.value = "";
}

//-----Delete All Whole List -------
function deleteAll() {
    firebase.database().ref("User Data").remove();
    ulli.innerHTML = " ";
}

//-----Delete Specific List------
function deleteValue(e) {
    //method 1
    // firebase.database().ref("User Data").child(e.id).remove();
    //method 2
    firebase.database().ref("User Data/"+e.id).remove();
    e.parentNode.remove()
}

//---Edit Each List ------
function editValue(e) {
    var val = prompt("Enter You Update Vlaue ", e.parentNode.firstChild.nodeValue);
    let editgoal={
        key: e.id,
        goal: val
    }
    firebase.database().ref('User Data').child(e.id).set(editgoal);
    e.parentNode.firstChild.nodeValue = val
}