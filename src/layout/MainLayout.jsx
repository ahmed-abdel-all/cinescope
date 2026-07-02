import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      {/* Navbar هيضيفها Person 3 */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer هيضيفها Person 3 */}
    </>
  );
}

export default MainLayout; 