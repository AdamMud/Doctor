// src/store/Providers.jsx
"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
// import { store } from "./store";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
