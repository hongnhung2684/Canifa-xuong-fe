import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProductProvider from "./contexts/ProductContext.tsx";
import CategoryContextProvider from "./contexts/CategoryContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoryContextProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CategoryContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
