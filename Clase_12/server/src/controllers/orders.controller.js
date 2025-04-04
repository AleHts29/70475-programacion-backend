import OrderService from '../services/dao/orders.dao.js';

const orderService = new OrderService();



export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getAll()
        if (!orders) {
            res.status(202).json({ message: "No orders found: " });
        }
        res.status(200).json({ message: "Success", payload: orders });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
    }
}


export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params
        const order = await orderService.getById(id)
        if (!order) {
            res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Success", payload: order });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener orden por ID", error: error.message });
    }
}


export const saveOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await orderService.save(orderData);
        res.status(201).json({ message: "Order saved successfully", payload: order });
    } catch (error) {
        res.status(500).json({ message: "Error al guardar la orden", error: error.message });
    }
} 