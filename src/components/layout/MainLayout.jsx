import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-body-base bg-[var(--app-bg)] text-[var(--app-text)] transition-colors">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
