import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import theme from "./styles/theme";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import { KamarProvider } from "./context/kamarContext";
import { MenuProvider } from "./context/menuContext";
import { PesananProvider } from "./context/pesananContext";
import { BillingProvider } from "./context/billingContext";
import { RiwayatProvider } from "./context/riwayatContext";
import { GiziProvider } from "./context/giziContext";
import { BadgeProvider } from "./context/badgeContext";
ReactDOM.render(
  <Router>
    <AuthProvider>
      <BadgeProvider>
        <UserProvider>
          <KamarProvider>
            <MenuProvider>
              <PesananProvider>
                <BillingProvider>
                  <RiwayatProvider>
                    <GiziProvider>
                      <ThemeProvider theme={theme}>
                        <App />
                      </ThemeProvider>
                    </GiziProvider>
                  </RiwayatProvider>
                </BillingProvider>
              </PesananProvider>
            </MenuProvider>
          </KamarProvider>
        </UserProvider>
      </BadgeProvider>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
