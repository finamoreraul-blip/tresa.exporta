// SYNC.JS - FIX PARA CELULAR Y TIEMPO REAL
(function() {
  console.log('MARKET SYNC CARGADO');

  // 1. ACTUALIZAR AL VOLVER A LA PESTAÑA EN CELU
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log('Volvio a la pestaña - Recargando datos');
      setTimeout(() => {
        if(typeof loadData === 'function') loadData(); // admin y panel
        if(typeof loadStore === 'function') loadStore(); // store
        if(typeof renderProductsINT === 'function') renderProductsINT(); // index
        if(typeof renderProductsAR === 'function') renderProductsAR(); // index
      }, 200);
    }
  });

  // 2. FORZAR RECARGA AL HACER FOCUS - ARREGLA LOCALSTORAGE EN CELU
  let lastFocus = Date.now();
  window.addEventListener('focus', () => {
    if(Date.now() - lastFocus > 3000) { // solo si pasaron 3 seg
      location.reload();
    }
    lastFocus = Date.now();
  });

  // 3. FIX BOTONES PEQUEÑOS EN CELU - INYECTAR CSS
  const style = document.createElement('style');
  style.innerHTML = `
    @media(max-width: 768px) {
      .btn, .btn-small, .nav-btn { min-height: 44px !important; font-size: 16px !important; }
      .prod-row { grid-template-columns: 50px 1fr 80px !important; min-width: 100% !important; }
      input, select, textarea { font-size: 16px !important; } /* Evita zoom de iPhone */
    }
  `;
  document.head.appendChild(style);

})();
