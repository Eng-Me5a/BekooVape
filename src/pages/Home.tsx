import React from "react";
import "../scss/home.scss";
import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { vapes } from "../data/vapesData";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";

interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const featuredProducts = vapes.filter(vape => vape.featured);

  const onClickAdd = (product: typeof vapes[0]) => {
    const item: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      count: 0
    };
    dispatch(addItem(item));
  };

  const getCartItemCount = (productId: string) => {
    const cartItem = cartItems.find(item => item.id === productId);
    return cartItem ? cartItem.count : 0;
  };

  return (
    <div className="home-container">
      {/* هيدر رئيسي */}
      <section className="hero-header">
        <div className="hero-content">
          <h1>اكتشف عالم <span>الفيب المتميز</span></h1>
          <p>أجود أنواع السجائر الإلكترونية والعصائر بأفضل الأسعار وضمان الجودة</p>
          <button className="cta-button" onClick={() => navigate("/vapes")}>
            تصفح المنتجات
          </button>
        </div>
      </section>

      {/* قسم العروض */}
        <section className="featured-section">
        <div className="section-title">
          <h2>منتجاتنا المميزة</h2>
        </div>
        <div className="featured-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => {
              const addedCount = getCartItemCount(product.id);
              return (
                <div className="featured-item" key={product.id}>
                  <div className="featured-image">
                    <img src={product.imageUrl} alt={product.title} />
                  </div>
                  <div className="featured-info">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className="price">{product.price} £</div>
                    <button
                      onClick={() => onClickAdd(product)}
                      className="button button--outline button--add"
                    >
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
            })
          ) : (
            <p className="no-products">لا توجد منتجات مميزة حالياً</p>
          )}
        </div>
      </section>

      {/* قسم المميزات */}
      <section className="about-section">
        <div className="about-content">
          <h1>لماذا <span>تختارنا</span>؟</h1>
          <p>
            نوفر لكم أجود منتجات الفيب مع ضمان الجودة وسرعة التوصيل. 
            فريق دعم فني متاح على مدار الساعة لمساعدتك في اختيار المنتج المناسب.
          </p>
          
          <div className="features-grid">
            <div className="feature">
              <div className="icon"><FaShippingFast /></div>
              <h3>توصيل سريع</h3>
              <p>توصيل خلال 24-48 ساعة لجميع أنحاء مصر</p>
            </div>
            
            <div className="feature">
              <div className="icon"><FaShieldAlt /></div>
              <h3>ضمان الجودة</h3>
              <p>جميع المنتجات أصلية وبضمان من المصنع</p>
            </div>
            
            <div className="feature">
              <div className="icon"><FaHeadset /></div>
              <h3>دعم فني</h3>
              <p>فريق دعم فني متاح 24/7 لمساعدتك</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};