// src/pages/VapesPage.tsx
import { vapes } from "../data/vapesData";
import { VapeBlock } from "../components/vapeBlock";
import React, { useState, useEffect } from "react";
import "../scss/components/_vape-block.scss";
import "../scss/components/_filter-buttons.scss"; // تأكد من استيراد ملف التنسيق

const VapesPage: React.FC = () => {
  const [vapesList, setVapesList] = useState(vapes);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    if (typeFilter === "") {
      setVapesList(vapes);
    } else {
      const filtered = vapes.filter((item) => item.type === typeFilter);
      setVapesList(filtered);
    }
  }, [typeFilter]);

  const filterTypes = [
    { id: "", label: "كل المنتجات" },
    { id: "vape", label: "فيب" },
    { id: "liquid", label: "سوائل" },
    { id: "accessory", label: "إكسسوارات" }
  ];

  return (
    <div className="container">
      <h2 className="content__title">المنتجات: {typeFilter ? filterTypes.find(t => t.id === typeFilter)?.label : "الكل"}</h2>

      <div className="filter-buttons">
        {filterTypes.map((type) => (
          <button
            key={type.id || "all"}
            onClick={() => setTypeFilter(type.id)}
            className={`filter-buttons__button ${
              typeFilter === type.id ? "filter-buttons__button--active" : ""
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="content__items">
        {vapesList.length > 0 ? (
          vapesList.map((vape) => <VapeBlock key={vape.id} {...vape} />)
        ) : (
          <p className="no-products">لا توجد منتجات لهذا النوع.</p>
        )}
      </div>
    </div>
  );
};

export default VapesPage;