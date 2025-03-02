interface Customer {
    name: string;
    doc: string;
}

interface Payment {
    status: string;
    method: string;
    amount: number;
}

export interface Orders {
    id?: string;
    seller_id?: string;
    createdAt: string;
    customer: Customer;
    cpf: string;
    status: string;
    payment: Payment;
    total: number;
}