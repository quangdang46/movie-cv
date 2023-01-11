import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../fire-base/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Min pass word 8 character")
    .required("Please enter your password"),
});
const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully!!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed!!");
    }
  };
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold text-gray-500">Welcome Back</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Welcome back! Please enter you details.
          </p>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-500">Email</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-dark-darken"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors && errors.email && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium text-gray-500">
                Password
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent text-dark-darken"
                placeholder="Enter your email"
                type="password"
                autoComplete="on"
                {...register("password")}
              />
              {errors && errors.password && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div>
                <div>
                  <input type="checkbox" id="remember" />
                  <label
                    className="ml-2 font-medium text-base text-gray-500"
                    htmlFor="remember"
                  >
                    Remember for 30 days
                  </label>
                </div>
              </div>
              <p className="font-medium text-base text-violet-500">
                Forgot password
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                className="cursor-pointer active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
                type="submit"
              >
                Sign in
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base text-gray-500">
                Don't have an account?
              </p>
              <p
                className="ml-2 font-medium text-base text-violet-500 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
        <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
    </div>
  );
};

export default SignIn;
