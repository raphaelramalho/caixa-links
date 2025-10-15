const baseUrl = "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=";

function injectOverrideFile() {
  if (document.documentElement.dataset.caixaOverrideInjected) return;
  const s = document.createElement("script");
  s.src = chrome.runtime.getURL("injected.js");
  document.documentElement.appendChild(s);
  s.remove();
  document.documentElement.dataset.caixaOverrideInjected = "1";
}

function extractIdFromOnclick(value) {
  const m = String(value || "").match(/detalhe_imovel\((\d+)\)/);
  return m ? m[1] : null;
}

function isDetalhesAnchor(a) {
  const hasOnclick = /detalhe_imovel\(/.test(a.getAttribute("onclick") || "");
  const txt = (a.textContent || "").toLowerCase();
  return hasOnclick && txt.includes("detalhes do imóvel");
}

function makeCopyLink(id, variant) {
  const a = document.createElement("a");
  a.href = "#";
  a.className = "caixa-copy-link" + (variant === "title" ? " caixa-copy-link--title" : "");
  a.dataset.imovelId = id;
  a.setAttribute("aria-label", "Copiar link do imóvel");
  a.setAttribute("title", "Copiar link do imóvel");
  a.innerHTML = variant === "title" ? '<i class="fa fa-link"></i>' : '<i class="fa fa-link"></i>Copiar link';
  return a;
}

function injectAfterDetalhes(a) {
  const id = extractIdFromOnclick(a.getAttribute("onclick"));
  if (!id) return;
  if (a.parentElement && a.parentElement.querySelector(`.caixa-copy-link[data-imovel-id="${id}"]`)) return;
  const copyLink = makeCopyLink(id, "list");
  a.insertAdjacentElement("afterend", copyLink);
}

function scanList(context) {
  const root = context || document;
  const as = root.querySelectorAll("a[onclick*='detalhe_imovel(']");
  as.forEach(a => {
    if (isDetalhesAnchor(a)) injectAfterDetalhes(a);
  });
}

function getDetailId() {
  const hidden = document.querySelector("#hdnimovel");
  if (hidden && hidden.value) return hidden.value.trim();
  const usp = new URLSearchParams(location.search);
  const q = usp.get("hdnimovel");
  return q ? q.trim() : null;
}

function injectAtTitle() {
  const id = getDetailId();
  if (!id) return;
  const h5 = document.querySelector("#dadosImovel h5");
  if (!h5) return;
  if (h5.querySelector(`.caixa-copy-link[data-imovel-id="${id}"]`)) return;
  const link = makeCopyLink(id, "title");
  const firstInput = h5.querySelector("input");
  if (firstInput) firstInput.before(link); else h5.appendChild(link);
}

function copyNative(text) {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error("execCommand copy failed"));
    } catch (e) {
      document.body.removeChild(ta);
      reject(e);
    }
  });
}

function toast(msg) {
  let t = document.querySelector(".caixa-copy-toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "caixa-copy-toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.tid);
  toast.tid = setTimeout(() => t.classList.remove("show"), 1800);
}

document.addEventListener("click", async (e) => {
  const a = e.target.closest(".caixa-copy-link");
  if (!a) return;
  e.preventDefault();
  const id = a.dataset.imovelId;
  if (!id) return;
  const url = baseUrl + id;
  try {
    await copyNative(url);
    toast("Link copiado");
  } catch {
    toast("Falha ao copiar");
  }
});

const mo = new MutationObserver((muts) => {
  for (const m of muts) {
    if (m.type === "childList") {
      m.addedNodes.forEach(n => {
        if (n.nodeType === 1) {
          scanList(n);
          injectAtTitle();
        }
      });
    }
  }
});

injectOverrideFile();
scanList(document);
injectAtTitle();
mo.observe(document.documentElement || document.body, { childList: true, subtree: true });