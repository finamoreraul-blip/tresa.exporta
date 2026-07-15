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
        return data.record; // { AR: [...], INT: [...], USERS: [...] }
    } catch(e) {
        console.error("Error bajando de la nube:", e);
        return { AR: [], INT: [], USERS: [] };
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

// FUNCIONES PARA VENDEDORES
async function getVendedores() {
    const data = await getCloudData();
    return data.USERS || [];
}

async function setVendedores(users) {
    const data = await getCloudData();
    data.USERS = users;
    await setCloudData(data);
}

// FUNCION PARA MIGRAR 1 SOLA VEZ
function migrarALaNube() {
    const dataAR = JSON.parse(localStorage.getItem('marketProductsAR')) || [];
    const dataINT = JSON.parse(localStorage.getItem('marketProductsINT')) || [];
    const dataUSERS = JSON.parse(localStorage.getItem('marketUsers')) || [];
    
    if(dataAR.length === 0 && dataINT.length === 0 && dataUSERS.length === 0) {
        alert("No hay datos en localStorage para migrar");
        return;
    }

    setCloudData({ AR: dataAR, INT: dataINT, USERS: dataUSERS }).then(() => {
        alert(`Datos migrados a la nube!\nARS: ${dataAR.length}\nUSD: ${dataINT.length}\nVendedores: ${dataUSERS.length}`);
    });
}
