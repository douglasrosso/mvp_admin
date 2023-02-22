let nome = document.getElementById("nome")
let cpfcnpj = document.getElementById("cpfcnpj")
let telefone = document.getElementById("telefone")
let telefone2 = document.getElementById("telefone2")

let documento

let codConsumidor;


const Myselect = document.getElementById("my-select");


function getConsumidores(){
  fetch('https://localhost:7230/Consumidor')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
        console.log(data)
      let option = document.createElement('option');
      console.log(option)
      option.textContent = item.doc_consumidor
      option.value = item.nome_Consumidor;

      nome.value = item.nome_Consumidor
      telefone.value = item.telefone1
      telefone2.value = item.telefone2

      codConsumidor = item.cod_Consumidor
      documento = item.doc_consumidor
      Myselect.appendChild(option);
    });

  });
}


var input = document.getElementById("myinput")
input.addEventListener("keydown", function(){
  if(input.value.length==5){
    getConsumidores()
    
  }
  
})


function putUser() {

  fetch(`https://localhost:7230/Consumidor/${codConsumidor}`, {
  method: 'PUT',
  headers: {
    "Accept": "*//*",
    "content-type": "application/json",

  },
  body: JSON.stringify({
      Nome_Consumidor: nome.value,
      Doc_Consumidor: documento,
      Telefone1: telefone.value,
      Telefone2: telefone2.value
  })
})
.then(function (response) {
  if (response.status == 204) {
    alert("Consumidor cadastrado");
  }
  else if(response.status == 409){
      alert("Consumidor Ja existe no banco de dados");
  }
})
}
var button = document.querySelector("button");
button.addEventListener("click", function (event) {
event.preventDefault();
putUser()
});