import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "variables/chartDefaults";
import { AuthProvider } from "context";

import { Router } from "./Router";

import "./assets/css/argon-dashboard-pro-react.css";
import "./assets/css/site.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-notification-alert/dist/animate.css";
import "sweetalert2/dist/sweetalert2.min.css";

import "components/widgets/react-table/styles/reactTable.css";

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
