import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import NavBar from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  return (
    <main>
      {isOpen && <Modal />}

      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
