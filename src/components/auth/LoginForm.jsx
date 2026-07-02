import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../utils/validationSchemas";
import { authService } from "../../services/authService";
import useAuthStore from "../../store/useAuthStore";

function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    try {
      const user = authService.login(data.email, data.password);

      login(user);

      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />

        <p>{errors.email?.message}</p>
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <p>{errors.password?.message}</p>
      </div>

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;