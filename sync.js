const BIN_ID = "6a541343da38895dfe54002e";
const API_KEY = "$2a$10$xx.ZhcaKOoj009xsukO5.eusXb2ArLeDIbX32Qotrl4yrcJ4L/YO6";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

async function getCloudData() {
  try {
    const res = await fetch(API_URL, { headers: { "X-Master-Key": API_KEY } });
    const data = await res.json();
    return data.record;
  } catch(e) { console.error("Error leyendo nube", e); return {AR:[], INT:[]} }
}

async function setCloudData(data) {
  try {
    await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
      body: JSON.stringify(data)
    });
  } catch(e) { console.error("Error guardando en nube", e); }
}

// CADA 3 SEG TRAE DE LA NUBE
setInterval(async () => {
  const data = await getCloudData();
  localStorage.setItem('marketProductsAR', JSON.stringify(data.AR));
  localStorage.setItem('marketProductsINT', JSON.stringify(data.INT));
  
  if(typeof loadData === 'function') loadData();
  if(typeof loadStore === 'function') loadStore();
  if(typeof renderProductsINT === 'function') renderProductsINT();
  if(typeof renderProductsAR === 'function') renderProductsAR();
}, 3000);

// FIX CELU
const style = document.createElement('style');
style.innerHTML = `@media(max-width: 768px) {.btn, .btn-small, .nav-btn { min-height: 44px !important; font-size: 16px !important; } input, select { font-size: 16px !important; }}`;
document.head.appendChild(style);
