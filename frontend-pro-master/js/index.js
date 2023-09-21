
const addButton = document.getElementById('add-btn');
const soname = document.getElementById('soname');
const name = document.getElementById('name');
const exampleModal = document.getElementById('exampleModal');
const surname = document.getElementById('surname');
const addcontactBtn = document.getElementById('addcontact');
const formcontact = document.getElementById('form');
const search = document.getElementById('exampleInputEmail1');
const con = document.getElementById('contacts');
const tbody = document.getElementById('tbody');
const deleteBtn = document.getElementById('deleteBtn');
const exampleModalLabel = document.getElementById('exampleModalLabel');
const thid = document.getElementById('thid');
const imgId = document.getElementById('imgId');
const imgName = document.getElementById('imgName');
const thName = document.getElementById('thName');
const thDateCreate = document.getElementById('thDateCreate');
const imgCreate = document.getElementById('imgCreate');
const thDateUpdate = document.getElementById('thDateUpdate');
const imgUpdate = document.getElementById('imgUpdate');
const spin_table = document.getElementById('spin-table');
const linkdel = document.getElementById('linkdel');
const message = document.getElementById('message');
let post = false;
let cont = 0;
const validation = new JustValidate("#form",{
    validateBeforeSubmitting: true,
    lockForm: true,
    focusInvalidField: true,
});
let myModal = new bootstrap.Modal(exampleModal, {
    keyboard: false
})
const contactsValue = ['phone','additional_phone','email','vk','facebook','other'];
const contacts = ['Телефон','Доп. телефон','Email','Vk','Facebook','Другое']
let sortIdUp = true;
let sortNameUp = false;
let sortDateCreateUp = false;
let sortDateUpdateUp = false;
const clients = [];
let contObj = [];
let createNewClient = true;
let clientChange = null;
let clientDelete = null;

document.addEventListener('DOMContentLoaded',()=>{
    loadClientServer().then(()=>{
        spin_table.classList.add('none');
        for (let client of clients){
            renderDate(client);
        }
        renderTooltip();

    });
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});
formcontact.addEventListener('submit',(e)=>{


});
addcontactBtn.addEventListener('click',()=>{
   cont++;
   if(cont<10){
       renderContInput();
   }

});
linkdel.addEventListener('click',()=>{
    myModal.hide();
})
addButton.addEventListener('click',()=>{
    exampleModalLabel.textContent='Новый клиент';
    name.value='';
    soname.value='';
    surname.value='';
    con.innerHTML='';

    createNewClient = true;
    linkdel.classList.add("none");
});
deleteBtn.addEventListener('click',()=>{
    if (clientDelete){
        deleteClient(clientDelete);
        tbody.innerHTML='';
        for(let client of clients){
            if(client!=null){
                renderDate(client);
            }

        }
    }else{
        deleteClient(clientChange);
        tbody.innerHTML='';
        for(let client of clients){
            if(client!=null){
                renderDate(client);
            }

        }
    }

});
search.addEventListener('input',(event)=>{
    let sear = search.value;
    let serClients = searchClients(sear);
    if(serClients){
        tbody.innerHTML='';
        for(let client of serClients){
            if(client!=null){
                renderDate(client);
            }

        }
    }

});
thid.addEventListener('click',()=>{

   sortId(clients);
});
thName.addEventListener('click',()=>{
    sortName(clients);
});
thDateCreate.addEventListener('click',()=>{
    sortDateCreate(clients);
});
thDateUpdate.addEventListener('click',()=>{
    sortDateUpdate(clients);
});

function createClient() {
    let client = {};
    client.name = name.value;
    client.lastName = soname.value;
    client.surname = surname.value;
    client.createdAt = new Date().toISOString();
    client.updatedAt = new Date().toISOString();

    client.contacts = [];
  for (let i of contObj){
      if(i){
          switch (i.select.value) {
              case 'phone': client.contacts.push({type:'phone',value:i.inputCont.value});

                  break;
              case 'additional_phone':client.contacts.push({type:'additional_phone',value:i.inputCont.value}) ;
                  break;
              case 'email':  client.contacts.push({type:'email',value:i.inputCont.value});

                  break;
              case 'vk':  client.contacts.push({type:'vk',value:i.inputCont.value});
                  break;
              case 'facebook':  client.contacts.push({type:'facebook',value:i.inputCont.value});
                  break;
              case 'other':  client.contacts.push({type:'other',value:i.inputCont.value});
                  break;


          }
      }

  }
    name.value='';
    soname.value='';
    surname.value='';
    postClient(client).then(()=>{

    });
    clients.push(client);
    contObj = [];
    renderTooltip();
    return client;




}
function renderTooltip(){
    setTimeout(()=>{
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    },1000)
}
function searchClients(inputSearch){
    let searClients = clients.filter(c=>c.name.includes(inputSearch)
        ||c.lastName.includes(inputSearch)
        ||c.surname.includes(inputSearch));
    renderTooltip();
    return searClients;

}
function sortId(clients){
    if(sortIdUp){
        imgId.src = 'img/arrow_down.svg'
        clients.sort((a,b)=>{
            if (a.id < b.id) return 1;
            if (a.id == b.id) return 0;
            if (a.id > b.id) return -1;
        });
        sortIdUp = false;
    }else{
        imgId.src = 'img/arrow_downward.svg'
        clients.sort((a,b)=>{
            if (a.id > b.id) return 1;
            if (a.id == b.id) return 0;
            if (a.id < b.id) return -1;
        });
        sortIdUp = true;
    }

    if(clients){
        tbody.innerHTML='';
        for(let client of clients){
            if(client!=null){
                renderDate(client);
            }

        }
        renderTooltip();
    }
}
function sortName(clients){
    if(sortNameUp){
        imgName.src = 'img/arrow_downward.svg'
        clients.sort((a,b)=>{
            if (a.lastName < b.lastName) return 1;
            if (a.lastName == b.lastName) return 0;
            if (a.lastName > b.lastName) return -1;
        });
        sortNameUp = false;
    }else{
        imgName.src = 'img/arrow_down.svg'
        clients.sort((a,b)=>{
            if (a.lastName > b.lastName) return 1;
            if (a.lastName == b.lastName) return 0;
            if (a.lastName < b.lastName) return -1;
        });
        sortNameUp = true;
    }

    if(clients){
        tbody.innerHTML='';
        for(let client of clients){
            if(client!=null){
                renderDate(client);
            }

        }
        renderTooltip();
    }
}
function sortDateCreate(clients){
    if(sortDateCreateUp){
        imgCreate.src = 'img/arrow_downward.svg'
        clients.sort((a,b)=>{
           return new Date(b.createdAt) - new Date(a.createdAt);
        });
        sortDateCreateUp = false;
    }else{
        imgCreate.src = 'img/arrow_down.svg'
        clients.sort((a,b)=>{
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
        sortDateCreateUp = true;
    }

    if(clients){
        tbody.innerHTML='';
        for(let client of clients){
            if(client!=null){
                renderDate(client);
            }

        }
        renderTooltip();
    }
}
function sortDateUpdate(clients){
    if(sortDateUpdateUp){
        imgUpdate.src = 'img/arrow_downward.svg'
        clients.sort((a,b)=>{
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        sortDateUpdateUp = false;
    }else{
        imgUpdate.src = 'img/arrow_down.svg'
        clients.sort((a,b)=>{
            return new Date(a.updatedAt) - new Date(b.updatedAt);
        });
        sortDateUpdateUp = true;
    }

    if(clients){
        tbody.innerHTML='';
        for(let client of clients){
            if(client!=null){
                renderDate(client);
            }

        }
        renderTooltip();
    }
}
function changeClient(id){
    let index = 0;
    for(let j in clients){
        if(clients[j].id==id){
           index = j;
        }
    }
    clients[index].name =  name.value;
    clients[index].lastName = soname.value;
    clients[index].surname = surname.value ;
    clients[index].updatedAt = new Date();
    // отчищаем массив контактов
    clients[index].contacts = [];
    // создаем заново контакты
    for (let i in  contObj){

        if (contObj[i].select.value === 'phone') {
            clients[index].contacts.push({type:'phone',value: contObj[i].inputCont.value});
        } else if (contObj[i].select.value ==='additional_phone') {
            clients[index].contacts.push({type:'additional_phone',value:contObj[i].inputCont.value});
        } else if (contObj[i].select.value === 'email') {
            clients[index].contacts.push({type:'email',value: contObj[i].inputCont.value});
        } else if (contObj[i].select.value === 'vk') {
            clients[index].contacts.push({type:'vk',value:contObj[i].inputCont.value});
        }else if (contObj[i].select.value === 'facebook') {
            clients[index].contacts.push({type:'facebook',value: contObj[i].inputCont.value});
        }else if (contObj[i].select.value === 'other') {
            clients[index].contacts.push({type:'other',value: contObj[i].inputCont.value});
        }
    }
    contObj=[];
    pathClient(clients[index]);
    renderTooltip();




}
function deleteClient(client){
    let findIndex=clients.findIndex(c=>c.id==client.id);
    delete clients[findIndex];
    deleteStudentServer(client.id);

}

function renderContInput(index=null){

   const inputDiv = document.createElement('div');
   inputDiv.classList.add('flex');
   inputDiv.classList.add('contAdd');
   const styleSelect = document.createElement('div');
   styleSelect.classList.add('styleSelect');
   const select = document.createElement('select');



   const close = document.createElement('button');
   close.classList.add('btn');
   close.classList.add('close_con');
   close.addEventListener('click',()=>{
       inputDiv.remove();
       if(index){
           deleteContact(clientChange,index);
       }


   })
   const imgClose = document.createElement('img');
   imgClose.src='img/close.svg';
   close.append(imgClose);
   for(let i in contactsValue){
       const option = document.createElement('option');
       option.value = contactsValue[i];
       if(index){
           if(clientChange.contacts[index].type === contactsValue[i]){
               option.selected=true;
           }
       }

       option.textContent = contacts[i];
       select.append(option);
   }
   select.addEventListener('click',()=>{
       styleSelect.classList.toggle('styleSelectActive');
   })
   styleSelect.append(select);
   inputDiv.append(styleSelect);
   const inputCont = document.createElement('input');
   inputCont.classList.add('dop-input');
   if(index) {
       if (clientChange.contacts[index].type ==='phone') {
           inputCont.value = clientChange.contacts[index].value;
       } else if (clientChange.contacts[index].type ==='additional_phone') {
           inputCont.value = clientChange.contacts[index].value;
       } else if (clientChange.contacts[index].type ==='email') {
           inputCont.value = clientChange.contacts[index].value;
       } else if (clientChange.contacts[index].type ==='vk') {
           inputCont.value = clientChange.contacts[index].value;
       }else if (clientChange.contacts[index].type ==='facebook') {
           inputCont.value = clientChange.contacts[index].value;
       }else if (clientChange.contacts[index].type ==='other') {
           inputCont.value = clientChange.contacts[index].value;
       }
   }
   inputCont.placeholder = 'Введите данные контакта';
   inputDiv.append(inputCont);
   inputDiv.append(close);
   con.append(inputDiv);
   contObj.push({select,inputCont});
}
function deleteContact(client,index){
   delete client.contacts[index];
   delete contObj[index];
    console.log(client);
}

function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;
    let time = `${date.getHours()}:${date.getMinutes()}`
    if(date.getMinutes()<10){
         time = `${date.getHours()}:0${date.getMinutes()}`
    }

    return dd + '.' + mm + '.' + yy+' '+time;
}
function renderDate(client){
    console.log(client)
    const tr = document.createElement('tr');
    const idTh = document.createElement('th');
    idTh.scope = 'row';
    idTh.textContent = client.id;
    const name = document.createElement('td');
    name.textContent = `${client.lastName} ${client.name} ${client.surname}`;
    const dateCreation = document.createElement('td');
    dateCreation.textContent = formatDate(new Date(client.createdAt));
    const dateChange = document.createElement('td');
    dateChange.textContent = formatDate(new Date(client.updatedAt));
    const contacts = document.createElement('td');
     if(client.contacts.length>0){
         for(let contact of client.contacts){
             if(contact){

                 const imgContacts = document.createElement('img');
                 imgContacts.classList.add('imgcon');
                 const link = document.createElement('a');
                 link.classList.add('btn-pos');
                 link.setAttribute('data-bs-toggle','tooltip');
                 link.title = `${contact.type}: ${contact.value}`;


                 if(contact.type === 'phone'){
                     imgContacts.src = 'img/phone.svg';
                     link.href = `tel:${contact.value}`;
                 }else if(contact.type === 'additional_phone'){
                     imgContacts.src = 'img/phone.svg';
                     link.href = `tel:${contact.value}`;
                 }else if(contact.type === 'email'){
                     imgContacts.src = 'img/mail.svg';
                     link.href = `mailto:${contact.value}`;
                 }else if(contact.type ==='vk'){
                     imgContacts.src = 'img/vk.svg';
                     link.href = `${contact.value}`;
                 }else if(contact.type ==='facebook'){
                     imgContacts.src = 'img/fb.svg';
                     link.href = `${contact.value}`;
                 }else if(contact.type ==='other'){
                     imgContacts.src = 'img/social.svg';
                     link.href = `${contact.value}`;
                 }

                 link.append(imgContacts);
                 contacts.append(link);
             }

         }
         const tooltip = document.createElement('div');
         tooltip.classList.add('tooltip','bs-tooltip-top');
         tooltip.setAttribute('role','tooltip');
         const tooltipArrow = document.createElement('div');
         tooltipArrow.classList.add('tooltip-arrow');
         tooltip.append(tooltipArrow);
         const tooltip_inner = document.createElement('div');
         tooltip_inner.classList.add('tooltip-inner');
         tooltip_inner.textContent = 'Some tooltip!';
         tooltip.append(tooltip_inner);
         contacts.append(tooltip);
     }

    const redact = document.createElement('td');
    const change = document.createElement('a');
    const imgChange = document.createElement('img');
    imgChange.src = 'img/edit.svg';
    const imgDelete = document.createElement('img');
    imgDelete.src = 'img/cancel.svg';
    change.href = '#';
    change.textContent = 'Изменить';
    change.classList.add('mr-10');
    change.setAttribute('data-bs-toggle','modal');
    change.setAttribute('data-bs-target','#exampleModal');
    change.addEventListener('click',()=>{
        exampleModalLabel.textContent='Изменить данные';
        changeDate(idTh,clients);


    })
    const del = document.createElement('a');
    del.textContent = 'Удалить';
    del.href = '#';
    del.setAttribute('data-bs-toggle','modal');
    del.setAttribute('data-bs-target','#exampleModalDelete');
    del.addEventListener('click',()=>{
        clientDelete = client;
    })
    redact.append(imgChange);
    redact.append(change);
    redact.append(imgDelete);
    redact.append(del);
    tr.append(idTh);
    tr.append(name);
    tr.append(dateCreation);
    tr.append(dateChange);
    tr.append(contacts);
    tr.append(redact);
    tbody.append(tr);


}
function changeDate(idTh,clients){
    createNewClient = false;
    clientChange = clients.find(c=>c.id==idTh.textContent);
    console.log(clientChange);
    name.value = clientChange.name;
    soname.value = clientChange.lastName;
    surname.value = clientChange.surname;
    con.innerHTML='';
    for(let i in clientChange.contacts){
        renderContInput(i);
    }
}
//Работа с сервером
async function postClient(client){
    try {
        const response = await fetch("http://localhost:3000/api/clients", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(client),
        });
        if(response.ok){
            location.reload();
        }else{
            message.textContent =`ошибка ${response.status}`;
        }
        return await response.json();
    }catch (e){
        message.textContent = 'что то пошло не так';
    }








}
async function loadClientServer() {
    const response = await fetch("http://localhost:3000/api/clients");
    if (response.ok) {
        const data = await response.json();
            data.forEach((element) => {
                clients.push(element);
            });


    }
}
async function pathClient(client){

    const response = await fetch(`http://localhost:3000/api/clients/${client.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(client),
    })

}
async function deleteStudentServer(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "DELETE",
    });
    if (response.status === 404)
        console.log("Не удалось удалить клиента, так как его не существует");
    const data = await response.json();

}
// валидация
validation
    .addField(document.querySelector("#name"), [
        {
            rule: "required",
            errorMessage: "Поле должно быть заполнено",
        },
        {
            rule: "minLength",
            value: 3,
            errorMessage: "Мало символов",
        },
        {
            rule: "maxLength",
            value: 15,
            errorMessage: "Слишком много символов",
        },
    ])
    .addField(document.querySelector("#soname"), [
        {
            rule: "required",
            errorMessage: "Поле должно быть заполнено",
        },
        {
            rule: "minLength",
            value: 3,
            errorMessage: "Мало символов",
        },
        {
            rule: "maxLength",
            value: 15,
            errorMessage: "Слишком много символов",
        },
    ]).onSuccess((e)=>{

    if(createNewClient){
        createClient();



    }else{
        location.reload();
        linkdel.classList.remove("none");
        changeClient(clientChange.id);
        tbody.innerHTML='';
        for(let client of clients){
            if(client!=null){
                renderDate(client);
            }

        }
    }
})
