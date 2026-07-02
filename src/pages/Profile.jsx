import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate("/login");
};
  return (
    <div>
      <h1>Profile</h1>

      <p>
        <strong>Name:</strong> {user?.name}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;