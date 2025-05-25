import React from 'react';
import emptyCart from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Your cart is empty <span>😕</span>
      </h2>
      <p>
        You probably haven't added any vapes yet. <br />
        To add some, go back to the main page.
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/vapes" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
