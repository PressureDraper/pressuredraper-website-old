import {
  Navigate,
  Route,
  /* BrowserRouter as Router, */
  HashRouter as Router,
  Routes
} from "react-router-dom";
import { TemplateRoute } from "./TemplateRoute"
import { useContext, useEffect } from "react";
import UIContext from "../context/UIContext";
import { PropsUIContext } from "../interfaces/context/IUIContext";
import HomePage from "../pages/HomePage";

export const AppRouter = () => {
  const { selectedUI } = useContext<PropsUIContext>(UIContext);

  useEffect(() => {
    const styleEl =
      document.getElementById('dynamic-scrollbar') ||
      document.createElement('style');

    styleEl.id = 'dynamic-scrollbar';

    const sahib: string = `
          ::-webkit-scrollbar-thumb {
            background-color: #b6a98e;
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #a18e6e;
          }
          ::-webkit-scrollbar-track {
            background: #2b201d;
          }
        `;

    const hideline: string = `
          ::-webkit-scrollbar-thumb {
            background-color: #b8a6da;
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #9c83c9;
          }
          ::-webkit-scrollbar-track {
            background: #322249;
          }
        `;

    styleEl.innerHTML = selectedUI === 'Sahib' ? sahib : hideline;

    document.head.appendChild(styleEl);

    return () => {
      styleEl.remove();
    };
  }, [selectedUI]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<TemplateRoute />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  )
}
