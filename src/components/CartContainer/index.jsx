import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../CartItem.jsx";
import { clearCart } from "../../features/cart/cartSlice.js";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector((state) => state.cart);

  const TotalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return (acc += Number(item.price));
    }, 0);
  }, [amount]);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your Bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>{TotalPrice}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(clearCart())}>
          Clear
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
