import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../../utils/validationSchemas";
import { authService } from "../../services/authService";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    try {
      authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
        />

        <p>{errors.name?.message}</p>
      </div>

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

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />

        <p>{errors.confirmPassword?.message}</p>
      </div>

      <button type="submit">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;