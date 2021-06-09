import PedidoRepository from "../repositories/pedido.repository.js";

async function criarPedido(pedido) {
  try {
    let dataPed = {
      entregue: false,
      timestamp: new Date(),
    };

    const data = await PedidoRepository.getPedidos();
    // console.log(data.pedido);
    let codigo = data.nextId;
    data.pedidos.push({
      id: data.nextId++,
      ...pedido,
      ...dataPed,
    });
    // console.log(data);
    const dados = await PedidoRepository.addPedido(data);
    let ped = dados.pedidos.find((e) => e.id == codigo);
    delete ped.entregue;
    delete ped.timestamp;
    // console.log(dados);
    return ped;
  } catch (err) {
    console.log(err);
  }
}

async function alteraPedido(pedido) {
  try {
    const data = await PedidoRepository.getPedidos();
    let selPed = data.pedidos.filter((e) => e.id == pedido.id);
    return selPed;
  } catch (err) {
    console.log(err);
  }
}

async function verificaProduto(pr) {
  try {
    const data = await PedidoRepository.getPedidos();
    let produto = data.pedidos.filter((e) => e.produto == pr);
    // console.log(produto.length);
    return produto;
  } catch (err) {
    console.log(err);
  }
}

async function totalCliente(cliente) {
  try {
    const data = await PedidoRepository.getPedidos();
    let valCliente = data.pedidos
      .filter((e) => e.cliente === cliente && e.entregue)
      .map((i) => i.valor);
    var totCli = valCliente.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    // console.log(valCliente);
    return totCli;
  } catch (err) {
    console.log(err);
  }
}

async function totalProduto(produto) {
  try {
    const data = await PedidoRepository.getPedidos();
    let valProduto = data.pedidos
      .filter((e) => e.produto === produto && e.entregue)
      .map((i) => i.valor);
    var totPro = valProduto.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    // console.log(valCliente);
    return totPro;
  } catch (err) {
    console.log(err);
  }
}

async function MaisPedidos() {
  try {
    const data = await PedidoRepository.getPedidos();
    const maisPed = [];
    var atual = "";
    var qtde = 1;
    let valProduto = data.pedidos
      .sort((a, b) => {
        if (a.produto < b.produto) {
          return -1;
        }
        if (a.produto > b.produto) {
          return 1;
        }
        return 0;
      })
      .reduce((_arr, e) => {
        // console.log(e);
        if (atual !== e.produto) {
          maisPed.push({
            produto: e.produto,
            qtde: qtde,
          });          
        } else {
          let x = maisPed.findIndex((i) => i.produto === atual);
          // console.log(x);
          maisPed[x].qtde++;
        }
        atual = e.produto;
        return maisPed;
      })
      .sort((x, y) => {
        if (x.qtde < y.qtde) {
          return 1;
        }
        if (x.qtde > y.qtde) {
          return -1;
        }
        return 0;
      });
    return valProduto;
  } catch (err) {
    console.log(err);
  }
}

export default {
  criarPedido,
  alteraPedido,
  verificaProduto,
  totalCliente,
  totalProduto,
  MaisPedidos,
};
