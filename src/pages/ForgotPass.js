import React from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "../components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../fire-base/firebase-config";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
});
const ForgotPass = () => {
  const {
    register,
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
    <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl font-semibold text-gray-500  select-none">
        Forgot password
      </h1>
      <p className="font-medium text-lg text-gray-500 mt-4 select-none">
        Enter your email to reset your password.We will send you an email to
        reset your password
      </p>
      <form
        className="mt-8"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
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
      </form>
    </div>
  );
};

export default ForgotPass;
