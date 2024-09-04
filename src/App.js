import { CacheProvider } from "@emotion/react";
import "./style/App.scss";
import createCache from "@emotion/cache";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import NotFoundPage from "./component/NotFoundPage ";
import ProductPage from "./component/ProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cache = createCache({
  key: "css",
  prepend: true,
});

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <CacheProvider value={cache}>
            <ToastContainer
              position="top-center"
              autoClose="3000"
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              style={{ textAlign: "center" }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </CacheProvider>
        </header>
      </div>
    </Router>
  );
}

export default App;
