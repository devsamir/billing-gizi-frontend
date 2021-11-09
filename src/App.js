import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFoundScreen from "./screens/NotFoundScreen";
import LoginScreen from "./screens/LoginScreen";
import KamarScreen from "./screens/KamarScreen";
import UserScreen from "./screens/UserScreen";
import MenuScreen from "./screens/MenuScreen";
import PesananScreen from "./screens/PesananScreen";
import { AuthContext } from "./context/authContext";
import Loader from "./components/Loader";
import PesananCreate from "./screens/PesananCreate";
import PesananUpdate from "./screens/PesananUpdate";
import RiwayatUpdate from "./screens/RiwayatUpdate";
import BillingScreen from "./screens/BillingScreen";
import RiwayatScreen from "./screens/RiwayatScreen";
import DashboardScreen from "./screens/DashboardScreen";

function App() {
  const {
    authState: { isLogin, loading, userData },
  } = useContext(AuthContext);
  return (
    <>
      <Switch>
        {loading && <Loader />}
        <Route path="/" exact>
          {isLogin && <Redirect to="/admin" />}
          <LoginScreen />
        </Route>
        <Route path="/admin">
          {isLogin === false && <Redirect to="/" />}
          <Switch>
            <Route exact path="/admin">
              <Redirect to="/admin/dashboard" />
            </Route>
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <Route path="/admin/pesanan" exact>
                  <PesananScreen />
                </Route>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <Route path="/admin/pesanan/create" exact>
                  <PesananCreate />
                </Route>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <Route path="/admin/pesanan/update/:id" exact>
                  <PesananUpdate />
                </Route>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "keuangan") && (
                <Route path="/admin/billing" exact>
                  <BillingScreen />
                </Route>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <Route path="/admin/kamar">
                  <KamarScreen />
                </Route>
              )}
            {userData &&
              (userData.role === "admin" || userData.role === "gizi") && (
                <Route path="/admin/menu">
                  <MenuScreen />
                </Route>
              )}
            <Route path="/admin/riwayat" exact>
              <RiwayatScreen />
            </Route>
            {userData && userData.role === "admin" && (
              <Route path="/admin/riwayat/:id">
                <RiwayatUpdate />
              </Route>
            )}
            {userData && userData.role === "admin" && (
              <Route path="/admin/user">
                <UserScreen />
              </Route>
            )}
            {userData && (
              <Route path="/admin/dashboard">
                <DashboardScreen />
              </Route>
            )}
            <Route path="*">
              <NotFoundScreen />
            </Route>
          </Switch>
        </Route>
        <Route path="*">
          <NotFoundScreen />
        </Route>
      </Switch>
    </>
  );
}

export default App;
