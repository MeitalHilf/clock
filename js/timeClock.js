let raw_data=[];

setInterval(()=>{
    let clock = new Date();
    document.getElementById("clock").innerHTML=clock.toLocaleTimeString();
}   ,1000);


async function addentry(){

    let choices = document.getElementById("choice");
    let choiceName = choices.options[choices.selectedIndex].text;
    let response = await fetch('/employees-time/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: choiceName})
        });
    let data = await response.json();
    await getList();
}


async  function addexit(){
    let choices = document.getElementById("choice");
    let choiceName = choices.options[choices.selectedIndex].text;
    let response = await fetch('/employees-time/Add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: choiceName})
    });
    let data = await response.json();
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
listtwo()
