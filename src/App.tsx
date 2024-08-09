import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AuthForm from "./components/Authform";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutClient from "./components/LayoutClient";

import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./components/ProductForm";
import CategoryList from "./pages/admin/CategoryTable";
import CategoryForm from "./components/CategoryForm";

// extension: Console Ninja
// state =  trang thai, tinh trang

function App() {
  return (
    <>
      <Routes>
        {/*Client */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm isLogin />} />

        {/* Admin*/}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/products" element={<Dashboard />} />
          <Route path="/admin/product-add" element={<ProductForm />} />
          <Route path="/admin/product-edit/:id" element={<ProductForm />} />
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/category-add" element={<CategoryForm />} />
          <Route path="/admin/category-edit/:id" element={<CategoryForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
