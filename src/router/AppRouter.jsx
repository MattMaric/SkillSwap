import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import MySwaps from '../pages/MySwaps';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/swaps" element={<MySwaps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
