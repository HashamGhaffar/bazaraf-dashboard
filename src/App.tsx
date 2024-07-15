import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import "./App.css";
import { CssBaseline } from "@mui/material";
import LandingPage from "./pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
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

const persistor = persistStore(store);

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
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HeroSection />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/category" element={<SelectCategory />} />
              
              {/* Routes with Sidebar */}
              <Route element={<SidebarLayout />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/categoryList" element={<CategoryList />} />
                <Route path="/modifiers" element={<Modifiers />} />
                <Route path="/modifierList" element={<ModifierList />} />
                <Route path="/items" element={<Items />} />
                <Route path="/location" element={<DeliveryLocation />} />
                <Route path="/table" element={<Table />} />
                <Route path="/dashBoard" element={<DashBoard />} />
                <Route path="/theme" element={<Theme />} />
              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
    </div>
  );
}

export default App;
