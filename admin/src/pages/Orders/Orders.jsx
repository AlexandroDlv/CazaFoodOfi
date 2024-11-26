import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`)
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Error al cargar los pedidos")
      }
    } catch (error) {
      toast.error("Error al cargar los pedidos");
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Estado actualizado correctamente");
      }
    } catch (error) {
      toast.error("Error al actualizar el estado");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      try {
        setIsLoading(true);
        const response = await axios.delete(`${url}/api/order/delete/${orderId}`);
        
        if (response.data.success) {
          await fetchAllOrders();
          toast.success("Pedido eliminado correctamente");
        } else {
          toast.error(response.data.message || "No se pudo eliminar el pedido");
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        toast.error(error.response?.data?.message || "Error al eliminar el pedido");
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: 'Cancelado'
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Pedido cancelado correctamente");
      }
    } catch (error) {
      toast.error("Error al cancelar el pedido");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Página de pedidos</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Elementos : {order.items.length}</p>
            <p>{currency}{order.amount}</p>
            <div className="order-actions">
              <select 
                onChange={(e) => statusHandler(e, order._id)} 
                value={order.status} 
                disabled={order.status === 'Cancelado' || isLoading}
              >
                <option value="Elaborando comida">Elaborando comida</option>
                <option value="En salida para entrega">En salida para entrega</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              
              <button 
                onClick={() => handleCancelOrder(order._id)}
                className="cancel-btn"
                disabled={order.status === 'Entregado' || order.status === 'Cancelado' || isLoading}
              >
                Cancelar
              </button>
              
              <button 
                onClick={() => handleDeleteOrder(order._id)}
                className="delete-btn"
                disabled={isLoading}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order