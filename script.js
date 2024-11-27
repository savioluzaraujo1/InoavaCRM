// Função para registrar cliente
function registrarCliente() {
    // Obter os dados do cliente
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const celular = document.getElementById('celular').value;
    const compra = parseFloat(document.getElementById('compra').value);
    
    // Verificar se os campos foram preenchidos
    if (!nome || !cpf || !celular || !compra) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
  
    // Verificar se já existem dados armazenados no localStorage
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  
    // Calcular o ticket médio e a barra de progresso
    let clienteExistente = clientes.find(cliente => cliente.cpf === cpf);
    if (!clienteExistente) {
      // Adicionar novo cliente
      clientes.push({
        nome,
        cpf,
        celular,
        ticketMedio: compra,
        progresso: 0, // Inicialmente, a barra de progresso começa em 0
        premio: false
      });
    } else {
      // Atualizar dados do cliente existente
      clienteExistente.ticketMedio = (clienteExistente.ticketMedio + compra) / 2;
      clienteExistente.progresso += compra; // Aumentar o progresso com o valor da compra
      // Verificar se o cliente atingiu o prêmio
      if (clienteExistente.progresso >= 300) { // Meta de 300 reais para prêmio
        clienteExistente.premio = true;
      }
    }
  
    // Salvar os dados atualizados no localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));
  
    // Atualizar a barra de progresso
    atualizarBarra(clienteExistente || clientes[clientes.length - 1]);
  
    // Limpar os campos
    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('compra').value = '';
  }
  
  // Função para atualizar a barra de progresso
  function atualizarBarra(cliente) {
    const barra = document.getElementById('barraProgresso');
    const progresso = cliente.progresso;
    const meta = 300;
    const porcentagem = (progresso / meta) * 100;
    barra.style.width = porcentagem + '%';
  }
  
  // Função para carregar os dados dos clientes na tabela de gestão
  function carregarTabela() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const tabela = document.getElementById('tabelaClientes').getElementsByTagName('tbody')[0];
  
    clientes.forEach(cliente => {
      let linha = tabela.insertRow();
      linha.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.celular}</td>
        <td>${cliente.ticketMedio.toFixed(2)}</td>
        <td>${cliente.progresso} / 300</td>
      `;
    });
  }
  
  // Carregar a tabela assim que a página for carregada
  document.addEventListener('DOMContentLoaded', carregarTabela);
  