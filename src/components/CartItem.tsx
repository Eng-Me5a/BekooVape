import React from "react";
import { useDispatch } from "react-redux";
import { plusItem, minusItem, removeItem } from "../redux/slices/cartSlice";

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: string;
  price: number;
  count: number;
  imageUrl: string;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(plusItem(id));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to remove this vape?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="vape-block__image" src={imageUrl} alt="Vape" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size}
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <rect
                width="48"
                height="48"
                fill="white"
                fill-opacity="0.01"
              ></rect>{" "}
              <path
                d="M10.5 24L38.5 24"
                stroke="#000000"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5.92 3.84V5.76V8.64C5.92 9.17 5.49 9.6 4.96 9.6C4.43 9.6 4 9.17 4 8.64L4 5.76L4 3.84V0.96C4 0.43 4.43 0 4.96 0C5.49 0 5.92 0.43 5.92 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.76 5.92H3.84H0.96C0.43 5.92 0 5.49 0 4.96C0 4.43 0.43 4 0.96 4H3.84H5.76H8.64C9.17 4 9.6 4.43 9.6 4.96C9.6 5.49 9.17 5.92 8.64 5.92H5.76Z"
              fill="#EB5A1E"
            />
          </svg>
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} EGP</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 
          72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z"
                fill="#000"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
