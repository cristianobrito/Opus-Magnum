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

// Inicialização da aplicação do Kanban
async function initKanban() {
  await renderKanbanBoard();
  setupDragAndDrop();
}

//localStorage.removeItem('tasksJson'); // Limpa o localStorage para testes
// Executa o app
initKanban();