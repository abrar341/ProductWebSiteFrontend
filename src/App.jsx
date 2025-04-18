import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import ProductListPage from './components/ProductListPage';
import { useState } from 'react';


function App() {
  const [products, setProducts] = useState([]);
  return (
    <div className='bg-primary min-h-screen p-4'>
      <Router>
        <nav className="p-4 mb-4 flex items-center justify-center text-white border-b flex gap-4">
          <Link to="/admin">Admin</Link>
          <Link to="/products">Products</Link>
        </nav>

        <Routes>
          <Route path="/admin" element={<AdminPage setProducts={setProducts} products={products} />} />
          <Route path="/products" element={<ProductListPage isAdmin={false} setProducts={setProducts} products={products} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
