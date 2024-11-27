function carregarDadosGestao() {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const tabela = document.createElement("table");
  
    tabela.innerHTML = `
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Celular</th>
          <th>Recorrência</th>
          <th>Ticket Médio</th>
        </tr>
      </thead>
      <tbody>
        ${clientes.map(cliente => `
          <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.celular}</td>
            <td>${cliente.recorrencia}</td>
            <td>R$ ${cliente.ticketMedio.toFixed(2)}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
  
    const dadosGestaoDiv = document.getElementById("dadosGestao");
    dadosGestaoDiv.innerHTML = ""; // Limpa dados antigos antes de recarregar
    dadosGestaoDiv.appendChild(tabela);
  }
  
  document.getElementById("atualizarConfig").addEventListener("click", function () {
    const nivelMeta = parseInt(document.getElementById("nivelMeta").value);
    const valorPorNivel = parseFloat(document.getElementById("valorPorNivel").value);
  
    localStorage.setItem("nivelMeta", nivelMeta);
    localStorage.setItem("valorPorNivel", valorPorNivel);
  
    alert("Configurações atualizadas!");
  });
  
  carregarDadosGestao();
  