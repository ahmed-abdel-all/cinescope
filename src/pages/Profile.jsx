import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-8 text-zinc-100 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-red-300">
          Profile
        </p>
        <h1 className="mt-3 text-4xl font-bold">Account Details</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          Your CineScope account information is stored locally for this project.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Name
            </p>
            <p className="mt-2 text-lg font-semibold">{user?.name || "User"}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-950 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Email
            </p>
            <p className="mt-2 break-words text-lg font-semibold">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Profile;
