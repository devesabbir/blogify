import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import { useForm } from "react-hook-form";
import Field from "../components/common/Field";
import { api } from "../api";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuthContext from "../hooks/useAuthContext";

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setValue } = useLocalStorage("auth");
  const { setAuth, setIsAuthenticated } = useAuthContext();

  const handeleOnSubmit = async (data) => {
    try {
      const res = await api.post(`/auth/register`, data);
      if (res.status === 201) {
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
    <Layout>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form onSubmit={handleSubmit(handeleOnSubmit)}>
            <div className="mb-6">
              <Field
                htmlFor={"firstName"}
                label={"First Name"}
                error={errors?.firstName}
              >
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500 mt-2"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field
                htmlFor={"lastName"}
                label={"Last Name"}
                error={errors?.lastName}
              >
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500 mt-2"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field htmlFor={"email"} label={"Email"} error={errors?.email}>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500 mt-2"
                />
              </Field>
            </div>
            <div className="mb-6">
              <Field
                htmlFor={"password"}
                label={"Password"}
                error={errors?.password}
              >
                <input
                  {...register("password", {
                    required: "Password is required",
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
                Create Account
              </button>
            </div>
            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
