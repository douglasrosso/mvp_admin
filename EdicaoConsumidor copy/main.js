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

let documento

let codConsumidor;

let cpfcnpjDigitado


function TiraSinais() {
  if (cpfcnpj.value.length == 14) {
    cpfcnpjDigitado =
      cpfcnpj.value.slice(0, 3) +
      cpfcnpj.value.slice(4, 7) +
      cpfcnpj.value.slice(8, 11) +
      cpfcnpj.value.slice(12, 14);
  } else {
    cpfcnpjDigitado =
      cpfcnpj.value.slice(0, 2) +
      cpfcnpj.value.slice(3, 6) +
      cpfcnpj.value.slice(7, 10) +
      cpfcnpj.value.slice(11, 15) +
      cpfcnpj.value.slice(16, 18);
  }
}
function getConsumidores() {
  TiraSinais()

  fetch(`https://localhost:7230/Consumidor/ProcuraDocumento/${cpfcnpjDigitado}`)
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
      });

    });
}


var input = document.getElementById("cpfcnpj")
input.addEventListener("change", function () {

  getConsumidores()


})


function putUser() {

  fetch(`https://localhost:7230/Consumidor/Edita/${codConsumidor}`, {
    method: 'PUT',
    headers: {
      "Accept": "*//*",
      "content-type": "application/json",

    },
    body: JSON.stringify({
      Nome_Consumidor: nome.value,
      Telefone1: telefone.value,
      Telefone2: telefone2.value
    })
  })
    .then(function (response) {
      if (response.status == 204) {
        alert("cadastro do Consumidor alterado com sucesso");
      }
      else if (response.status == 409) {
        alert("Consumidor Ja existe no banco de dados");
      }
    })
}

function LimpaCampos() {
  nome.value = "";
  cpfcnpj.value = "";
  telefone.value = "";
  telefone2.value= "";

}
var button = document.querySelector("button");
button.addEventListener("click", function (event) {
  event.preventDefault();
  putUser()
  LimpaCampos()
});