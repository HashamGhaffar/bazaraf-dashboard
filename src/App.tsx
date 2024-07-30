import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import "./App.css";
import { CssBaseline } from "@mui/material";
import LandingPage from "./pages/landing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HeroSection from "./components/heroSection";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import SelectCategory from "./pages/SelectCategory";
import Profile from "./pages/Profile";
import SidebarLayout from "./components/sideBar";
import Modifiers from "./pages/modifier/Modifier";
import Items from "./pages/items";
import CategoryList from "./pages/categoryList";
import ModifierList from "./pages/modifierList";
import DeliveryLocation from "./pages/deliveryLocation";
import Table from "./pages/Table";
import DashBoard from "./pages/dashBoard";
import Theme from "./pages/theme";
import { useSelector } from "react-redux";
import { RootState } from "./type/index";
import { ToastContainer } from "react-toastify";

const persistor = persistStore(store);

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  return accessToken ? element : <Navigate to="/login" />;
};

const AuthRoute = ({ element }: { element: JSX.Element }) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  return accessToken ? <Navigate to="/profile" /> : element;
};

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CssBaseline />
            <Router>
              <Routes>
                {/* Routes without Sidebar */}
                <Route
                  path="/"
                  element={<AuthRoute element={<LandingPage />} />}
                />
                <Route
                  path="/home"
                  element={<AuthRoute element={<HeroSection />} />}
                />
                <Route
                  path="/signup"
                  element={<AuthRoute element={<SignUp />} />}
                />
                <Route
                  path="/login"
                  element={<AuthRoute element={<Login />} />}
                />
                <Route
                  path="/category"
                  element={<AuthRoute element={<SelectCategory />} />}
                />

                {/* Routes with Sidebar */}
                <Route element={<SidebarLayout />}>
                  <Route
                    path="/dashBoard"
                    element={<PrivateRoute element={<DashBoard />} />}
                  />
                  <Route
                    path="/profile"
                    element={<PrivateRoute element={<Profile />} />}
                  />
                  <Route
                    path="/categoryList"
                    element={<PrivateRoute element={<CategoryList />} />}
                  />
                  <Route
                    path="/modifiers"
                    element={<PrivateRoute element={<Modifiers />} />}
                  />
                  <Route
                    path="/modifierList"
                    element={<PrivateRoute element={<ModifierList />} />}
                  />
                  <Route
                    path="/items"
                    element={<PrivateRoute element={<Items />} />}
                  />
                  <Route
                    path="/location"
                    element={<PrivateRoute element={<DeliveryLocation />} />}
                  />
                  <Route
                    path="/table"
                    element={<PrivateRoute element={<Table />} />}
                  />

                  <Route
                    path="/theme"
                    element={<PrivateRoute element={<Theme />} />}
                  />
                </Route>
              </Routes>
            </Router>
          </PersistGate>
        </Provider>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
