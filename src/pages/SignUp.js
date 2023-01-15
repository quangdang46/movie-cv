import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Input, InputPasswordToggle } from "../components/input";
import { LoadingSpinner } from "../components/Loading";
import { Label } from "../components/Text";
import { auth, db } from "../fire-base/firebase-config";

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
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { email, password, rePassword } = data;
    if (password !== rePassword) {
      toast.error("Password not match!!!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: "anonymous",
        photoURL: "https://source.unsplash.com/random",
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        bookmarks: [],
        recentlyWatch: [],
        username: "",
        email,
        password,
      });
      toast.success("Register successfully!!!");
      navigate("/");
    } catch (error) {
      toast.error("Register failed!!");
    }
  };
  return (
    <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl font-semibold text-gray-500">Register</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter you details.
      </p>
      <form
        className="mt-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="flex flex-col">
          <Label htmlFor="email" className="!text-gray-500 mb-2">
            Email
          </Label>
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
          <Label htmlFor="password" className="!text-gray-500 mb-2">
            Password
          </Label>
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
        <div className="flex flex-col mt-4">
          <Label htmlFor="rePassword" className="!text-gray-500 mb-2">
            Re-enter password
          </Label>
          <InputPasswordToggle
            control={control}
            className="border-2 border-gray-100 !p-4 !rounded-xl mt-1 !bg-white !text-dark-darken"
            name="rePassword"
          ></InputPasswordToggle>
          {errors && errors.rePassword && (
            <p className="text-red-500 text-sm font-medium">
              {errors.rePassword?.message}
            </p>
          )}
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
  );
};

export default SignUp;
