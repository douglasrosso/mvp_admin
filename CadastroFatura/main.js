const urlItem = "https://localhost:7230/Item";
const urlConsumidor = "https://localhost:7230/consumidor/Documento/"
const urlFatura = "https://localhost:7230/Fatura/"
var options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ["000.000.000-000", "00.000.000/0000-00"];
    $(".cpfcnpj").mask(cpf.length > 14 ? masks[1] : masks[0], op);
  },
};
$(".cpfcnpj").length > 11
  ? $(".cpfcnpj").mask("00.000.000/0000-00", options)
  : $(".cpfcnpj").mask("000.000.000-00#", options);

let btnCadastrarItem = document.querySelector("#btnAdicionar")
let modal = document.querySelector("#myModal");
let btnSalvaItem = document.querySelector("#btnSalvarItem")
let nomeItem = document.querySelector("#nome")
let dataListItens = document.querySelector("#listaItens")
//let dataListCons = document.querySelector("#listaConsumidores")
let codigoUC = document.querySelector("#codUC")
let competencia = document.querySelector("#competencia")
let documento = document.querySelector("#cpfcnpj")
let quantidade = document.querySelector("#Quantidade")
let valorUnitario = document.querySelector("#ValorUnitario")
let btnAddItem = document.querySelector("#addItem")
let inputDatalist = document.querySelector("#itens")
let tabela = document.querySelector(".tabelaItens")
let tabelabody = document.querySelector("tbody")
let btnSalvaFatura = document.querySelector("#btnSalvarFatura")

let documentoDigitado
let codConsumidor
let Itens = []
let Consumidores = []
let itensFatura = []


function LimpaCamposItens() {
      inputDatalist.value = ""
      quantidade.value = ""
      valorUnitario.value = ""
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

btnSalvaItem.addEventListener('click', function (e) {
  e.preventDefault();
  postItem();
})
// documento.addEventListener('keyup', function () {
//   TiraSinais()
//   console.log(documentoDigitado)
//   if (documentoDigitado.length == 5) {
//     getConsumidores()
//   }
// })


btnAddItem.addEventListener('click', function (e) {
  e.preventDefault()

  let ItensFaturaReq = {
    cod_item: inputDatalist.value,
    quant_item: quantidade.value,
    valor_item_consumo: valorUnitario.value
  }
  itensFatura.push(ItensFaturaReq)
  let linha = document.createElement("tr")
  let coluna1 = document.createElement("th")
  let coluna2 = document.createElement("th")
  let coluna3 = document.createElement("th")
  let coluna4 = document.createElement("th")
  tabela.classList.remove("hide")
  coluna1.innerHTML = inputDatalist.value,
    coluna2.innerHTML = quantidade.value,
    coluna3.innerHTML = valorUnitario.value
  coluna4.innerHTML = quantidade.value * valorUnitario.value
  linha.appendChild(coluna1)
  linha.appendChild(coluna2)
  linha.appendChild(coluna3)
  linha.appendChild(coluna4)
  tabelabody.appendChild(linha)
  LimpaCamposItens();
})
btnSalvaFatura.addEventListener('click', function (e) {
  e.preventDefault()
  TiraSinais()
  getConsumidor()
  
})

function getConsumidor() {
  let request = fetch(urlConsumidor+documentoDigitado)

  request.then(function (response) {
    if (response.status == 200) {
      response.json().then(function (cons) {
        codConsumidor = cons.cod_Consumidor;
        console.log("get aqui-->",codConsumidor)
        postFatura()
      });
    } else {
      alert("Documento Invalido")
    }

  })
}


// function criaListConsumidores(cons) {
//   let option = document.createElement("option")
//   option.classList.add(".consumidor")
//   option.textContent = cons.doc_consumidor
//   option.value = cons.nome_Consumidor
//   dataListCons.appendChild(option)
// }

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
  option.classList.add(".itens")
  option.textContent = itens.nome_item
  option.value = itens.cod_item
  dataListItens.appendChild(option)
}
getItens()

function removeOptionsItens() {
  let options = document.querySelectorAll("option")
  console.log(options)
  for (let o of options) {
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


function postFatura() {
  console.log(codConsumidor)
  console.log(codigoUC.value)
  console.log(competencia.value)
  console.log(itensFatura)
 // itensFatura = JSON.stringify(itensFatura)
  console.log(itensFatura)
  let teste = JSON.stringify({
    Cod_Consumidor: codConsumidor,
    Cod_uc: codigoUC.value,
    Competencia: competencia.value,
    itemFatura: itensFatura,
  })
  console.log(teste)
  let request = fetch(urlFatura, {
    method: 'POST',
    headers: {
      "Accept": "*//*",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      Cod_Consumidor: codConsumidor,
      Cod_uc: codigoUC.value,
      Competencia: competencia.value,
      itemFatura: itensFatura,
    })

  })
  request.then(function (res) {
    console.log(res.status)
    if (res.status == 201) {
      alert("Fatura Cadastrada com sucesso")
      //limpa campos
    } else if (res.status == 404) {
      alert("Você não possui cadastro na distribuidora")
    }
    else if (res.status == 409) {
      alert("email ja cadastrado")
    }
    else {
      alert("Não foi possivel efetuar o cadastro")
    }
  })
}