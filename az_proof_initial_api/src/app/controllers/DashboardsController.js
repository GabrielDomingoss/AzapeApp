import Order from "../models/Order";

class DashboardsController {
    async getDashboard(req, res) {
        try {
            const token = req.headers.authorization;

            if(!token) {
                return res.status(401).json({error: "Token inválido"});
            }

            let {dataInicio, dataFim, page=1, limit=10 } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);
            const filtro = {};

            if(dataInicio && dataFim) {
                filtro.dataCriacao = {
                    $gte: new Date(dataInicio), 
                    $lte: new Date(dataFim)
                };
            }

            const totalPedidos = await Order.countDocuments(filtro);
            const pedidos = await Order.find(filtro)
                .select("_id status customer seller payment createdAt updatedAt")
                .skip((page - 1) * limit)
                .limit(limit);

            const statusMap = {
                "Concluído": "paid",
                "Cancelado": "canceled",
                "Em Andamento": "in_progress",
                "Pendente": "pending"
            };

            const pedidosConcluidos = pedidos.filter(pedido => pedido.status === "paid");
            const totalVendas = pedidosConcluidos.length;
            const totalValorPedidos = pedidos.reduce((acc, pedido) => acc + (pedido.payment?.amount || 0), 0);
            const totalValorVendas = pedidosConcluidos.reduce((acc, pedido) => acc + (pedido.payment?.amount || 0), 0);
            const ticketMedio = totalVendas > 0 ? totalValorVendas / totalVendas : 0;

            res.json({
                orders_total: totalValorPedidos,
                orders_count: totalPedidos,
                sales_total: totalValorVendas,
                sales_count: totalVendas,
                average_ticket: ticketMedio,
                orders: pedidos.map(pedido => ({
                    id: pedido._id,
                    seller_id: pedido.seller?.id || 'N/A',
                    customer: pedido.customer,
                    payment: pedido.payment,
                    status: statusMap[pedido.status] || pedido.status || "unknown",
                    createdAt: pedido.createdAt,
                })),
                total_pages: Math.ceil(totalPedidos / limit),
                page: parseInt(page),
                limit: parseInt(limit)
            });
        }
        catch (error) {
            res.status(500).json({error: 'Erro ao buscar dados do dashboard'});
        }
    }
}
export default new DashboardsController();