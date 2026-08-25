# Diario engenharia - Opus-Magnum 

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


## PARONIZAÇAO DE COMMITS
## Padronização de Commits, Tags e Merges (Opus-Magnum)

Adotamos o padrão **Conventional Commits** + **Semantic Versioning**, o mesmo usado por Google, Microsoft, Angular, Django e a maioria das empresas de tecnologia de alto nível.

### Formato de Commit

**Types permitidos:** feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

### Tags
Seguimos Semantic Versioning: `vMAJOR.MINOR.PATCH`

Exemplo: `v0.1.0`, `v1.2.3`, `v2.0.0-beta.1`

### Regras
- Commits no imperativo e com no máximo 72 caracteres na primeira linha
- Preferimos Squash Merge em Pull Requests
- Toda release gera uma tag anotada

Referência oficial: https://www.conventionalcommits.org/

### exemplos
feat(auth): adiciona autenticação com JWT

Implementa login, refresh token e middleware de proteção de rotas.
Usa a biblioteca firebase/php-jwt.

Closes #15

fix(api): corrige erro 500 ao criar usuário com email duplicado

A validação de unique não estava sendo aplicada corretamente no FormRequest.

Fixes #28

docs: adiciona padronização de commits e tags no diário de engenharia

refactor(backend-php)!: separa camada de domínio da infraestrutura

BREAKING CHANGE: a estrutura de pastas do backend-php mudou.
Agora seguimos Clean Architecture.

refactor(backend-php)!: separa camada de domínio da infraestrutura

BREAKING CHANGE: a estrutura de pastas do backend-php mudou.
Agora seguimos Clean Architecture.

chore: adiciona .gitkeep nas pastas vazias do monorepo

test(frontend): cobre componente de login com testes unitários

ci: configura GitHub Actions para rodar testes em todo PR

perf(query): adiciona índice composto em orders(user_id, created_at)

### exemplos de tags
# Versão inicial
git tag -a v0.1.0 -m "v0.1.0: estrutura base do monorepo Opus-Magnum"

# Nova feature
git tag -a v0.2.0 -m "v0.2.0: autenticação JWT + diário de engenharia"

# Correção de bug
git tag -a v0.2.1 -m "v0.2.1: corrige validação de email duplicado"

# Breaking change
git tag -a v1.0.0 -m "v1.0.0: primeira versão estável com Clean Architecture"

# Pré-release
# Versão inicial
git tag -a v0.1.0 -m "v0.1.0: estrutura base do monorepo Opus-Magnum"

# Nova feature
git tag -a v0.2.0 -m "v0.2.0: autenticação JWT + diário de engenharia"

# Correção de bug
git tag -a v0.2.1 -m "v0.2.1: corrige validação de email duplicado"

# Breaking change
git tag -a v1.0.0 -m "v1.0.0: primeira versão estável com Clean Architecture"

# Pré-release
git tag -a v1.1.0-alpha.1 -m "v1.1.0-alpha.1: testes da nova API de pagamentos"

### exemplos de titulos do pull request
feat(auth): adiciona autenticação com JWT
fix(api): corrige erro ao criar usuário com email duplicado
docs: padroniza commits e tags segundo Conventional Commits
refactor(backend-php)!: migra para Clean Architecture

### exemplo de fluxo completo
# 1. Você edita o DIARIO.md
git add docs/diario_engenharia/DIARIO.md

# 2. Commit profissional
git commit -m "docs(diario): adiciona padronização de commits, tags e merges

Adota Conventional Commits + Semantic Versioning
como padrão oficial do projeto Opus-Magnum.
"

# 3. Push
git push origin main

# 4. Depois cria a tag da versão
git tag -a v0.1.1 -m "v0.1.1: padronização de commits e estrutura consolidada"
git push origin v0.1.1

### exemplo real do meu code
## [2026-08-25] - Padronização Oficial de Commits, Tags e Merges

### Marco
Definição da padronização oficial de commits, tags e estratégia de merge do projeto **Opus-Magnum**, alinhada com práticas usadas por Google, Microsoft, Amazon, Meta e projetos open-source de referência (Angular, Django, Kubernetes).

### Padrão Adotado
- **Conventional Commits**
- **Semantic Versioning (SemVer)**

### Formato de Commit
```text
<type>(<scope opcional>): <descrição no imperativo>

[corpo opcional - explique o porquê]

[rodapé opcional]

## uso

---

**Como usar:**

1. Abra o arquivo `docs/diario_engenharia/DIARIO.md`
2. Cole o bloco acima no final do arquivo (ou na seção de hoje)
3. Salve
4. Depois rode:

```bash
git add docs/diario_engenharia/DIARIO.md
git commit -m "docs(diario): adiciona padronização oficial de commits, tags e merges"
git push origin main

## exemplo 2
# Commit simples
git commit -m "feat(api): adiciona endpoint de criação de projetos"

# Commit com corpo
git commit -m "feat(auth): implementa autenticação 2FA

- Adiciona suporte a Google Authenticator
- Implementa backup codes
- Adiciona logs de tentativas de login

Closes #42"

# Breaking Change
git commit -m "feat(api): muda formato de resposta da API

BREAKING CHANGE: O campo 'user_id' agora é 'userId'
Migration necessária para versão 2.0"

## padrao de branchs
Branch	Nome	Exemplo
Main	main	Código em produção
Develop	develop	Integração de features
Feature	feature/nome-da-feature	feature/login-social
Bugfix	bugfix/descricao-bug	bugfix/email-invalido
Hotfix	hotfix/descricao-urgente	hotfix/falha-no-login
Release	release/vX.X.X	release/v1.2.0

### fluxo de branchs
# Criar feature
git checkout -b feature/nova-funcionalidade develop
# Trabalhar...
git add .
git commit -m "feat: descrição da funcionalidade"
git push origin feature/nova-funcionalidade

# Criar PR para develop
# Após aprovação:
git checkout develop
git merge --no-ff feature/nova-funcionalidade
git push origin develop

## padrao de tags de versionamento
v[major].[minor].[patch]

Versão	Quando usar	Exemplo
Major (X.0.0)	Breaking changes	v2.0.0
Minor (0.X.0)	Nova funcionalidade (backwards compatible)	v1.2.0
Patch (0.0.X)	Bug fix (backwards compatible)	v1.1.3

### criando tags
# Tag com anotação
git tag -a v1.0.0 -m "Release: versão 1.0.0 - Autenticação completa"

# Tag para pré-release
git tag -a v1.1.0-beta.1 -m "Beta release: testes de performance"

# Enviar tags para o remoto
git push origin --tags

### padrao de merge
# Merge com --no-ff (mantém histórico)
git merge --no-ff feature/nova-feature -m "merge: integra feature/nova-feature para develop

- Adiciona autenticação OAuth2
- Resolve conflitos com develop

Reviewed-by: @cristianobrito"

# Merge com squash (para features pequenas)
git merge --squash feature/pequena-feature
git commit -m "feat: implementa pequena-feature

Closes #123"

### template diario
# Diário de Engenharia - Opus Magnum

## 📌 Padrões de Commit e Tags

### Conventional Commits
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação de código
- **refactor**: Refatoração
- **perf**: Melhoria de performance
- **test**: Testes
- **build**: Sistema de build
- **ci**: Integração contínua
- **chore**: Tarefas de manutenção

### Exemplo de Commit
```bash
feat(auth): implementa login com Google OAuth

- Adiciona fluxo de autenticação OAuth2
- Implementa refresh tokens
- Adiciona logging de tentativas

Closes #42


---

### 7. **Comandos Rápidos para seu Dia a Dia**

```bash
# Feature
git checkout -b feature/nome feature/estrutura-inicial
git add .
git commit -m "feat(escopo): descrição"
git push origin feature/nome

# Hotfix
git checkout -b hotfix/descricao main
git add .
git commit -m "fix(escopo): descrição do problema"
git push origin hotfix/descricao

# Release
git checkout -b release/v1.0.0 develop
git commit -m "chore(release): prepara v1.0.0"
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin --tags


---
### Como commitar um arquivo
 ```bash 
  git add .
  git status
  git commit -v "comente seu commit"
  git push origin main
```