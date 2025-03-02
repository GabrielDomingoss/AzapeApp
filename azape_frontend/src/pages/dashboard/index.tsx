import { Button, Card, CardContent, Grid, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import OrdersIcon from '../../assets/ordersIcon.png';
import SalesIcon from '../../assets/salesIcon.png';
import TicketsIcon from '../../assets/ticketsIcon.png';
import './styles.scss';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Orders } from '../../models/orders';
import dayjs from 'dayjs';
import ChevronsLeftIcon from '../../assets/chevronsLeftIcon.png';
import ChevronsRightIcon from '../../assets/chevronsRightIcon.png';
import ArrowLeftIcon from '../../assets/arrowLeftIcon.png';
import ArrowRightIcon from '../../assets/arrowRightIcon.png';
import { statusMap } from '../../utils/status';
import { paymentMethodsMap } from '../../utils/paymentStatus';

export function Dashboard() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [summary, setSummary] = useState({
        orders_total: 0,
        orders_count: 0,
        sales_total: 0,
        sales_count: 0,
        average_ticket: 0
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState<string | number>(10);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get(`proof/dashboard?page=${page}&limit=${rowsPerPage}`);
                if(response.status === 200) {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.total_pages);
                    const totalOrdersPrice = response.data.orders_total.toLocaleString('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL',
                    });
                    const totalSalesPrice = response.data.sales_total.toLocaleString('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL',
                    });
                    const averageTicket = response.data.average_ticket.toLocaleString('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL',
                    });
                    setSummary({
                        orders_total: totalOrdersPrice,
                        orders_count: response.data.orders_count,
                        sales_total: totalSalesPrice,
                        sales_count: response.data.sales_count,
                        average_ticket: averageTicket
                    });
                }
            }
            catch(error){
                console.log(error)
            }
        }

        getOrders()
    }, [page, rowsPerPage])

    return (
       <div>
            <Grid container className='title text'>
                <Typography variant="h5" gutterBottom>Resumo dos pedidos</Typography>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs>
                    <Card className='card'>
                        <CardContent className='cardContent'>
                            <img src={OrdersIcon} alt='Icone de pedidos'/>
                            <Typography variant='h6' className='subtitle text'>{summary.orders_count} pedidos</Typography>
                            <Typography className='infoValues text'>{summary.orders_total}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className='card'>
                        <CardContent className='cardContent'>
                            <img src={SalesIcon} alt='Icone de vendas'/>
                            <Typography variant='h6' className='subtitle text'>{summary.sales_count} vendas</Typography>
                            <Typography className='infoValues text'>{summary.sales_total}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className='card'>
                        <CardContent className='cardContent'>
                            <img src={TicketsIcon} alt='Icone de ticket médio'/>
                            <Typography variant='h6' className='subtitle text'>Ticket Medio</Typography>
                            <Typography className='infoValues text'>{summary.average_ticket}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container mt={3}>
                <TableContainer component={Paper} className='noBoxShadow'>
                    <Table>
                        <TableHead>
                            <TableRow className='tableHeaderRow'>
                                {['ID do Pedido', 'ID na Loja', 'Criação', 'Nome do cliente', 'CPF/CNPJ', 'Status do pedido', 'Status do pagamento', 'Método de pagamento', 'Total'].map(header => (
                                    <TableCell key={header} className='tableHeaderCell'>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index} className='tableBodyRow'>
                                    <TableCell>#{order.id?.slice(-6)}</TableCell>
                                    <TableCell>#{order.seller_id?.slice(-6) || "N/A"}</TableCell>
                                    <TableCell>{dayjs(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{order.customer.name || "N/A"}</TableCell>
                                    <TableCell>{order.customer.doc || "N/A"}</TableCell>
                                    <TableCell>{statusMap[order.status] || order.status}</TableCell>
                                    <TableCell>{statusMap[order.payment.status] || order.payment.status}</TableCell>
                                    <TableCell>{paymentMethodsMap[order.payment.method] || order.payment.method || "N/A"}</TableCell>
                                    <TableCell>{order.payment?.amount?.toLocaleString("pt-BR",{ style: 'currency',  currency: 'BRL'}) || "0,00"}</TableCell>
                                 </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <TableContainer>

            <Grid container className='pagination'>
                <Grid item xs className='paginationItem nopadding'>
                    <IconButton onClick={() => setPage(1)} disabled={page === 1}><img src={ChevronsLeftIcon} /></IconButton>
                    <IconButton onClick={() => setPage(page - 1)} disabled={page === 1}><img src={ArrowLeftIcon}/></IconButton>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            variant={page === i + 1 ? "contained" : "outlined"}
                            className={`currentPage ${page === i+1 ? 'filledCell' : 'transparentCell'}`}
                        >
                            {i + 1}
                        </Button>
                    ))}

                    <IconButton onClick={() => setPage(page + 1)} disabled={page === totalPages}><img src={ArrowRightIcon} /></IconButton>
                    <IconButton onClick={() => setPage(totalPages)} disabled={page === totalPages}><img src={ChevronsRightIcon} /></IconButton>
                </Grid>
                <Grid item xs className='paginationItem pageQtt'>
                    <Typography>1 de {totalPages} páginas</Typography>
                </Grid>
                <Grid item xs className='paginationItem'>
                    <Grid className='rowsPerPageLabel text'>
                        <Typography component={'span'}>Linhas por página</Typography>
                    </Grid>
                    <Select fullWidth size='small' className='pageQttSelector' value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            </TableContainer>

       </div>
    )
}