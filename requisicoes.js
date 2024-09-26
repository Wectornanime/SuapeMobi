let veiculos = {};
let setores = {};
let users = {};
let dados = {};

async function renderRequests() {
    const requestList = document.getElementById('requestList');
    const local = localStorage.getItem('dados');
    if (!local) {
        await fetch('solicitacao.json')
        .then(async res => {
            dados = await res.json();
            localStorage.setItem('dados', JSON.stringify(dados));
        });
    } else {
        dados = JSON.parse(local);
    }

    dados.solicitacao.forEach(solicitacao => {
        const item = document.createElement('div');
        const itemTitle = document.createElement('p');
        itemTitle.innerText = solicitacao.observacao;
        itemTitle.onclick = () => showDetails(solicitacao);
        item.appendChild(itemTitle);
        item.className = 'request-item';
        requestList.appendChild(item);
    });

    await fetch('veiculos.json')
    .then(async res => {
        veiculos = await res.json();
    });
    
    await fetch('setores.json')
    .then(async res => {
        setores = await res.json();
    });
    
    await fetch('users.json')
    .then(async res => {
        users = await res.json();
    });
}

function atualizaDados(solicitacaoId) {
    const dadoSolicitacao = dados.solicitacao.find(item => item.id === solicitacaoId)

    dadoSolicitacao.veiculo_id = Number(document.getElementById('veiculos').value)
    dadoSolicitacao.aprovado = document.getElementById('autorizacao').checked

    const solicitacaoIndex = dados.solicitacao.findIndex(s => s.id === solicitacaoId);

    dados.solicitacao[solicitacaoIndex] = dadoSolicitacao;
    localStorage.setItem('dados', JSON.stringify(dados));

}

function showDetails(solicitacao) {
    const existingDetails = document.querySelector('.request-details');
    if (existingDetails) {
        existingDetails.remove(); // Remove detalhes existentes
    }

    const details = document.createElement('div');
    details.className = 'request-details';
    details.innerHTML = `
    <p><strong>Motivo</strong>: ${solicitacao.observacao}</p>
    <p><strong>Requisitante</strong>: ${users.usuarios.find(u => u.id === solicitacao.user_id).username}</p>
    <p><strong>Centro de custo</strong>: ${setores.setores.find(setor => setor.id === solicitacao.setor_id).setor}</p>
    <p><strong>Gestor aprovador</strong>: ${setores.setores.find(setor => setor.id === solicitacao.setor_id).responsavel}</p>
    <p><strong>Data prevista</strong>: ${setores.setores.find(setor => setor.id === solicitacao.setor_id).data}</p>
    <p><strong>Hora prevista</strong>: ${setores.setores.find(setor => setor.id === solicitacao.setor_id).hora}</p>
    <div>
        <label for="veiculos"><strong>Veiculo:</strong></label>
        <select id="veiculos" name="veiculos" required>
            <option value="0" disabled>Escolha um veiculo</option>
        </select>
    </div>
    <div>
        <p><strong>Autorização:</strong></p>
        <label for="sim">Sim</label>
        <input type="radio" id="sim" name="autorizacao" value=true>
        <label for="nao">Não</label>
        <input type="radio" id="nao" name="autorizacao" value=false>
    </div>

    <button onclick="atualizaDados(${solicitacao.id})">Salvar</button>
    `;

    const requestItem = document.querySelector(`.request-item:nth-child(${solicitacao.id+1})`);
    requestItem.appendChild(details);

    const selectVeiculos = document.getElementById('veiculos');
    veiculos.veiculos.forEach(veiculo => {
        const option = document.createElement('option');
        option.value = veiculo.id;
        option.textContent = veiculo.modelo;
        option.selected = solicitacao.veiculo_id === veiculo.id;
        selectVeiculos.appendChild(option);
    });

    const radios = document.querySelectorAll('input[name="autorizacao"]');
    radios.forEach((radio) => {
        if (radio.value.toString() == solicitacao.aprovado.toString()) {
            radio.checked = true;
        }
    });

    details.style.display = 'block'; // Mostra os detalhes
}

renderRequests();