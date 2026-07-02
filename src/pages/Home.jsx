import useAuthStore from "../store/useAuthStore";

function Home() {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  return (
    <div>
      <h2>Authentication Test</h2>

      <p>User: {user ? user.name : "No User"}</p>

      <p>
        Status:{" "}
        {isAuthenticated ? "Authenticated" : "Guest"}
      </p>

      <button
        onClick={() =>
          login({
            id: 1,
            name: "Ahmed",
            email: "ahmed@test.com",
          })
        }
      >
        Login
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Home;