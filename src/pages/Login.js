import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
const Login = () => {
  const [login, setLogin] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  };
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="absolute -z-10 !hidden opacity-60 sm:!inline object-cover"
        alt=""
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
        alt=""
      />

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className={`w-full rounded bg-[#333333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545] ${
                errors.email && "border-b-2 border-orange-500"
              }`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className={`w-full rounded bg-[#333333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545] ${
                errors.password && "border-b-2 border-orange-500"
              }`}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
          type="submit"
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            className="cursor-pointer text-white hover:underline"
            onClick={() => setLogin(false)}
            type="submit"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
