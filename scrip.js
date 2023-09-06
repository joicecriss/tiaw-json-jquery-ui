const dados = []; // Vetor para armazenar os objetos JSON

document
  .getElementById("form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obter os valores do formulário
    const nome = document.getElementById("name").value;
    const dataNascimento = document.getElementById("date").value;

    // Validar o campo nome
    if (nome.length < 3 || nome.length > 50) {
        alert("O nome deve ter entre 3 e 50 caracteres.");
        return;
    }

    // Calcular a idade a partir da data de nascimento
    const dataNascimentoFormatada = new Date(dataNascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimentoFormatada.getFullYear();

    // Verificar a idade mínima de 18 anos
    if (idade < 18) {
        alert("Você deve ter pelo menos 18 anos.");
        return;
    }
    
    // Dividir a data em ano, mês e dia
    const [ano, mes, dia] = dataNascimento.split("-");
    // Formatar a data para o formato "dd/mm/yyyy"
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Criar um objeto JSON
    const objetoJSON = {
      nome: nome,
      dataNascimento: dataFormatada,
    };

    // Adicionar o objeto JSON ao vetor de dados
    dados.push(objetoJSON);

    // Limpar os campos do formulário
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";

    // Atualizar a tabela de dados
    atualizarTabela();

    // Atualizar o JSON no textarea
    atualizarJSON();
  });

function atualizarTabela() {
  const tabela = document.getElementById("tabelaDados");
  tabela.innerHTML = ""; // Limpar a tabela

  dados.forEach((item) => {
    //cria uma nova linha na tabela para cada objeto no dados
    const row = tabela.insertRow();
    //depois de criar uma linha, cria duas novas celulas (para nome e data de nascimento)
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    //define o conteúdo das celulas com os valores do objeto json
    cell1.textContent = item.nome;
    cell2.textContent = item.dataNascimento;
  });
}

function atualizarJSON() {
  const textareaJson = document.getElementById("textareaJson");
  //converte o vetor em dados com formato json
  textareaJson.value = JSON.stringify(dados, null, 2);
}
