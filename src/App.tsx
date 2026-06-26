import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DishDetail from './pages/DishDetail';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:type" element={<CategoryPage />} />
            <Route path="/dish/:id" element={<DishDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}
