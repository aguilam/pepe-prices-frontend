import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Импортируем необходимые компоненты из React Query

import Barrel from "../pages/Barrel/Barrel";
import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import Item from "../pages/Item/Item";
import App from "./App";
import HelpProject from "../pages/HelpProject/HelpProject";
const queryClient = new QueryClient();

const Root: React.FC = React.memo(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/:categoryid" element={<Category />} />
            <Route path="/:categoryid/:itemid" element={<Item />} />
            <Route
              path="/:categoryid/:itemid/:barrelcords"
              element={<Barrel />}
            />
            <Route path="/helpproject" element={<HelpProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
});

export default Root;
