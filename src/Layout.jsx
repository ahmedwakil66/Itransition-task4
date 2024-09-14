import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import { MeContext } from "./providers/MeProvider";

function Layout() {
  const { me } = React.useContext(MeContext);

  if (!me) return <Navigate to={"/login"} />;
  return (
    <div className="font-mono max-w-4xl mx-auto px-2">
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>

      {/* <footer>footer</footer> */}
    </div>
  );
}

export default Layout;
