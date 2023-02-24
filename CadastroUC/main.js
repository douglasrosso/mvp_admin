var options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ["000.000.000-000", "00.000.000/0000-00"];
    $(".cpfcnpj").mask(cpf.length > 14 ? masks[1] : masks[0], op);
  },
};
$(".cpfcnpj").length > 11
  ? $(".cpfcnpj").mask("00.000.000/0000-00", options)
  : $(".cpfcnpj").mask("000.000.000-00#", options);

let documento = document.querySelector(".cpfcnpj");
let cep = document.getElementById("cep");
let logradoro = document.getElementById("logradouro");
let numeroCasa = document.getElementById("numerocasa");
let complemento = document.getElementById("complemento");
let numerodomedidor = document.getElementById("numerodomedidor");
let bairro = document.getElementById("bairro");
let btnConfirmar = document.getElementById("btnConfirmar");
let listDoc = document.getElementById("listDoc");
let codConsumidor;
let cepDigitado;
let documentoDigitado;
let validacao;

function TiraSinais() {
  if (documento.value.length <= 14) {
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
  cepDigitado =
    cep.value.slice(0, 2) + cep.value.slice(3, 6) + cep.value.slice(7, 10);
}

function LimpaCampos() {
  documento.value = "";
  cep.value = logradoro.value = "";
  numeroCasa.value = "";
  complemento.value = "";
  numerodomedidor.value = "";
  bairro.value = "";
}

function getConsumidor() {
  TiraSinais();
  fetch(
    `https://localhost:7230/Consumidor/Documento/${documentoDigitado}`
  ).then(function (res) {
    if (res.status == 200) {
      res.json().then(function (cons) {
        codConsumidor = cons.cod_Consumidor;
        validacao = true;
      });
    } else {
      validacao = false;
      alert("Documento não cadastrado");
    }
  });

}

// function getCep(){
//   TiraSinais()
//   fetch(`viacep.com.br/ws/88906-024`)
//     .then(response => response.json())
//     .then(data => {
//       data.forEach(item => {
//         console.log(data)
//         let option = document.createElement('option');
//         console.log(option)
//         option.textContent = item.cep
//         option.value = item.cep
        
//         logradoro.value = item.logradoro
//       });

//     });
// }


function getCep() {
  TiraSinais()

  fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`)
    .then(response => response.json())
    .then(data => {
      bairro.value = data.bairro
      logradoro.value = data.logradouro
      complemento.value = data.complemento

    });
}

// busca cod pelo documento
function postUser() {
  TiraSinais();
  if (validacao == true) {
    fetch(`https://localhost:7230/UC`, {
      method: "POST",
      headers: {
        Accept: "*//*",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cod_Consumidor: codConsumidor,
        num_Medidor: numerodomedidor.value,
        num_Casa: numeroCasa.value,
        cep: cepDigitado,
        logradouro: logradoro.value,
        Bairro: bairro.value,
        complemento: complemento.value,
      }),
    }).then(function (response) {
      if (response.status == 201) {
        alert("UC Cadastrada");
      } else {
        alert("Houve um problema, no envio da requesição");
      }
    });
  }
}

var input = document.getElementById("cep")
input.addEventListener("change", function () {

  getCep()


})

documento.addEventListener("change", function () {
  getConsumidor();
});

btnConfirmar.addEventListener("click", function (e) {
  e.preventDefault();
  postUser();
  LimpaCampos();
});
