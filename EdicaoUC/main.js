let CodUC = document.getElementById("inputCodUC");
let selectStatus = document.getElementById("selectStatus");
let btn = document.getElementById("btnAlterarCad");

function putStatus() {
  fetch(`https://localhost:7230/UC/TrocaStatus/${CodUC.value}`, {
    method: "PUT",
    headers: {
      Accept: "*//*",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      Status: selectStatus.value,
    }),
  }).then(function (response) {
    if (response.status == 204) {
      alert(`Status da UC alterado`);
    } else {
      alert("Houve um problema, no envio da requesição");
    }
  });
}

btnAlterarCad.addEventListener("click", function (e) {
  e.preventDefault();
  putStatus();
  CodUC.value = "";
});