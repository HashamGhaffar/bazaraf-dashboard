import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import "./App.css";
import { CssBaseline } from "@mui/material";
import LandingPage from "./pages/landing";
const persistor = persistStore(store);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline>
            <LandingPage />
          </CssBaseline>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
