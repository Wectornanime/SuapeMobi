let setores = [];
let dados = []; 


// Função para carregar os dados do JSON
async function carregarSetores() {
    const response = await fetch('setores.json');
    setores = await response.json();
    const selectSetores = document.getElementById('centroCusto');
    setores.setores.forEach(setor => {
        const option = document.createElement('option');
        option.value = setor.id;
        option.textContent = setor.setor;
        selectSetores.appendChild(option);
    });
}

// Função para atualizar o gestor aprovador com base no setor selecionado
function atualizarGestor() {
    const selectSetores = document.getElementById('centroCusto');
    const gestorInput = document.getElementById('gestorAprovador');
    
    // Encontra o setor correspondente ao valor selecionado
    const setorSelecionado = setores.setores.find(setor => setor.id == selectSetores.value);
    
    // Atualiza o campo do gestor com o responsável do setor selecionado
    if (setorSelecionado) {
        gestorInput.value = setorSelecionado.responsavel;
    } else {
        gestorInput.value = '';
    }
}

// Função para lidar com o envio do formulário
async function enviarFormulario(event) {
    registrarSolicitacao();
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    
    // Oculta o formulário e exibe a mensagem de sucesso
    document.getElementById('reservaForm').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';
}

async function registrarSolicitacao() {
    const local = localStorage.getItem('dados');
    if (!local) {
        await fetch('solicitacao.json')
        .then(async res => {
            dados = await res.json();
        });
    } else {
        dados = JSON.parse(local);
    }

    const centroCusto = document.getElementById('centroCusto');
    const gestorAprovador = document.getElementById('gestorAprovador');
    const motivo = document.getElementById('motivo');

    const registro = {
        "id": (dados.solicitacao.length + 1) | 0,
        "veiculo_id": "",
        "setor_id": Number(centroCusto.value),
        "user_id": Number(localStorage.getItem('userId')),
        "observacao": motivo.value,
        "aprovado": false,
        "aprovador": gestorAprovador.value
    }

    dados.solicitacao.push(registro);
    localStorage.setItem('dados', JSON.stringify(dados))
}









window.onload = function() {
    carregarSetores();
    
    // Adiciona o evento de mudança no select de setores
    const selectSetores = document.getElementById('centroCusto');
    selectSetores.addEventListener('change', atualizarGestor);
    
    // Adiciona o evento de envio no formulário
    const form = document.getElementById('reservaForm');
    form.addEventListener('submit', enviarFormulario);
};
