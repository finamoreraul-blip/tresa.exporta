const BIN_ID = '6a541343da38895dfe54002e'; 
const API_KEY = '$2a$10$xx.ZhcaKOoj009xsukO5.eusXb2ArLeDIbX32Qotrl4yrcJ4L/YO6';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// BAJAR DATOS DE LA NUBE
async function getCloudData() {
    try {
        const res = await fetch(`${BIN_URL}/latest`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const data = await res.json();
        return data.record; // { AR: [...], INT: [...] }
    } catch(e) {
        console.error("Error bajando de la nube:", e);
        return null;
    }
}

// SUBIR DATOS A LA NUBE
async function setCloudData(data) {
    try {
        await fetch(BIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(data)
        });
        console.log("Datos subidos a la nube ✓");
    } catch(e) {
        console.error("Error subiendo a la nube:", e);
    }
}

// FUNCION PARA MIGRAR 1 SOLA VEZ
function migrarALaNube() {
    const dataAR = JSON.parse(localStorage.getItem('marketProductsAR')) || [];
    const dataINT = JSON.parse(localStorage.getItem('marketProductsINT')) || [];
    
    if(dataAR.length === 0 && dataINT.length === 0) {
        alert("No hay productos en localStorage para migrar");
        return;
    }

    setCloudData({ AR: dataAR, INT: dataINT }).then(() => {
        alert(`Productos migrados a la nube!\nARS: ${dataAR.length}\nUSD: ${dataINT.length}`);
    });
}
