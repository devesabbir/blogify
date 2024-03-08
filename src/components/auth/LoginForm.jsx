import { useForm } from "react-hook-form";
import useLocalStorage from "../../hooks/useLocalStorage";

import { Link } from "react-router-dom";
import axios from "axios";
import Field from "./../common/Field";
import useAuthContext from "../../hooks/useAuthContext";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { setIsAuthenticated, setAuth } = useAuthContext();
  const { setValue } = useLocalStorage("auth");

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        data
      );
      if (res.status === 200) {
        setValue(res.data);
        setAuth(res.data);
        let timer = setTimeout(() => {
          setIsAuthenticated(true);
        }, 1000);

        return () => {
          clearTimeout(timer);
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="mb-6">
        <Field label="Email" error={errors.email}>
          <input
            {...register("email", {
              required: "Email is required!",
            })}
            type="email"
            id="email"
            name="email"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </Field>
      </div>
      <div className="mb-6">
        <Field label="Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Passwords is required!",
            })}
            type="password"
            id="password"
            name="password"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </Field>
      </div>
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </div>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
