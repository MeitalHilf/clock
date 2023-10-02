let raw_data = [];

function CreateTable(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td> <input type="date" name="name"  id="name-'+line.id+'"  placeholder="name"/></td>`;
        str+=`<td><button onclick="editLine(${line.id});">edit</button></td>`;
        str+="<td>"+line.id+"</td>";
        str+="<td>"+line.name+"</td>";
        str+="<td>"+line.entry+"</td>";
        str+="<td>"+line.exit+"</td>";
        str+="<td>"+line.date+"</td>";
        str+=`<td><button onclick="deleteLine(${line.id});">delete</button></td>`;
        str+="</tr>";
    }

    document.getElementById("oneEmployees").innerHTML=str;
}

async function getList() {
    let response = await fetch('/employees-time/List');
    let data = await response.json();
    console.log("data=", data);
    raw_data = data;
    CreateTable();
}

async function deleteLine(id) {
    let objToServer={};
    objToServer.id=id;
    let response = await fetch('/employees-time/Delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );

    await getList();
}

async function editLine(id) {
    let objToServer={};
    let name = document.getElementById(`name-${id}`).value
    objToServer.entry=entry;
    objToServer.exit=exit;
    objToServer.date=date;
    let response = await fetch('/employees/Edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );

    await getList();
}

    async function listtwo(){

        let response = await fetch('/employees/List');
        let data = await response.json();
        let selectElement = document.getElementById("choice");

        for (let row of data) {
            let option = document.createElement("option");
            option.value = row.id;
            option.text = row.name;
            selectElement.appendChild(option);
        }
    }
    listtwo();
    getList();

window.addEventListener("load", load);
async function load() {
    let selectElement = document.getElementById("choice");

    try {
        let response = await fetch('/employees/List');
        let data = await response.json();

        // צור את האפשרויות ב-<select> על פי השמות
        for (let employee of data) {
            let option = document.createElement("option");
            option.value = employee.name;
            option.text = employee.name;
            selectElement.appendChild(option);
        }
    } catch (error) {
        console.error("Error", error);
    }
}









