import { Routes, Route } from 'react-router-dom'
import { Home, Login, Cart, HomePage, Retal, Detail, Forgot, Register } from './containers/Public'
import { HomeServer, Account, Category, Product, Dashboard, Invoice, Role, Sample, Provider,
  PersonalInfor, PageProduct, Payment, Slide } from './containers/System'
import { path } from './utils/constant'
import { CartProvider } from './contexts/Cart';

function App() {
  return (
    <div className="h-screen w-full bg-primary">
      <CartProvider>
        <Routes>
          <Route path={path.HOME} element={<Home />}>
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.REGISTER} element={<Register />} />
            <Route path={path.FORGOT} element={<Forgot />} />
            <Route path='*' element={<HomePage />} />
            <Route path={path.PERSONALINFOR} element={<PersonalInfor />} />
            <Route path={path.IPHONE} element={<Retal />} />
            <Route path={path.IPAD} element={<Retal />} />
            <Route path={path.MACBOOK} element={<Retal />} />
            <Route path={path.AIRPODS} element={<Retal />} />
            <Route path={path.WATCH} element={<Retal />} />
            <Route path={path.DETAIL} element={<Detail />} />
            <Route path={path.CART} element={<Cart />} component={Cart} />
            <Route path={path.PAYMENT} element={<Payment />} component={Payment} />
          </Route>
          <Route path={path.HOMESERVER} element={<HomeServer />}>
            <Route path='*' element={<Dashboard />} />
            <Route path={path.ACCOUNT} element={<Account />} />
            <Route path={path.CATEGORY} element={<Category />} />
            <Route path={path.PRODUCT} element={<Product />} />
            <Route path={path.CREATEPRODUCT} element={<PageProduct />} />
            <Route path={path.EDITPRODUCT} element={<PageProduct />} />
            <Route path={path.INVOICE} element={<Invoice />} />
            <Route path={path.ROLE} element={<Role />} />
            <Route path={path.SAMPLE} element={<Sample />} />
            <Route path={path.PROVIDER} element={<Provider />} />
            <Route path={path.SLIDE} element={<Slide />} />
          </Route>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
