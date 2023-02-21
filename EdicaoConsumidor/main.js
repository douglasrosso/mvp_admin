var options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ["000.000.000-000", "00.000.000/0000-00"];
    $(".cpfcnpj").mask(cpf.length > 14 ? masks[1] : masks[0], op);
  },
};
$(".cpfcnpj").length > 11
  ? $(".cpfcnpj").mask("00.000.000/0000-00", options)
  : $(".cpfcnpj").mask("000.000.000-00#", options);

let documento = document.getElementById("cpfcnpj");
let codConsumidor;
let documentoDigitado;
let cepDigitado;
let btn = document.getElementById("btn");

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
  cepDigitado =
    cep.value.slice(0, 2) + cep.value.slice(3, 6) + cep.value.slice(7, 10);
}

function getConsumidor() {
  TiraSinais();
  fetch(`https://localhost:7230/Consumidor/Documento/${documentoDigitado}`)
    .then((response) => response.json())
    .then((data) => {
      codConsumidor = data.cod_Consumidor;
    })
    .catch((error) => console.error(error));
}

// busca cod pelo documento
function postUser() {
  fetch(`https://localhost:7230/UC`, {
    method: "POST",
    headers: {
      Accept: "*//*",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      cod_Consumidor: codConsumidor,
      num_medidor: numerodomedidor.value,
      num_casa: numeroCasa.value,
      cep: cepDigitado,
      logradouro: logradoro.value,
      Bairro: bairro.value,
      complemento: complemento.value,
    }),
  }).then(function (response) {
    if (response.status == 201) {
      alert("Consumidor Inserido");
    } else {
      alert("Houve um problema, no envio da requesição");
    }
  });
}

function LimpaCampos() {
  documento.value = "";
  cep.value = "";
  logradoro.value = "";
  numeroCasa.value = "";
  complemento.value = "";
  numerodomedidor.value = "";
  bairro.value = "";
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  postUser();
  LimpaCampos();
});
