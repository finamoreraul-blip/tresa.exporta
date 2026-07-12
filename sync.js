// SYNC.JS V4 - ANTI CACHE + AUTO ACTUALIZAR
(function() {
  console.log('MARKET SYNC V4', new Date().toLocaleTimeString());
  let lastUpdate = localStorage.getItem('marketLastUpdate') || 0;

  // Revisa cada 2 seg si hay productos nuevos
  setInterval(() => {
    const newUpdate = localStorage.getItem('marketLastUpdate') || 0;
    if(newUpdate > lastUpdate) {
      console.log('NUEVOS PRODUCTOS! Recargando...');
      lastUpdate = newUpdate;
      location.reload(true);
    }
  }, 2000);

  // Fix botones y zoom en celu
  const style = document.createElement('style');
  style.innerHTML = `@media(max-width: 768px) {.btn, .btn-small, .nav-btn { min-height: 44px !important; font-size: 16px !important; } input, select { font-size: 16px !important; }}`;
  document.head.appendChild(style);
})();
