// Simulacion de datos de DB
const data = [
    {
        name: "Teclado Midi - Arturia Micro Freak",
        price: 250,
        id: 1,
    },
    {
        name: "Auriculares AKG240",
        price: 210,
        id: 2,
    },
    {
        name: "Monitores KRK",
        price: 457,
        id: 3,
    },
    {
        name: "Microfono Hyperx",
        price: 89,
        id: 4,
    },
    {
        name: "Placa de sonido Focus Ride Scarlett",
        price: 140,
        id: 5,
    },
    {
        name: "Korg Ms20 Mini Sintetizador Analógico",
        price: 590,
        id: 6,
    },
]


const find = () => {
    return data
}

const create = (dato) => {
    data.push(dato)
}

const deleteDato = (id) => {
    // se elimna del array el elemeto
}


export default {
    find,
    create,
    deleteDato
}