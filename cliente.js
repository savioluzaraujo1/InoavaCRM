document.getElementById("clienteForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const celular = document.getElementById("celular").value;
    const valor = parseFloat(document.getElementById("valor").value);
  
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  
    clientes.push({ nome, cpf, celular, valor, recorrencia: 1, ticketMedio: valor });
  
    localStorage.setItem("clientes", JSON.stringify(clientes));
    alert("Dados enviados com sucesso!");
    window.location.href = "caixa.html";
  });
  