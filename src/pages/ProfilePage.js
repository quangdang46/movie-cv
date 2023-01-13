import React from "react";
import { useForm } from "react-hook-form";
import { Button2 } from "../components/Button";
import Field from "../components/Field/Field";
import { ImageUpload } from "../components/Image";
import Input from "../components/input/Input";
import useFirebaseImage from "../hooks/useFirebaseImage";

const ProfilePage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const handleUpdateUser = (value) => {
    console.log(value);
  };
  return (
    <div className="flex-grow px-10 pt-5">
      <div className="flex items-center justify-between">
        <span className="uppercase text-white font-semibold text-[35px] mb-4">
          My Profile
        </span>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 justify-between">
          <div className="flex-grow flex flex-col max-w-2xl">
            <p class="capitalize text-white text-2xl font-medium mb-4">
              User Information
            </p>
            <Field>
              <label
                htmlFor="username"
                className="text-white mt-5 text-xl font-medium mb-3"
              >
                Fullname
              </label>
              <Input
                placeholder="Enter your full name"
                control={control}
                name="username"
              ></Input>
            </Field>
            <Field>
              <label
                htmlFor="username"
                className="text-white mt-5 text-xl font-medium mb-3"
              >
                Fullname
              </label>
              <Input
                placeholder="Enter your name"
                control={control}
                name="name"
              ></Input>
            </Field>
            <Field>
              <label
                htmlFor="username"
                className="text-white mt-5 text-xl font-medium mb-3"
              >
                Fullname
              </label>
              <Input
                placeholder="Enter your email"
                control={control}
                name="email"
              ></Input>
            </Field>
            <Field>
              <label
                htmlFor="username"
                className="text-white mt-5 text-xl font-medium mb-3"
              >
                Fullname
              </label>
              <Input
                placeholder="Enter your password"
                control={control}
                name="password"
              ></Input>
            </Field>
          </div>
          <div className="flex items-center flex-col shrink-0 md:max-w-[500px] w-full">
            <p class="capitalize text-white text-2xl font-medium mb-4">
              Avatar User
            </p>
            <div className="w-[300px] h-[300px] mx-auto rounded-full mb-10">
              <ImageUpload
                className="!rounded-full h-full"
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                progress={progress}
                image={image}
              ></ImageUpload>
            </div>
            <p className="text-white text-lg font-medium">Anynomous</p>
          </div>
        </div>
        <div className="">
          <Button2
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update Info
          </Button2>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
