// SYNC.JS V2 - FUERZA ACTUALIZACION CADA 3 SEG
(function() {
  console.log('MARKET SYNC V2 CARGADO');

  // ACTUALIZAR CADA 3 SEG SIEMPRE - INCLUSO EN 2DO PLANO
  setInterval(() => {
    if(typeof loadData === 'function') loadData(); // admin y panel
    if(typeof loadStore === 'function') loadStore(); // store
    if(typeof renderProductsINT === 'function') renderProductsINT(); // index
    if(typeof renderProductsAR === 'function') renderProductsAR(); // index
  }, 3000);

  // FORZAR RECARGA AL HACER FOCUS - ARREGLA LOCALSTORAGE EN CELU
  window.addEventListener('focus', () => {
    location.reload();
  });

  // FIX BOTONES PEQUEÑOS EN CELU
  const style = document.createElement('style');
  style.innerHTML = `
    @media(max-width: 768px) {
      .btn, .btn-small, .nav-btn { min-height: 44px !important; font-size: 16px !important; }
      .prod-row { grid-template-columns: 50px 1fr 80px !important; min-width: 100% !important; }
      input, select, textarea { font-size: 16px !important; }
    }
  `;
  document.head.appendChild(style);

})();
