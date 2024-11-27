const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
const clienteAtual = clientes[clientes.length - 1];

if (clienteAtual) {
  document.getElementById("nomeDisplay").textContent = clienteAtual.nome;
  document.getElementById("cpfDisplay").textContent = clienteAtual.cpf;
  document.getElementById("celularDisplay").textContent = clienteAtual.celular;
  document.getElementById("valorDisplay").textContent = clienteAtual.valor.toFixed(2);
}

document.getElementById("confirmarVenda").addEventListener("click", function () {
  const senha = document.getElementById("senha").value;
  const senhaCorreta = "1234";

  if (senha === senhaCorreta) {
    clienteAtual.recorrencia += 1;
    clienteAtual.ticketMedio = 
      ((clienteAtual.ticketMedio * (clienteAtual.recorrencia - 1)) + clienteAtual.valor) /
      clienteAtual.recorrencia;

    clientes[clientes.length - 1] = clienteAtual;
    localStorage.setItem("clientes", JSON.stringify(clientes));

    atualizaProgresso(clienteAtual.valor);
    alert("Venda confirmada!");
  } else {
    alert("Senha incorreta!");
  }
});

function atualizaProgresso(valor) {
  const nivelMeta = parseInt(localStorage.getItem("nivelMeta") || "6");
  const valorPorNivel = parseFloat(localStorage.getItem("valorPorNivel") || "50");
  const meta = nivelMeta * valorPorNivel;

  const progresso = Math.min((valor / meta) * 100, 100);
  document.getElementById("barra").style.width = `${progresso}%`;
}
