let usuarios = [];

// Função para carregar os dados do JSON
async function carregarUsuarios() {
    const response = await fetch('users.json');  // Faz o fetch do arquivo JSON
    usuarios = await response.json();
}

// Função para validar o login
function validarLogin(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    
    // Pega os valores dos inputs
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Busca um usuário correspondente no JSON
    const usuarioValido = usuarios.usuarios.find(user => user.username === username && user.password === password);
    if (usuarioValido) {
        alert('Login realizado com sucesso!');
        localStorage.setItem('userId', usuarioValido.id)
        if (usuarioValido.perfil === "solicitante") {
            // Redireciona para a página index.html
            window.location.href = "reserve.html";
        } else {
            // Redireciona para a página index.html
            window.location.href = "requisicoes.html";
        }
    } else {
        // Mostra mensagem de erro se a validação falhar
        document.getElementById('mensagemErro').style.display = 'block';
    }
}

window.onload = function() {
    // Carrega os usuários do arquivo JSON
    carregarUsuarios();
    
    // Adiciona o evento de envio ao formulário de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', validarLogin);
};
