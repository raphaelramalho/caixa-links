# 🏠 Extensão "CAIXA – Copiar Link do Imóvel"

Extensão para Google Chrome que adiciona botões para **copiar o link direto do imóvel** no portal de imóveis da [CAIXA Econômica Federal](https://venda-imoveis.caixa.gov.br).

- Na **listagem de imóveis**, adiciona o link “Copiar link” ao lado de **“Detalhes do imóvel”**.
- Na **página de detalhes**, adiciona **apenas o ícone de hiperlink** ao lado do **título do imóvel**.
- Ao clicar, o link direto do imóvel é copiado automaticamente para a área de transferência, no formato:

```
https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=<ID>
```
- A função `detalhe_imovel(<id>)` foi modificada para **abrir o imóvel em nova aba**, mantendo a listagem original aberta.

---

## 📦 Estrutura do projeto

```
caixa-copy-link/
├── manifest.json        # Manifesto da extensão (MV3)
├── content.js           # Script principal injetado nas páginas
├── injected.js          # Script injetado que redefine detalhe_imovel()
├── styles.css           # Estilos da extensão
└── README.md            # Este arquivo
```

---

## ⚙️ Requisitos

- **Google Chrome 88+** (ou outro navegador compatível com Manifest V3)
- Permissão para acessar o domínio `https://venda-imoveis.caixa.gov.br/*`

---

## 💻 Instalação local (modo desenvolvedor)

1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/raphaelramalho/caixa-links.git
   ```
   ou simplesmente **baixe como ZIP** e extraia a pasta.

2. Abra o Chrome e vá até:
   ```
   chrome://extensions/
   ```

3. Ative o **Modo do desenvolvedor** (canto superior direito).

4. Clique em **Carregar sem compactar** e selecione a pasta do projeto (`caixa-copy-link/`).

5. A extensão será carregada e ficará disponível no navegador.

6. Acesse o site da CAIXA Imóveis:
   [https://venda-imoveis.caixa.gov.br/sistema/busca-imovel.asp](https://venda-imoveis.caixa.gov.br/sistema/busca-imovel.asp)

7. Veja os novos botões e comportamentos:
   - Na listagem: “**Copiar link**” ao lado de “Detalhes do imóvel”.
   - No detalhe: ícone 🔗 ao lado do título.
   - O clique em “Detalhes do imóvel” agora **abre em nova aba**.

---

## 🧠 Como funciona

- O script localiza elementos com `onclick="detalhe_imovel(ID)"` e obtém o ID do imóvel.
- Gera automaticamente a URL direta.
- Copia o link para o **clipboard** com `navigator.clipboard.writeText()` ou, em fallback, `execCommand('copy')`.
- Substitui o comportamento padrão da função `detalhe_imovel(<id>)`, removendo o `submit` e abrindo a página de detalhes em **nova aba**.
- Usa `MutationObserver` para reinjetar elementos quando há paginação ou carregamento dinâmico.

---

## 🧩 Permissões utilizadas

| Permissão | Motivo |
|------------|--------|
| `clipboardWrite` | Necessária para copiar o link direto para o clipboard. |
| `host_permissions` (`https://venda-imoveis.caixa.gov.br/*`) | Garante a execução apenas no domínio da CAIXA. |

A extensão **não coleta, armazena nem transmite dados pessoais**.

---

## 🧑‍💻 Desenvolvimento

- Durante o desenvolvimento, altere `content.js`, `injected.js` ou `styles.css` e **recarregue a extensão** em `chrome://extensions/` (ícone de recarregar 🔁).
- Use `console.log` no `content.js` para depurar.
- Sempre incremente o campo `"version"` no `manifest.json` antes de enviar nova versão.

---

## 🚀 Publicação no Chrome Web Store

1. Compacte os arquivos em `.zip` (sem a pasta pai).  
2. Acesse [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/).  
3. Clique em **Adicionar novo item** e envie o pacote.  
4. Preencha:
   - Nome, descrição e categoria.
   - Capturas de tela (mínimo 1).
   - Ícone 128×128.
   - Política de privacidade (caso necessário).
5. Escolha **Distribuição pública** e envie para revisão.

Após aprovado, a extensão ficará disponível publicamente.

---

## 📄 Política de Privacidade

Esta extensão é um utilitário de código aberto que **não coleta, armazena nem compartilha dados pessoais**.  
Toda a execução ocorre localmente no navegador do usuário.

**Dados manipulados:**
- O único dado processado é o *ID do imóvel*, usado apenas para montar a URL de acesso direto.  
- Nenhuma informação é transmitida ou armazenada.

**Declaração para o Chrome Web Store (Data Disclosure):**
> Esta extensão não coleta nem transmite dados pessoais. Todos os dados tratados permanecem localmente no navegador do usuário e são descartados imediatamente após o uso.

---

## 📸 Exemplos visuais

| Local | Exemplo |
|:------|:--------|
| Listagem | Botão “Copiar link” ao lado de “Detalhes do imóvel” |
| Detalhe | Ícone 🔗 ao lado do título do imóvel |
| Novo comportamento | “Detalhes do imóvel” abre em nova aba |

---

## 🧾 Licença

Distribuído sob a licença **MIT**.  
Você pode usar, modificar e redistribuir livremente, desde que mantenha os créditos originais.

---

## ✉️ Suporte

Em caso de dúvidas, sugestões ou bugs, abra uma **issue** ou envie um e-mail para  
📧 `contato@clicksky.com.br`

---

### ❤️ Feito para facilitar o dia a dia de quem acompanha leilões e imóveis da CAIXA.
