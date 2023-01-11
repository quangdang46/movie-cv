import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../fire-base/firebase-config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: "anonymous",
        photoURL: "https://source.unsplash.com/random",
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: auth.currentUser.displayName,
        photoURL: "https://source.unsplash.com/random",
        bookmarks: [],
        recentlyWatch: [],
        createdAt: String(serverTimestamp()),
      });
      toast.success("Register successfully!!!");
      navigate("/");
    } catch (error) {
      toast.error("Register failed!!");
    }
  };
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold text-gray-500">Register</h1>
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
                <input type="checkbox" id="remember" />
                <label
                  className="ml-2 font-medium text-base text-gray-500"
                  htmlFor="remember"
                >
                  Remember for 30 days
                </label>
              </div>
              <p className="font-medium text-base text-violet-500">
                Forgot password
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg  flex items-center justify-center"
                type="submit"
              >
                {isSubmitting ? <LoadingSpinner></LoadingSpinner> : "Sign up"}
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base text-gray-500">
                Sign in your account
              </p>
              <p
                className="ml-2 font-medium text-base text-violet-500 cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Sign in
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

export default SignUp;