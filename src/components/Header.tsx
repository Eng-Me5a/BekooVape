import { useEffect, useRef, useState } from 'react';
import logoPng from '../assets/img/vape-logo.png';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import '../scss/_header.scss';
import { Menu, X } from 'lucide-react';

function Header() {
  const { items } = useSelector((state: any) => state.cart);
  const totalCount = items.reduce((total: number, item: any) => total + item.count, 0);
  const location = useLocation();
  const isMounted = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  // يغلق القائمة تلقائياً عند تغيير الصفحة
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          <img src={logoPng} alt="Vape logo" width={60} height={70} />
          <h1>Bekoo Vape</h1>
        </Link>

        {/* زر القائمة للموبايل */}
        <button className="header__mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
        </button>

        {/* روابط التنقل */}
        <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/vapes" className="nav__link">Products</Link>
          <Link to="/about" className="nav__link">About</Link>
          <Link to="/contact" className="nav__link">Contact Us</Link>
        </nav>

        {/* زر السلة */}
        {location.pathname !== '/cart' && (
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                <path d="M6.333 16.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666zM14.333 16.333a1.333 1.333 0 100-2.666 1.333 1.333 0 000 2.666zM4.78 5h11.553l-1.12 5.593a1.333 1.333 0 01-1.334 1.074H6.833a1.333 1.333 0 01-1.333-1.16L4.487 2.827A1.333 1.333 0 003.167 1.667H1.667" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
