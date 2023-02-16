var options = {
  onKeyPress: function (cpf, ev, el, op) {
      var masks = ['000.000.000-000', '00.000.000/0000-00'];
      $('.cpfcnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
  }
}
$('.cpfcnpj').length > 11 ? $('.cpfcnpj').mask('00.000.000/0000-00', options) : $('.cpfcnpj').mask('000.000.000-00#', options);

let nome = document.getElementById("nome")
let cpfcnpj = document.getElementById("cpfcnpj")
let telefone = document.getElementById("telefone")
let telefone2 = document.getElementById("telefone2")

function postUser() {

  fetch(`https://localhost:7230/Consumidor`, {
  method: 'POST',
  headers: {
    "Accept": "*//*",
    "content-type": "application/json",

  },
  body: JSON.stringify({
      Nome_Consumidor: nome.value,
      Doc_Consumidor: cpfcnpj.value,
      Telefone1: telefone.value,
      Telefone2: telefone2.value
  })
})
.then(function (response) {
  if (response.status == 201) {
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
postUser()
});
