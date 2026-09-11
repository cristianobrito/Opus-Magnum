// URL da API pública para testes do Mini-CRM
const API_URL = 'https://jsonplaceholder.typicode.com';
async function fetchUsers(){
  try{
    const response = await fetch(`${API_URL}/users`); // await para ate resposder
    if(!response.ok){
        throw new Error(`Erro na requisição: ${response.status}`);
    }
    const users = await response.json();
    // localiza o container e depois limpamos
    const container = document.getElementById('crm-data-output');
    container.innerHTML ='';
    // percorrendo cada usuario para pegar o nome
    users.forEach(user => {
        console.log('Nome do usuario atual:', user.name);
        const card = document.createElement('div');
        card.className = 'crm-card';
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p>${user.email}</p>
        `;
        container.appendChild(card);
    });
    //return users;
    console.log('Dados recebidos com sucesso: ', users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}
// Chama a função para testar o carregamento assim que o script abrir
fetchUsers();

// iniciando kanbam-tasks
async function fetchKanbanTasks() {
  try{
    const response=await fetch(`${API_URL}/todos`);
    if(!response.ok){
        throw new Error(`Erro ao buscar tarefas: ${response.status}`);
    }
    const tasks = await response.json();
    console.log('Tarefas recebidas com sucesso: ', tasks);
    const todoContainer = document.querySelector('#col-todo .task-list');
    const doingContainer = document.querySelector('#col-doing .task-list');
    const doneContainer = document.querySelector('#col-done .task-list');

    todoContainer.innerHTML = '';
    doingContainer.innerHTML = '';
    doneContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'crm-card';
        card.innerHTML = `
            <h3>Tarefa ${task.id}</h3>
            <p>${task.title}</p>
        `;
        card.setAttribute('draggable', 'true');
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.id);
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
        if(task.completed){
            doneContainer.appendChild(card);
        }else{
            todoContainer.appendChild(card);
        }
    });
  }catch(error){
    console.error('Erro no kanban:', error);
  }
  const columns = document.querySelectorAll('.kanban-col');
  columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      column.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const draggingCard = document.querySelector('.dragging');
        if(draggingCard){
          const targetTaskList = column.querySelector('.task-list');
          targetTaskList.appendChild(draggingCard);
          console.log(`Tarefa ${taskId} movida para a coluna:`, column.id);
        }
      });
  });
}

//fetchKanbanTasks();


//==============================================================
// code de testes
// acertei a forma de pegar os dados
// ==============================================================
// KANBAN & LOCALSTORAGE UNIFICADOS (VERSÃO DEFINITIVA)
// ==============================================================
const tasksUrl = `${API_URL}/todos`;

// 1. Função que apenas busca na API e estrutura os dados iniciais com a propriedade 'column'
async function fetchAndInitializeTasks() {
  try {
    let res = await fetch(tasksUrl);
    if (!res.ok) throw new Error('Failed to fetch tasks from API');
    let tasksJson = await res.json();
    
    // Mapeia o estado inicial baseado na API original (completed: true vira col-done, senão col-todo)
    const mappedTasks = tasksJson.map(task => ({
      ...task,
      column: task.completed ? 'col-done' : 'col-todo'
    }));
    
    localStorage.setItem('tasksJson', JSON.stringify(mappedTasks));
    return mappedTasks;
  } catch (error) {
    console.error("Erro ao buscar tasks da API:", error);
    return [];
  }
}

// 2. Função de renderização baseada puramente no que está no LocalStorage
async function renderKanbanBoard() {
  // Pega do LocalStorage
  let tasks = JSON.parse(localStorage.getItem('tasksJson'));

  // Se não existir nada no LocalStorage, busca da API pela primeira vez
  if (!tasks || tasks.length === 0) {
    tasks = await fetchAndInitializeTasks();
  }

  const todoContainer = document.querySelector('#col-todo .task-list');
  const doingContainer = document.querySelector('#col-doing .task-list');
  const doneContainer = document.querySelector('#col-done .task-list');

  if (todoContainer && doingContainer && doneContainer) {
    // Limpa as colunas antes de desenhar
    todoContainer.innerHTML = '';
    doingContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    tasks.forEach(task => {
      const card = document.createElement('div');
      card.className = 'crm-card';
      card.innerHTML = `
        <h3>Tarefa ${task.id}</h3>
        <p>${task.title}</p>
        <div class="button-container">
        <button class="button button5 btn-right btn-color-update">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
        <button class="button button5 btn-right btn-color-edit">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button class="button button5 btn-right btn-color-delete">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        </div>
      `;
      card.setAttribute('draggable', 'true');
      card.setAttribute('data-id', task.id);

      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', String(task.id));
        card.classList.add('dragging');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });

      // Posiciona o card na coluna correta conforme o estado salvo
      if (task.column === 'col-done') {
        doneContainer.appendChild(card);
      } else if (task.column === 'col-doing') {
        doingContainer.appendChild(card);
      } else {
        todoContainer.appendChild(card);
      }
    });
  }
}

// 3. Configuração dos eventos de Drop nas colunas (roda apenas uma vez no carregamento)
function setupDragAndDrop() {
  const columns = document.querySelectorAll('.kanban-col');
  
  columns.forEach(column => {
    column.ondragover = (e) => {
      e.preventDefault();
    };

    column.ondrop = (e) => {
      e.preventDefault();
      const taskId = Number(e.dataTransfer.getData('text/plain'));
      
      // Recupera o array atual do localStorage
      let currentTasks = JSON.parse(localStorage.getItem('tasksJson')) || [];

      // Atualiza a coluna da tarefa arrastada
      currentTasks = currentTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, column: column.id };
        }
        return task;
      });

      // Salva imediatamente no localStorage
      localStorage.setItem('tasksJson', JSON.stringify(currentTasks));
      console.log(`Tarefa ${taskId} salva no localStorage para a coluna:`, column.id);

      // Re-renderiza o painel para refletir o novo estado na tela
      renderKanbanBoard();
    };
  });
}

// FUNCAO DE DELETAR CARDS (AINDA EM TESTES)
/*
async function deleteKanbanBoard() {
  await renderKanbanBoard();
  setupDragAndDrop();
// Seleciona todos os elementos do tipo <button> na página
const botoes = document.querySelectorAll("button");

botoes.forEach(function(botao) {
    botao.addEventListener("click", (e) => {
      console.log("objeto Evento: ------>", e);
        console.log("Você clicou no botão:", e.target.textContent);
    });
});

}
deleteKanbanBoard();
// ========== FIM DA FUNCAO DELETE ==========
*/

/*
// ______________________________________________
// teste de função para deletar cards
function deleteKanbanBoard() {
  document.addEventListener('click', (e) => {
    console.log("[DEBUG](e) object-----> ", e);
    console.log("Alvo (target):", e.target); // Adiciona uma linha só para o e.target
    console.log("ID do alvo:", e.target.id); // Mostra o ID do elemento clicado
    alert('Button was clicked!');
    let elementoClicado = e.target;
    console.log("Clicou em:", elementoClicado);

    let pai = e.target.parentElement;
    console.log("O pai é:", pai);

    let avo = e.target.parentElement.parentElement;
    console.log("O avô é:", avo);

    let card = e.target.closest('.crm-card'); // ou e.target.closest('div')
    console.log("O card encontrado é:", card);

    console.log("ID do card no DOM (data-id):", card.getAttribute('data-id'));
    let tasks = JSON.parse(localStorage.getItem('tasksJson'));
    let taskId = card.getAttribute('data-id'); // Pega o ID numérico
    
    taskId = parseInt(taskId, 10);

    // Encontrar a tarefa no localStorage
    let taskData = tasks.find(task => task.id === taskId);
      
    console.log("Dados da tarefa do LocalStorage:", taskData);

    // Exemplo: encontrei um card, agora quero pegar o título e o botão dentro dele
    // let carde2 = e.target.closest('.card');
    let titulo = card.querySelector('h3'); // Busca o primeiro h3 dentro do card
    console.log("O título do card é:", titulo ? titulo.textContent : 'Não encontrado');
    let botao = card.querySelector('.btn-color-delete'); // Busca o botão dentro do card
    console.log("O botão do card é:", botao ? botao.textContent : 'Não encontrado');

    let proximo = e.target.nextElementSibling; // Elemento logo abaixo
    console.log("O próximo é:", proximo);
    let anterior = e.target.previousElementSibling; // Elemento logo acima
    console.log("O anterior é:", anterior);
    console.log("O body é:", e.target.closest('body'));
    
  });
};

deleteKanbanBoard();
*/
// ______________________________________________

//-----------------------------------------------
// funcao deletar completa
function deleteKanbanBoard() {
  document.addEventListener('click', (e) => {
    // 1. Pegar o card exato
    let card = e.target.closest('.crm-card');

    // 2. Verificar se clicou no botão de DELETE
    if (card && e.target.closest('.btn-color-delete')) {
      // 3. Pegar o ID do card
      let taskId = parseInt(card.getAttribute('data-id'), 10);

      // 4. Atualizar o LocalStorage (remover a tarefa)
      let tasks = JSON.parse(localStorage.getItem('tasksJson')) || [];
      let novosTasks = tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasksJson', JSON.stringify(novosTasks));

      // 5. Remover o card físico do DOM
      card.remove();

      // 6. Atualizar o console para confirmar
      console.log(`Tarefa ${taskId} deletada com sucesso!`);
    }
  });
}

deleteKanbanBoard();

//===============================================
// mostrar as classes da pagina
// Pega todos os elementos com atributo class
/*
let todosElementos = document.querySelectorAll('[class]');

// Para cada elemento, mostra as classes
todosElementos.forEach(elemento => {
    console.log("Elemento:", elemento.tagName, "-> Classes:", elemento.className);
});

// classes unicas
let classesUnicas = new Set();
document.querySelectorAll('[class]').forEach(el => {
    el.classList.forEach(cls => classesUnicas.add(cls));
});
console.log([...classesUnicas]);
//===============================================
*/
//-----------------------------------------------
// funcao update
function updateCard(){
  document.addEventListener('click',(e)=>{
    //console.log("capturando o e evento update ---->", e); // ok
    //console.log("O objeto inteiro (para estudos):", e);
    //console.log("O TARGET (o que foi clicado):", e.target);
    //console.log("O TARGET com a tag HTML:", e.target.tagName);
    //console.log("O TARGET com as classes:", e.target.className);
    //console.log("O TARGET com o ID:", e.target.id);
    // e a classe gerada dinamicamente
    let cardClicado=e.target.closest('.crm-card');
    //console.log("esse card foi clicado:    ", cardClicado);
    
    if(cardClicado && e.target.closest('.btn-color-edit')){
      let titulo = cardClicado.querySelector('p');
      let taskId = parseInt(cardClicado.getAttribute('data-id'), 10);
      //console.log("peagar data-id do card clicado  ------> ",taskId);
      //console.log("esse e o target -----> ", e.target);
      //console.dir(e.target);
      //console.log("pai ------> ", e.target.parentElement);
      //console.log("vo ------> ", e.target.parentElement.parentElement);
      //console.log("bisavo ------> ", e.target.parentElement.parentElement.parentElement);
      //console.log("tataravo ------> ", e.target.parentElement.parentElement.parentElement);
      //console.log("tetraavo ------> ", e.target.parentElement.parentElement.parentElement.parentElement);

      // Guarda o ID para depois
      cardClicado.setAttribute('data-edit-id', taskId);
      
      // encontrar o prototipo herança
      //console.log("[DEBUGG] (prototipo heranca)");
      //Object.getPrototypeOf(e.target)

      // continaundo
      // Trocar o título (h3) por um input
      // <p>${task.title}</p> queremos o elemento p
      let input = document.createElement('input');
      input.type = 'text';
      input.classList.add('edit-input');
      input.value = titulo.textContent; // Pega o valor atual do título
      titulo.replaceWith(input); // Troca o h3 pelo input

      input.focus();
      console.log("Clicou no editar, ID:", taskId);
    }

    //_________________________________________
    
    // 4. VERIFICAR SE É O BOTÃO DE SALVAR (O VERDE)
    if (cardClicado && e.target.closest('.btn-color-update')) {
      // Pega o input que está no card
      let input = cardClicado.querySelector('input.edit-input');
      let taskId = parseInt(cardClicado.getAttribute('data-edit-id'), 10);
    
       // Se o input existir (estamos em modo edição)
      if (input) {
        // 5. PEGA O NOVO VALOR
        let novoTitulo = input.value;

        // 6. ATUALIZA O LOCALSTORAGE
        let tasks = JSON.parse(localStorage.getItem('tasksJson')) || [];
        let task = tasks.find(task => task.id === taskId);
        if (task) {
          task.title = novoTitulo;
          localStorage.setItem('tasksJson', JSON.stringify(tasks));
        }
        
        // 7. TROCA O INPUT DE VOLTA PARA <p>
        let titulo = document.createElement('p');
        titulo.textContent = novoTitulo;
        input.replaceWith(titulo);

        // 8. REMOVE O ID DE EDIÇÃO DO CARD
        cardClicado.removeAttribute('data-edit-id');
        
        console.log("Tarefa " + taskId + " atualizada com sucesso!");
       }
      }    
  });
}

updateCard();
// doido
//-----------------------------------------------

//-----------------------------------------------
// Inicialização da aplicação do Kanban
async function initKanban() {
  await renderKanbanBoard();
  setupDragAndDrop();
}

//localStorage.removeItem('tasksJson'); // Limpa o localStorage para testes
// Executa o app
initKanban();