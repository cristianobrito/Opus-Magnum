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
        if(task.completed){
            doneContainer.appendChild(card);
        }else{
            todoContainer.appendChild(card);
        }
    });
  }catch(error){
    console.error('Erro no kanban:', error);
  }
}

fetchKanbanTasks();