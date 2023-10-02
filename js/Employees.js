let raw_data = [];

function CreateTable(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button onclick="editLine(${line.id});">edit</button></td>`;
        str+="<td>"+line.name+"</td>";
        str+=`<td><button onclick="deleteLine(${line.id});">delete</button></td>`;
        str+="</tr>";
    }
    document.getElementById("oneEmployees").innerHTML=str;
}


async function getList() {
        let response = await fetch('/employees/List');
        let data = await response.json();
        console.log("data=", data);
        raw_data = data;
        CreateTable();
    }

async function addNewLine() {
    let name=document.getElementById("name").value;
    let response = await fetch('/employees/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        }
    );
    let data = await response.json();
    console.log(data);
    await getList();
}

async function deleteLine(id) {
    let objToServer={};
    objToServer.id=id;
    let response = await fetch('/employees/Delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
// let data = await response.json();
// console.log(data);
    await getList();
}

async function editLine(id) {
    let objToServer={};
    let name = document.getElementById(`namei-${id}`).value
    objToServer.id=id;
    objToServer.name=name;
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

getList()
