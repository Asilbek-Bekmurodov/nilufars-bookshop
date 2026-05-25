import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import Dashboard from "./components/Dashboard/Dashboard";
import BookReader from "./components/BookReader/BookReader";

const Public = lazy(() => import("./components/Public/Public"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));
const Private = lazy(() => import("./components/Private/Private"));

function App() {
  const location = useLocation();
  return (
    <Suspense fallback={<Loader fullPage label="Sahifa yuklanmoqda..." />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Public />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/private" element={<Private />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/read/:id" element={<BookReader />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
