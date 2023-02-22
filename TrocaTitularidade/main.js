let btnNumUC = document.getElementById("btnNumUC");
let btnDoc = document.getElementById("btnCpfCnpj");
let btnConfirmar = document.getElementById("btnConfirmar");
let codConsumidor;
let documentoDigitado;
let validacao;

var options = {
  onKeyPress: function (cpf, ev, el, op) {
    var masks = ["000.000.000-000", "00.000.000/0000-00"];
    $(".cpfcnpj").mask(cpf.length > 14 ? masks[1] : masks[0], op);
  },
};
$(".cpfcnpj").length > 11
  ? $(".cpfcnpj").mask("00.000.000/0000-00", options)
  : $(".cpfcnpj").mask("000.000.000-00#", options);

function TiraSinais() {
  if (btnDoc.value.length == 14) {
    documentoDigitado =
      btnDoc.value.slice(0, 3) +
      btnDoc.value.slice(4, 7) +
      btnDoc.value.slice(8, 11) +
      btnDoc.value.slice(12, 14);
  } else {
    documentoDigitado =
      btnDoc.value.slice(0, 2) +
      btnDoc.value.slice(3, 6) +
      btnDoc.value.slice(7, 10) +
      btnDoc.value.slice(11, 15) +
      btnDoc.value.slice(16, 18);
  }
  verificaDoc();
}

function verificaDoc() {
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

function patchNewTitular() {
  console.log(codConsumidor);
  if (validacao == true) {
    fetch(`https://localhost:7230/UC/TrocaTitularidade/${btnNumUC.value}`, {
      method: "PUT",
      headers: {
        Accept: "*//*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Cod_consumidor: codConsumidor,
      }),
    }).then(function (response) {
      if (response.status == 200) {
        alert("Titularidade Alterada");
      } else if (response.status == 404) {
        alert("UC não cadastrada");
      } else {
        alert("Houve um problema, no envio da requesição");
      }
    });
  } else {
    alert("Insira um documento válido");
  }
}

function LimpaCampos() {
  btnDoc.value = "";
  btnNumUC.value = "";
}

btnDoc.addEventListener("change", function () {
  TiraSinais();
});

btnConfirmar.addEventListener("click", function (e) {
  e.preventDefault();
  patchNewTitular();
  LimpaCampos();
});
