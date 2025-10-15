(function(){
  var baseUrl = "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=";
  function openNew(id){ var u = baseUrl + id; window.open(u, "_blank", "noopener"); }
  try { Object.defineProperty(window, "detalhe_imovel", { configurable: true, writable: true }); } catch(e){}
  var original = window.detalhe_imovel;
  window.detalhe_imovel = function(id){ openNew(String(id).replace(/\D/g,"")); };
  document.addEventListener("click", function(ev){
    var a = ev.target && ev.target.closest ? ev.target.closest("a[onclick*='detalhe_imovel(']") : null;
    if(!a) return;
    var m = (a.getAttribute("onclick")||"").match(/detalhe_imovel\((\d+)\)/);
    if(!m) return;
    ev.preventDefault();
    openNew(m[1]);
  }, true);
})();