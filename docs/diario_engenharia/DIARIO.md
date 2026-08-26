# Diário de Engenharia - Opus-Magnum

## 🌟 O Conceito: O que significa Opus-Magnum?
**Opus-Magnum** (do latim *A Grande Obra*) é o termo alquímico clássico que representa o processo de transmutação e a busca pela perfeição máxima na criação da Pedra Filosofal. Na nossa jornada de engenharia de software e desenvolvimento, ele simboliza o projeto de vida e a obra-prima que consolida todo o nosso conhecimento técnico, arquitetura de sistemas e paixão por código de baixo nível.

---

## 🛠️ Padrão de Commits Oficiais do Projeto
Para manter nosso histórico cirúrgico e organizado, seguiremos esta convenção:
* `feat:` Nova funcionalidade ou módulo implementado.
* `fix:` Correção de bugs ou falhas de sistema.
* `docs:` Atualizações exclusivas de documentação e diário.
* `refactor:` Refatoração de código sem alterar o comportamento externo.
* `chore:` Ajustes de infraestrutura, arquivos de configuração ou rotinas.

---

## 📅 Linha do Tempo & Marcos

### [2026-08-25] - Inicialização do Ecossistema e Estrutura Base
* **Marco:** Criação do monorepo *Opus-Magnum* e configuração inicial do ambiente de desenvolvimento via Codespaces no tablet.
* **Ações Realizadas:**
  - Estruturação dos diretórios (`backend-php`, `backend-python`, `frontend`, `infra`, `scripts-bash`, `docs`).
  - Resolução definitiva do fluxo de autenticação e tokens do Git com o auxílio do atalho de terminal.
  - Publicação da branch `feature/estrutura-inicial` e consolidação da tag de versionamento **`v0.1.0-alpha`**.
  - Abertura oficial do *Diário de Engenharia*.

---

### [2026-08-25] - Padronização Oficial de Commits, Tags e Merges

* **Marco:** Definição da padronização oficial de commits, tags e estratégia de merge do projeto **Opus-Magnum**, alinhada com práticas usadas por Google, Microsoft, Amazon, Meta e projetos open-source de referência (Angular, Django, Kubernetes).
* **Padrão Adotado:** 
  - **Conventional Commits**
  - **Semantic Versioning (SemVer)**

---

## 📐 Padronização de Commits, Tags e Merges (Opus-Magnum)

Adotamos o padrão **Conventional Commits** + **Semantic Versioning**, o mesmo usado por Google, Microsoft, Angular, Django e a maioria das empresas de tecnologia de alto nível.
Referência oficial: [Conventional Commits](https://www.conventionalcommits.org/)

### 1. Formato de Commit
**Types permitidos:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

```text
<type>(<scope opcional>): <descrição no imperativo>

[corpo opcional - explique o porquê]

[rodapé opcional]


2. Regras Gerais
Commits no imperativo e com no máximo 72 caracteres na primeira linha.

Preferimos Squash Merge em Pull Requests.

Toda release gera uma tag anotada.

3. Exemplos Práticos de Commits
Exemplo de feat:

feat(auth): adiciona autenticação com JWT

Implementa login, refresh token e middleware de proteção de rotas.
Usa a biblioteca firebase/php-jwt.

Closes #15


Exemplo de fix:

Bash
fix(api): corrige erro 500 ao criar usuário com email duplicado

A validação de unique não estava sendo aplicada corretamente no FormRequest.

Fixes #28
Exemplo de docs e refactor:

Bash
docs: adiciona padronização de commits e tags no diário de engenharia

refactor(backend-php)!: separa camada de domínio da infraestrutura

BREAKING CHANGE: a estrutura de pastas do backend-php mudou.
Agora seguimos Clean Architecture.
Exemplos Curtos:

Bash
chore: adiciona .gitkeep nas pastas vazias do monorepo
test(frontend): cobre componente de login com testes unitários
ci: configura GitHub Actions para rodar testes em todo PR
perf(query): adiciona índice composto em orders(user_id, created_at)
🏷️ Padrão de Tags de Versionamento (SemVer)
Seguimos Semantic Versioning no formato: vMAJOR.MINOR.PATCH

Versão	Quando Usar	Exemplo
Major (X.0.0)	Breaking changes (mudanças incompatíveis)	v2.0.0
Minor (0.X.0)	Nova funcionalidade (retrocompatível)	v1.2.0
Patch (0.0.X)	Correção de bug (retrocompatível)	v1.1.3
Exemplos de Criação de Tags:
Bash
# Versão inicial
git tag -a v0.1.0 -m "v0.1.0: estrutura base do monorepo Opus-Magnum"

# Nova feature
git tag -a v0.2.0 -m "v0.2.0: autenticação JWT + diário de engenharia"

# Correção de bug
git tag -a v0.2.1 -m "v0.2.1: corrige validação de email duplicado"

# Breaking change / Versão estável
git tag -a v1.0.0 -m "v1.0.0: primeira versão estável com Clean Architecture"

# Pré-release (Beta / Alpha)
git tag -a v1.1.0-alpha.1 -m "v1.1.0-alpha.1: testes da nova API de pagamentos"

# Enviar tags para o remoto
git push origin --tags
🌿 Padrão e Fluxo de Branches
Branch	Nome Padrão	Exemplo
Main	main	Código em produção
Develop	develop	Integração de features
Feature	feature/nome-da-feature	feature/login-social
Bugfix	bugfix/descricao-bug	bugfix/email-invalido
Hotfix	hotfix/descricao-urgente	hotfix/falha-no-login
Release	release/vX.X.X	release/v1.2.0
Fluxo de Trabalho com Branches:
Bash
# Criar feature a partir da develop
git checkout -b feature/nova-funcionalidade develop

# Trabalhar e comitar...
git add .
git commit -m "feat: descrição da funcionalidade"
git push origin feature/nova-funcionalidade

# Após aprovação do PR na develop:
git checkout develop
git merge --no-ff feature/nova-funcionalidade
git push origin develop
🔀 Padrão de Merge
Bash
# Merge com --no-ff (mantém histórico detalhado)
git merge --no-ff feature/nova-feature -m "merge: integra feature/nova-feature para develop

- Adiciona autenticação OAuth2
- Resolve conflitos com develop

Reviewed-by: @cristianobrito"

# Merge com squash (para features pequenas e limpas)
git merge --squash feature/pequena-feature
git commit -m "feat: implementa pequena-feature

Closes #123"
📋 Exemplos de Títulos de Pull Request
feat(auth): adiciona autenticação com JWT

fix(api): corrige erro ao criar usuário com email duplicado

docs: padroniza commits e tags segundo Conventional Commits

refactor(backend-php)!: migra para Clean Architecture

🚀 Comandos Práticos para o seu Dia a Dia
Como commitar um arquivo simples:
Bash
git add .
git status
git commit -v -m "comente seu commit"
git push origin main


Comandos Rápidos por Categoria:
1. Feature:

Bash
git checkout -b feature/nome feature/estrutura-inicial
git add .
git commit -m "feat(escopo): descrição"
git push origin feature/nome
2. Hotfix:

Bash
git checkout -b hotfix/descricao main
git add .
git commit -m "fix(escopo): descrição do problema"
git push origin hotfix/descricao
3. Release:

```Bash
git checkout -b release/v1.0.0 develop
git commit -m "chore(release): prepara v1.0.0"
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin --tags
```



### uso do terminal
- para colar ctrl + shift + v


## CONSIDERAÇÕES FRONT END
- Na criaçao de classes e ids nao precisamos usar os nomes
  das chaves do objeto

- git add ../../ 
  
  eu estava na pasta vanilla-spa então usei esse
  comando para adicionar ao estages todos os arquivos
  no caso era o diario.md

- para mandar imediatamente para o repositorio
  
  git push --set-upstream origin feat/opus-dashboard-crm-kanban


### lembrar de entrar na branch correta para ver as atualizaçoes

- const response = await fetch(`${API_URL}/users`);
  - /users é a rota o endpoint


## RESOLVENDO PROBLEMAS DO TABLET
- No tablet o navegador nao tem f12 para mostrar ferramentas do deenvolvedor
  para isso adicionei no dentro da tag head logo no inicio da tag arquivo index.html

  ```html  
    <!-- Console Eruda para mobile / tablet -->
    <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
    <script>eruda.init();</script>
  ```

- isso serve para criar um console para visualizar no navegador do tablet
