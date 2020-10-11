var User = [];
var currentUser = 1;
hideMateria();
function hideMateria() {
    document.getElementById("viewMateria").style.display = "none";
}
function viewUser() {
    document.getElementById("inputData").style.display = "none";
    document.getElementById("viewMateria").style.display = "block";
}

function numbersOnly(evt) {
    var myEvt = evt || window.event;
    var key = myEvt.keyCode || myEvt.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        myEvt.returnValue = false;
        if (myEvt.preventDefault) myEvt.preventDefault();
    }
}
function load() {
    document.getElementById("userDetails").innerHTML = "";
    if (localStorage.UserRecords) {
        User = JSON.parse(localStorage.UserRecords);
        for (var i = 0; i < User.length; i++) {
            view(i, User[i].NombreMateria, User[i].PrimeraNota, User[i].SegundaNota, User[i].TerceraNota);
        }
    }
    Clear();
}
function store() {

    var NombreMateria = document.getElementById("NombreMateria").value;
    var PrimeraNota = document.getElementById("PrimeraNota").value;
    var SegundaNota = document.getElementById("SegundaNota").value;
    var TerceraNota = document.getElementById("TerceraNota").value;
    var UserObj = {
        NombreMateria: NombreMateria,
        PrimeraNota: PrimeraNota,
        SegundaNota: SegundaNota,
        TerceraNota: TerceraNota
      
    };
    if (currentUser == 1) {
        User.push(UserObj);
    } else {
        User.splice(currentUser, 1, UserObj);
    }
    localStorage.UserRecords = JSON.stringify(User);
    load()
    Clear();
}
function view(id, NombreMateria, PrimeraNota,SegundaNota,TerceraNota,def) {
    var view = document.getElementById("userDetails");
    var insertRows = view.insertRow();
    insertRows.insertCell(0).innerHTML = id + 1;
    insertRows.insertCell(1).innerHTML = NombreMateria;
    insertRows.insertCell(2).innerHTML = PrimeraNota;
    insertRows.insertCell(3).innerHTML = SegundaNota;
    insertRows.insertCell(4).innerHTML = TerceraNota;
    def = ((PrimeraNota*0.3)+(SegundaNota*0.3)+(PrimeraNota*0.4));
    insertRows.insertCell(5).innerHTML = def;
    insertRows.insertCell(6).innerHTML = '<div id="action"><button class="btn btn-warning"" onclick="Editar(' + id + ')">Editar</button> </div>';
    insertRows.insertCell(7).innerHTML = '<div id="action"> <button class="btn btn-danger" onclick="Eliminar(' + id + ')">Eliminar</button></div>';
    
}
function Eliminar(id) {
    User.splice(id, 1);
    localStorage.UserRecords = JSON.stringify(User);
    load();
}
function Clear() {
    currentUser = 1;
    
    document.getElementById("NombreMateria").value = "";
    document.getElementById("PrimeraNota").value = "";
    document.getElementById("SegundaNota").value = "";
    document.getElementById("TerceraNota").value = "";
    document.getElementById("submit").innerHTML = "Registar";
}
function Editar(id) {
    currentUser = id;
    var UserObj = User[id];
    document.getElementById("inputData").style.display = "block";
 
    document.getElementById("NombreMateria").value = UserObj.NombreMateria;
    document.getElementById("PrimeraNota").value = UserObj.PrimeraNota;
    document.getElementById("SegundaNota").value = UserObj.SegundaNota;
    document.getElementById("TerceraNota").value = UserObj.TerceraNota;
    document.getElementById("submit").innerHTML = "Actualizar";
}


  
