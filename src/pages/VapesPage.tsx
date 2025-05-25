// src/pages/VapesPage.tsx
import { vapes } from "../data/vapesData";
import { VapeBlock } from "../components/vapeBlock";
import React, { useState, useEffect } from "react";
const VapesPage: React.FC = () => {
  const [vapesList, setVapesList] = useState(vapes);
  const [typeFilter, setTypeFilter] = useState(""); // ✅ افتراضيًا كل المنتجات

  useEffect(() => {
    if (typeFilter === "") {
      setVapesList(vapes); // عرض كل المنتجات
    } else {
      const filtered = vapes.filter((item) => item.type === typeFilter);
      setVapesList(filtered);
    }
  }, [typeFilter]);

  return (
    <div className="container">
      <h2 className="content__title">Products Type: {typeFilter || "All"}</h2>

      <div style={{ marginBottom: 20 }}>
        {["vape", "liquid", "accessory", "all"].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type === "all" ? "" : type)}
            style={{
              marginRight: 10,
              backgroundColor:
                typeFilter === type || (type === "all" && typeFilter === "")
                  ? "#4caf50"
                  : "#ddd",
              color:
                typeFilter === type || (type === "all" && typeFilter === "")
                  ? "white"
                  : "black",
              padding: "8px 16px",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {type === "all" ? "كل المنتجات" : type}
          </button>
        ))}
      </div>

      <div className="content__items">
        {vapesList.length > 0 ? (
          vapesList.map((vape) => <VapeBlock key={vape.id} {...vape} />)
        ) : (
          <p>لا توجد منتجات لهذا النوع.</p>
        )}
      </div>
    </div>
  );
};
  
export default VapesPage;
