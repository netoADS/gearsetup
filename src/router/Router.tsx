import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/Category";
import Product from "../pages/Product/Product";
import About from "../pages/About/About";
import Ranking from "../pages/Ranking/Ranking";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/ranking/:slug" element={<Ranking />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
