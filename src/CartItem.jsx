import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const numericCost = parseFloat(item.cost.replace('$', ''));
        return total + numericCost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace('$', ''));
    return (numericCost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Próximamente');
  };

  return (
    <div className="cart-container">
      <h2>Total del Carrito: ${calculateTotalAmount()}</h2>
      <div className="cart-items-list">
        {cart.map((item) => (
          <div className="cart-card" key={item.name}>
            <img className="cart-img" src={item.image} alt={item.name} />
            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>Precio Unitario: {item.cost}</p>
              <div className="cart-quantity">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
              <button className="delete-btn" onClick={() => handleRemove(item)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button className="continue-btn" onClick={onContinueShopping}>
          Continuar comprando
        </button>
        <button className="checkout-btn" onClick={handleCheckout}>
          Pagar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
