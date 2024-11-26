import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(StoreContext);
  const navigate = useNavigate();


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));
  };


  const calculateTotal = () => getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : deliveryCharge);

 
  const createOrderItems = () => {
    return food_list.filter(item => cartItems[item._id] > 0)
                    .map(item => ({ ...item, quantity: cartItems[item._id] }));
  };


  const placeOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      address: data,
      items: createOrderItems(),
      amount: calculateTotal(),
    };

    const apiUrl = payment === "stripe" ? "/api/order/place" : "/api/order/placecod";
    const response = await axios.post(url + apiUrl, orderData, { headers: { token } });

    if (response.data.success) {
      if (payment === "stripe") {
        window.location.replace(response.data.session_url);
      } else {
        toast.success(response.data.message);
        setCartItems({});
        navigate("/myorders");
      }
    } else {
      toast.error("Algo salio mal");
    }
  };


  useEffect(() => {
    if (!token) {
      toast.error("Inicia sesión para poder realizar un pedido");
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Información de entrega</p>
        <div className="multi-field">
          <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='Nombres' required />
          <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Apellidos' required />
        </div>
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Dirección de correo electrónico' required />
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Salon' required />
        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Numero' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Totales del carrito</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Costo de envío</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{currency}{calculateTotal()}</b></div>
          </div>
        </div>
        <div className="payment">
          <h2>Metodo de pago</h2>
          <div onClick={() => setPayment("cod")} className="payment-option">
            <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="COD" />
            <p>COD (Pago contra reembolso)</p>
          </div>
          <div onClick={() => setPayment("stripe")} className="payment-option">
            <img src={payment === "stripe" ? assets.checked : assets.un_checked} alt="Stripe" />
            <p>Stripe (Crédito/Débito)</p>
          </div>
        </div>
        <button className='place-order-submit' type='submit'>{payment === "cod" ? "Realizar pedido" : "Proceder al pago"}</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
