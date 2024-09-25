let setores = [];

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
function enviarFormulario(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário
    
    // Oculta o formulário e exibe a mensagem de sucesso
    document.getElementById('reservaForm').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';
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
