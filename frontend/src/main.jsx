import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import "./fonts/fonts.css";
import { SearchProvider } from "./Contexts/SearchContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { DataProvider } from "./Contexts/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <I18nextProvider i18n={i18n}>
        <DataProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </DataProvider>
      </I18nextProvider>
    </ChakraProvider>
  </React.StrictMode>
);