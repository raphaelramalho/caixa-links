# 🏠 Extensão "CAIXA – Copiar Link do Imóvel"

Extensão para Google Chrome que adiciona botões para **copiar o link direto do imóvel** no portal de imóveis da [CAIXA Econômica Federal](https://venda-imoveis.caixa.gov.br).

- Na **listagem de imóveis**, adiciona o link “Copiar link” ao lado de **“Detalhes do imóvel”**.
- Na **página de detalhes**, adiciona **apenas o ícone de hiperlink** ao lado do **título do imóvel**.
- Ao clicar, o link direto do imóvel é copiado automaticamente para a área de transferência, no formato:

```
https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=<ID>
```

---

## 📦 Estrutura do projeto

```
caixa-copy-link/
├── manifest.json        # Manifesto da extensão (MV3)
├── content.js           # Script principal injetado nas páginas
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
   git clone https://github.com/seuusuario/caixa-copy-link.git
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

7. Veja os novos botões:
   - Na listagem: “**Copiar link**” ao lado de “Detalhes do imóvel”.
   - No detalhe: ícone 🔗 ao lado do título.

---

## 🧠 Como funciona

- O script localiza os elementos com `onclick="detalhe_imovel(ID)"` para obter o ID do imóvel.
- Gera automaticamente a URL direta de detalhes.
- Copia o link para o **clipboard** usando a API `navigator.clipboard`.
- Usa `MutationObserver` para manter a injeção ativa mesmo com paginação ou carregamento dinâmico.

---

## 🧩 Permissões utilizadas

| Permissão | Motivo |
|------------|--------|
| `clipboardWrite` | Necessária para copiar o link direto para o clipboard. |
| `host_permissions` (`https://venda-imoveis.caixa.gov.br/*`) | Garante a execução apenas no domínio da CAIXA. |

A extensão **não coleta, armazena ou transmite dados pessoais**.

---

## 🧑‍💻 Desenvolvimento

- Durante o desenvolvimento, é possível alterar `content.js` e `styles.css` e **recarregar a extensão** no `chrome://extensions/` (ícone de recarregar 🔁).
- Use `console.log` dentro do `content.js` para depurar.
- Sempre incremente o campo `"version"` no `manifest.json` antes de enviar uma nova versão.

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

Após aprovado, a extensão estará disponível publicamente na loja.

---

## 📄 Política de Privacidade

Esta extensão é um utilitário de código aberto que não coleta, armazena nem compartilha dados pessoais.  
Nenhuma informação é enviada a servidores externos. Toda a execução ocorre localmente no navegador do usuário.

**Dados manipulados:**
- O único dado processado é o *ID do imóvel*, presente no próprio site da CAIXA, usado apenas para montar a URL de acesso direto.

**Declaração para o Chrome Web Store (Data Disclosure):**
> Esta extensão não coleta nem transmite dados pessoais. Todos os dados tratados permanecem localmente no navegador do usuário e são descartados imediatamente após o uso.

---

## 📸 Exemplos visuais

| Local | Exemplo |
|:------|:--------|
| Listagem | Botão “Copiar link” ao lado de “Detalhes do imóvel” |
| Detalhe | Ícone 🔗 ao lado do título do imóvel |

*(adicione aqui prints da extensão em funcionamento)*

---

## 🧾 Licença

Distribuído sob a licença **MIT**.  
Você pode usar, modificar e redistribuir livremente, desde que mantenha os créditos originais.

---

## ✉️ Suporte

Em caso de dúvidas, sugestões ou bugs, abra uma **issue** ou envie um e-mail para  
📧 `seuemail@exemplo.com`

---

### ❤️ Feito para facilitar o dia a dia de quem acompanha leilões e imóveis da CAIXA.
