import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[var(--app-bg)] px-4 py-10 text-[var(--app-text)] transition-colors">
      <div className="w-full max-w-[28rem]">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
