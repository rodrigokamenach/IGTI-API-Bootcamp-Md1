import PedidoService from "../services/pedidos.service.js";

async function criarPedido(req, res, next) {
    try {
        let pedido = req.body;
    if (!pedido.cliente || !pedido.produto || !pedido.valor) {
        throw new Error('Os campos cliente, produto e valor são obrigatórios!');
    }

    if (pedido.valor <= 0) {
        throw new Error('O valor não pode ser menor ou igual a zero!'); 
    }
    
    const pedidoNovo = await PedidoService.criarPedido(pedido);
    // console.log(pedidoNovo);
    res.send(pedidoNovo);
    } catch(err) {
        console.log(err);
    }
    
}

async function alteraPedido(req, res, next) {
    try {
        let pedido = req.body;
        // res.send(pedido);
        if (!pedido.id || !pedido.produto || !pedido.cliente || !pedido.valor) {
            throw new Error("É necessário informar o ID, Cliente, Produto e Valor!");
        }
        
        if (pedido.valor <= 0) {
            throw new Error('O valor não pode ser menor ou igual a zero!'); 
        }

        const verfPedido = await PedidoService.verificaProduto(pedido.produto);
        // console.log(altPedido.length);
        if (verfPedido.length <= 0) {
            throw new Error('O produto indicado não existe!'); 
        } else {
            const altPedido = await PedidoService.alteraPedido(pedido);
            res.send(altPedido);
        }      
        
    } catch(err) {
        console.log(err);
    }
}

async function totalCliente(req, res, next) {
    try {
        let cli = req.params.cli;
        // console.log(cli);
        const totcli = await PedidoService.totalCliente(cli);
        res.send(`O Valor total do cliente ${cli} é: ${parseFloat(totcli)}`);
    } catch(err) {
        console.log(err);
    }
}

async function totalProduto(req, res, next) {
    try {
        let pro = req.params.pro;
        // console.log(cli);
        const totpro = await PedidoService.totalProduto(pro);
        res.send(`O Valor total do produto ${pro} é: ${parseFloat(totpro)}`);
    } catch(err) {
        console.log(err);
    }
}

async function MaisPedidos(req, res, next) {
    try {        
        // console.log(cli);
        const mPed = await PedidoService.MaisPedidos();
        res.send(mPed);
    } catch(err) {
        console.log(err);
    }
}

export default {
    criarPedido,
    alteraPedido,
    totalCliente,
    totalProduto,
    MaisPedidos
}