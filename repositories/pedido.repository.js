import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

async function getPedidos() {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        return data;
    } catch(err) {
        console.log(err);
    }
    
}

async function addPedido(pedido) {
    try {
        await writeFile(global.fileName, JSON.stringify(pedido, null, 2));
        return pedido;
    } catch(err) {
        console.log(err);
    }
    
}

export default {
    getPedidos,
    addPedido
}