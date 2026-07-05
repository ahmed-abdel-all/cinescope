import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../../utils/validationSchemas";
import { authService } from "../../services/authService";

function RegisterForm() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    try {
      setSubmitError("");
      authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/login");
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 rounded-2xl border border-white/10 bg-zinc-900/80 p-6 text-zinc-100 shadow-2xl sm:p-8"
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-300">
          Join CineScope
        </p>
        <h1 className="text-3xl font-bold">Create Account</h1>
      </div>

      {submitError ? (
        <p className="rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-100">
          {submitError}
        </p>
      ) : null}

      <div className="space-y-5">
        <label className="block w-full space-y-2">
          <span className="text-sm font-medium text-zinc-300">Name</span>
          <input
            type="text"
            placeholder="Your name"
            {...register("name")}
            className="block w-full min-w-0 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-rose-400"
          />
          {errors.name?.message ? (
            <p className="text-sm text-red-300">{errors.name.message}</p>
          ) : null}
        </label>

        <label className="block w-full space-y-2">
          <span className="text-sm font-medium text-zinc-300">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="block w-full min-w-0 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-rose-400"
          />
          {errors.email?.message ? (
            <p className="text-sm text-red-300">{errors.email.message}</p>
          ) : null}
        </label>

        <label className="block w-full space-y-2">
          <span className="text-sm font-medium text-zinc-300">Password</span>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="block w-full min-w-0 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-rose-400"
          />
          {errors.password?.message ? (
            <p className="text-sm text-red-300">{errors.password.message}</p>
          ) : null}
        </label>

        <label className="block w-full space-y-2">
          <span className="text-sm font-medium text-zinc-300">
            Confirm Password
          </span>
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            className="block w-full min-w-0 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-rose-400"
          />
          {errors.confirmPassword?.message ? (
            <p className="text-sm text-red-300">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-rose-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-rose-400"
      >
        Register
      </button>

      <p className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-rose-300 hover:text-rose-200">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
