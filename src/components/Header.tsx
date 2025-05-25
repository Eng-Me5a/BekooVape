import { useEffect, useRef } from 'react';
import logoPng from '../assets/img/vape-logo.png';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import '../scss/_header.scss';

function Header() {
  const { items } = useSelector((state: any) => state.cart);
  const totalCount = items.reduce((total: number, item: any) => total + item.count, 0);
  const location = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img src={logoPng} alt="Vape logo" width={100} height={110} />
          <div>
            <h1>Bekoo Vape</h1>
          </div>
        </Link>

        <nav className="header__nav">
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/vapes" className="nav__link">Products</Link>
          <Link to="/about" className="nav__link">About</Link>
          <Link to="/contact" className="nav__link">Contact Us</Link>
        </nav>

        {location.pathname !== '/cart' && (
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <div className="button__delimiter"></div>
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.333 16.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666zM14.333 16.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666zM4.78 5h11.553l-1.12 5.593a1.333 1.333 0 01-1.334 1.074H6.833a1.333 1.333 0 01-1.333-1.16L4.487 2.827A1.333 1.333 0 003.167 1.667H1.667" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{totalCount}</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };
