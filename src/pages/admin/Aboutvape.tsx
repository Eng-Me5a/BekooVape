import React, { useState } from "react";
import "../../scss/Aboutvape.scss";

const AboutVape = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="about-vape">
      <div className="hero">
        <h1>تعرف على عالم الفيب</h1>
        <p>كل ما تحتاج معرفته عن السجائر الإلكترونية</p>
      </div>

      <div className="content">
        <section className="section">
          <h2>ما هو الفيب؟</h2>
          <p>
            الفيب أو السجائر الإلكترونية هو جهاز يعمل بالبطارية يحول السائل الإلكتروني إلى بخار يمكن استنشاقه.
          </p>
          <div className="comparison">
            <div className="traditional">
              <h3>السجائر العادية</h3>
              <ul>
                <li>تحتوي على آلاف المواد الكيميائية</li>
                <li>تسبب أمراض خطيرة</li>
              </ul>
            </div>
            <div className="vape">
              <h3>السجائر الإلكترونية</h3>
              <ul>
                <li>بديل أقل ضرراً</li>
                <li>لا تنتج دخاناً</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>مكونات الفيب الأساسية</h2>
          <div className="components">
            <div className="component">
              <i className="fas fa-battery-full"></i>
              <h3>البطارية</h3>
            </div>
            <div className="component">
              <i className="fas fa-tint"></i>
              <h3>الليكويد</h3>
            </div>
            <div className="component">
              <i className="fas fa-flask"></i>
              <h3>السائل</h3>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>أسئلة شائعة</h2>
          <div className="faq">
            <div 
              className={`faq-item ${activeQuestion === '1' ? 'active' : ''}`}
              onClick={() => toggleQuestion('1')}
            >
              <div className="question">
                <h3>هل الفيب آمن؟</h3>
                <i className={`fas ${activeQuestion === '1' ? 'fa-minus' : 'fa-plus'}`}></i>
              </div>
              {activeQuestion === '1' && (
                <div className="answer">
                  <p>يعتبر أقل ضرراً من التدخين التقليدي لكنه ليس خالياً من المخاطر.</p>
                </div>
              )}
            </div>

            <div 
              className={`faq-item ${activeQuestion === '2' ? 'active' : ''}`}
              onClick={() => toggleQuestion('2')}
            >
              <div className="question">
                <h3>كيف أختار السائل المناسب؟</h3>
                <i className={`fas ${activeQuestion === '2' ? 'fa-minus' : 'fa-plus'}`}></i>
              </div>
              {activeQuestion === '2' && (
                <div className="answer">
                  <p>اختر حسب نسبة النيكوتين والنكهة التي تفضلها.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutVape;