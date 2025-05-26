import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';
import '../../scss/adminLogin.scss'; // تأكد ان الملف موجود

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const API_URL = process.env.REACT_APP_API_URL || "https://beko-vape-server-production.up.railway.app/api";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const res = await fetch(`${API_URL}/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } else {
      setError(data.message || 'اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  } catch (err: any) {
    setError('حدث خطأ أثناء محاولة الدخول. يرجى المحاولة لاحقاً.');
    console.error("Login error:", err);
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="login-header">
          <h2>تسجيل دخول الأدمن</h2>
          <p>الرجاء إدخال بيانات الدخول للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2025 نظام إدارة المتجر. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
