import React from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "../components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../fire-base/firebase-config";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/Text";
import { Input } from "../components/input";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
});
const ForgotPass = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { email } = values;
    if (!email.trim().length) {
      toast.error("Please enter your email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Please check your email to reset your password");
      navigate("/signin");
    } catch (error) {
      toast.error("Reset password failed");
    }
  };
  return (
    <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white dark:bg-[#1C1C1E] border-2 border-gray-100 dark:border-slate-500">
      <h1 className="text-5xl font-semibold text-gray-500 dark:text-white  select-none">
        Forgot password
      </h1>
      <p className="font-medium text-lg text-gray-500 dark:text-white mt-4 select-none">
        Enter your email to reset your password.We will send you an email to
        reset your password
      </p>
      <form
        className="mt-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="flex flex-col">
          <Label
            htmlFor="email"
            className="!text-gray-500 mb-2 dark:!text-white"
          >
            Email
          </Label>
          <Input
            placeholder="Enter your email"
            name="email"
            control={control}
            className="border-2 border-gray-100 !p-4 !rounded-xl mt-1 !bg-white !text-dark-darken dark:!bg-dark-lighten dark:!text-white dark:!border-slate-500"
          ></Input>
          {errors && errors.email && (
            <p className="text-red-500 text-sm font-medium">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="mt-8 flex justify-end items-center">
          <p
            className="font-medium text-base text-violet-500 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Return signed in page
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg  flex items-center justify-center"
            type="submit"
          >
            {isSubmitting ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              "Reset password"
            )}
          </button>
        </div>
        <p
          className="mt-8 text-center font-medium text-base text-gray-500 dark:text-white hover:text-violet-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Go to Home Page
        </p>
      </form>
    </div>
  );
};

export default ForgotPass;
