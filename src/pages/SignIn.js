import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Input, InputPasswordToggle } from "../components/input";
import { LoadingSpinner } from "../components/Loading";
import { auth } from "../fire-base/firebase-config";
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
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
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
    <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl font-semibold text-gray-500">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter you details.
      </p>
      <form
        className="mt-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-500">Email</label>
          <Input
            placeholder="Enter your email"
            name="email"
            control={control}
            className="border-2 border-gray-100 !p-4 !rounded-xl mt-1 !bg-white !text-dark-darken"
          ></Input>
          {errors && errors.email && (
            <p className="text-red-500 text-sm font-medium">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium text-gray-500">Password</label>
          <InputPasswordToggle
            control={control}
            className="border-2 border-gray-100 !p-4 !rounded-xl mt-1 !bg-white !text-dark-darken"
          ></InputPasswordToggle>
          {errors && errors.password && (
            <p className="text-red-500 text-sm font-medium">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="mt-8 flex justify-end items-center">
          <p
            className="font-medium text-base text-violet-500 cursor-pointer"
            onClick={() => navigate("/forgotpass")}
          >
            Forgot password
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="cursor-pointer active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg flex items-center justify-center"
            type="submit"
          >
            {isSubmitting ? <LoadingSpinner></LoadingSpinner> : "Sign in"}
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
  );
};

export default SignIn;
