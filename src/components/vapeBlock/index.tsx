import { useSelector, useDispatch } from 'react-redux';
import { CartItem, addItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

type VapeBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

const VapeBlock: React.FC<VapeBlockProps> = ({ id, title, price, imageUrl, }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item: any) => item.id === id)
  );
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="vape-block">
      
      <div className="vape-block__selector">
        <Link key={id} to={'/vape/' + id}>
        <img className="vape-block__image" src={imageUrl} alt="Vape" />
        <h4 className="vape-block__title">{title}</h4>
      </Link>
      </div>
      <div className="vape-block__bottom">
        <div className="vape-block__price"> {price} </div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export { VapeBlock };
