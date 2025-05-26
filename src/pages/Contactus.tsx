import React, { useState, ChangeEvent, FormEvent } from "react";
import "../scss/ContactUs.scss";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsLoading(false);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">تواصل معنا</h1>

      <div className="contact-content">
        {/* Contact Information */}
        <div className="contact-info">
          <h2>معلومات الاتصال</h2>
          
          <div className="contact-info-item">
            <h3>الهاتف:</h3>
            <ul>
              <li>01090633096</li>
              <li>01028446962</li>
            </ul>
          </div>
          
          <div className="contact-info-item">
            <h3>البريد الإلكتروني:</h3>
            <p>mekhailg33@gmail.com</p>
          </div>
          
          <div className="contact-info-item">
            <h3>العنوان:</h3>
            <p>محافظة كفر الشيخ، مركز بيلا، شارع المحكمة أمام البنك الأهلي</p>
          </div>
          
          <div className="contact-info-item">
            <h3>أوقات العمل:</h3>
            <p>من 9 صباحاً حتى 4 فجراً</p>
          </div>

          <div className="social-media">
            <h3>تابعنا على وسائل التواصل الاجتماعي</h3>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/bekoo_vape_store_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <i className="icon-instagram"></i> إنستجرام
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/BekooVape/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <i className="icon-facebook"></i> فيسبوك
                </a>
              </li>
            </ul>
          </div>
        </div>
    </div>
</div>
  );
};

export default ContactUs;