# ✅ Minhas Tarefas — ToDo List

Aplicação web de lista de tarefas (**ToDo List**) com foco em simplicidade, persistência local e suporte offline. Desenvolvida como projeto de estudo.

---

## 🚀 Tecnologias Aplicadas

| Tecnologia | Finalidade |
|---|---|
| **HTML5** | Estrutura da aplicação |
| **CSS3** + **Bootstrap 5.3.8** | Estilização, layout responsivo e componentes (cards, botões, badges, listas) |
| **Bootstrap Icons 1.11.3** | Ícones (check, plus, trash, inbox, x) |
| **JavaScript (Vanilla ES6)** | Toda a lógica do sistema |
| **Web Storage API (`localStorage`)** | Persistência dos dados no navegador |
| **Service Worker** | Cache offline e suporte PWA |
| **Manifest JSON** | Permite instalar o app como PWA no celular/desktop |

---

## ⚙️ Como o Sistema Funciona

O usuário digita uma tarefa no campo de texto e clica em **"Adicionar"**. A tarefa aparece em uma lista ordenada. Cada tarefa pode ser:

- **Clicada** para marcá-la como concluída (riscado + cinza)
- **Removida individualmente** pelo botão "X" circular
- **Removida em massa** pelo botão "Limpar tudo"

Todas as tarefas são salvas automaticamente no `localStorage` do navegador. Ao recarregar a página, as tarefas persistem.

Quando não há tarefas, uma mensagem de estado vazio é exibida.

---

## 📁 Estrutura do Projeto

```
ToDo/
├── index.html        # Única página — contém HTML, CSS e JS
├── manifest.json     # Manifesto PWA
├── sw.js             # Service Worker para cache offline
├── script.js         # Arquivo vazio (não utilizado)
├── icons/
│   ├── icon-192.svg  # Ícone PWA 192x192
│   └── icon-512.svg  # Ícone PWA 512x512
└── README.md         # Este arquivo
```

---

## 🧠 Funções do Código

Toda a lógica está inline no `index.html`, dentro da tag `<script>`.

### `carregarTasks()`
Lê o `localStorage` pela chave `"tasks"` e retorna o array de tarefas salvo. Se não houver nada, retorna um array vazio `[]`.

### `salvarTasks()`
Pega o array global `tasksList`, converte para JSON com `JSON.stringify()` e salva no `localStorage` na chave `"tasks"`.

### `render()`
- Chama `salvarTasks()` para persistir o estado atual
- Limpa o `<ul>` da lista
- Se a lista estiver vazia: exibe o estado vazio e esconde o botão "Limpar tudo"
- Se houver tarefas: esconde o estado vazio e mostra o botão "Limpar tudo"
- Atualiza o badge com a quantidade total de tarefas
- Percorre o array `tasksList` e cria um `<li>` para cada tarefa com:
  - Um `<span>` com o texto (clicável para marcar como concluída)
  - Um botão "X" com `data-index` para identificar qual tarefa remover

### `addTask(event)`
- Previne o recarregamento da página no submit do formulário
- Esconde a mensagem de feedback
- Lê o valor do input e remove espaços extras
- Se estiver vazio: exibe feedback de erro e foca no input
- Se válido: adiciona ao array `tasksList`, limpa o input, foca novamente e chama `render()`

### `deleteTask(index)`
Remove um elemento do array `tasksList` na posição `index` usando `splice()`. Depois chama `render()`.

### `clearAll()`
Se a lista não estiver vazia, esvazia o array inteiro (`tasksList.length = 0`) e chama `render()`.

### Eventos
- **`form.addEventListener('submit', addTask)`** — Escuta o envio do formulário
- **`ul.addEventListener('click', ...)`** — Delegação de eventos na lista:
  - Se clicar no botão `.del-btn`: obtém o `data-index` e chama `deleteTask(index)`
  - Se clicar no texto `.task-text`: alterna as classes `text-decoration-line-through` e `text-muted` (risco + cor cinza)
- **`clearBtn.addEventListener('click', clearAll)`** — Limpa todas as tarefas

### Inicialização
- `render()` é chamado ao carregar a página para exibir tarefas salvas anteriormente
- Registra o Service Worker (`sw.js`) se o navegador suportar

---

## 🌐 PWA / Offline

O arquivo **`sw.js`** implementa um Service Worker com estratégia **Cache-First**:

1. **Install**: abre um cache chamado `minhas-tarefas-v1` e adiciona todos os assets (HTML, CSS, ícones, manifesto)
2. **Activate**: remove caches antigos e assume controle dos clientes
3. **Fetch**: intercepta requisições — se o recurso estiver em cache, serve do cache; senão, tenta buscar da rede; se falhar (offline), serve o `index.html` como fallback

O **`manifest.json`** permite que o app seja instalado na tela inicial com `display: standalone`, sem a barra de endereço do navegador.

---

## 🎨 Interface

- Gradiente de fundo azul (`#667eea`) para roxo (`#764ba2`)
- Card branco com bordas arredondadas e sombra
- Input com botão "Adicionar" estilizado com Bootstrap
- Badge com contagem de tarefas
- Botão "Limpar tudo" vermelho
- Ícones Bootstrap em toda a interface
- Rodapé com instrução: "Clique na tarefa para marcar como concluída"

---

## 🧪 Como Executar

Basta servir a pasta raiz com qualquer servidor HTTP estático:

```bash
# Com Python
python3 -m http.server 8000

# Com Node.js (npx serve)
npx serve .
```

Depois acesse `http://localhost:8000` no navegador.

---

## 📌 Observações

- O estado de **conclusão** (tarefa riscada) **não é persistido** — ao recarregar a página, todas voltam como não concluídas
- O arquivo `script.js` existe mas não é usado; toda a lógica está inline no HTML
- Interface em português brasileiro (pt-BR)
