const urlItem = "https://localhost:7230/Item";
const urlConsumidor = "https://localhost:7230/consumidor/"
// var options = {
//   onKeyPress: function (cpf, ev, el, op) {
//     var masks = ["000.000.000-000", "00.000.000/0000-00"];
//     $(".cpfcnpj").mask(cpf.length > 14 ? masks[1] : masks[0], op);
//   },
// };
// $(".cpfcnpj").length > 11
//   ? $(".cpfcnpj").mask("00.000.000/0000-00", options)
//   : $(".cpfcnpj").mask("000.000.000-00#", options);

let btnCadastrarItem = document.querySelector("#btnAdicionar")
let modal = document.querySelector("#myModal");
let btnAdcionaItem = document.querySelector("#btnSalvarItem")
let nomeItem = document.querySelector("#nome")
let dataListItens = document.querySelector("#listaItens")
let dataListCons = document.querySelector("#listaConsumidores")
let documento = document.querySelector("#cpfcnpj")
let documentoDigitado
let Itens = []
let Consumidores = []

function LimpaCampos() {
  documento.value = "";
  cep.value = "";
  logradoro.value = "";
  numeroCasa.value = "";
  complemento.value = "";
  numerodomedidor.value = "";
  bairro.value = "";
}
btnCadastrarItem.addEventListener('click', function (e) {
  e.preventDefault();
  modal.style.display = "block";
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
})

btnAdcionaItem.addEventListener('click', function (e) {
  e.preventDefault();
  postItem();
})
documento.addEventListener('keyup', function(){
  TiraSinais() 
  console.log(documentoDigitado)
    if(documentoDigitado.length == 5){
      getConsumidores() 
    }
})
function getConsumidores() {
  let request = fetch(urlConsumidor)
  console.log(dataListCons)
  removeOptionsConsmidores()
  console.log(dataListCons)
  request.then(function (response) {
    response.json().then(function (vetorCons) {
      Consumidores = vetorCons
      Consumidores.forEach(criaListConsumidores)

    })
  })
}
function criaListConsumidores(cons) {
  let option = document.createElement("option")
  option.classList.add("consumidor")
  option.textContent = cons.doc_consumidor
  option.value = cons.nome_Consumidor
  dataListCons.appendChild(option)
}

function getItens() {
  let request = fetch(urlItem)
  removeOptionsItens()
  request.then(function (response) {
    response.json().then(function (vetorItens) {
      Itens = vetorItens
      Itens.forEach(criaListItens)

    })
  })
}
function criaListItens(itens) {
  let option = document.createElement("option")
  option.classList.add("itens")
  option.textContent = itens.cod_item
  option.value = itens.nome_item
  dataListItens.appendChild(option)
}
getItens()

function removeOptionsItens() {
  const option = document.querySelectorAll("itens")
  console.log(option)
  for (let o of option) {
    o.remove();
  }
}
function removeOptionsConsmidores() {

  const option = document.querySelectorAll("consumidor")
  console.log(option)
  for (let o of option) {
    o.remove();
  }
}


function TiraSinais() {
  if (documento.value.length == 14) {
    documentoDigitado =
      documento.value.slice(0, 3) +
      documento.value.slice(4, 7) +
      documento.value.slice(8, 11) +
      documento.value.slice(12, 14);
  } else {
    documentoDigitado =
      documento.value.slice(0, 2) +
      documento.value.slice(3, 6) +
      documento.value.slice(7, 10) +
      documento.value.slice(11, 15) +
      documento.value.slice(16, 18);
  }
}
function postItem() {
  console.log()
  let request = fetch(urlItem, {
    method: "POST",
    headers: {
      Accept: "*//*",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nome_item: nomeItem.value
    }),
  });
  request.then(function (res) {
    if (res.status == 201) {
      alert("Item salvo com sucesso")
      nomeItem.value = "";
      getItens()
    } else if (res.status == 400) {
      alert("Ocorreu um erro ao Salvar o Item")
    }
  })
}