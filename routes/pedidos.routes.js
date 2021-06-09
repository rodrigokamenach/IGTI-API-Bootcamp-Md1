import express from "express";
import PedidoControler from "../controlers/pedido.controler.js";


const router = express.Router();

router.get('/', (_req, res) => {
    res.send('teste rota');
});

router.post('/criarPedido', PedidoControler.criarPedido);
router.put('/atualizaPedido', PedidoControler.alteraPedido);
router.get('/totalCliente/:cli', PedidoControler.totalCliente);
router.get('/totalProduto/:pro', PedidoControler.totalProduto);
router.get('/maisPedidos', PedidoControler.MaisPedidos);

export default router;