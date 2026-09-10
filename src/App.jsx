import { BrowserRouter, Route, Routes } from 'react-router';

import { PrivateRoute } from './components/PrivateRoute';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { LoginPage } from './pages/LoginPage';
import { CartProvider } from './context/cart/CartProvider';
import { CartPage } from './pages/CartPage';
import { CategoryPage } from './pages/CategoryPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { OrderPage } from './pages/OrderPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <div className='flex min-h-screen flex-col bg-white text-stone-900'>
        <NavBar />

        <main className='mx-auto w-full max-w-6xl flex-1 px-4 py-10'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/admin'
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route path='/category/:categoryId' element={<CategoryPage />} />
            <Route path='/item/:itemId' element={<ItemDetailPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/order/:orderId' element={<OrderPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>
  </BrowserRouter>
);

export default App;
