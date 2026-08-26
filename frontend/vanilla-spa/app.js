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