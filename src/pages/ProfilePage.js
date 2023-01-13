import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Field from "../components/Field/Field";
import { ImageUpload } from "../components/Image";
import Input from "../components/input/Input";
import { LoadingSpinner } from "../components/Loading";
import { auth, db } from "../fire-base/firebase-config";
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
  const imageUrl = getValues("photoURL");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
  useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      reset({
        ...user,
      });
    }
  }, [reset, user]);

  async function deleteAvatar() {
    const colRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(colRef, {
      photoURL: "",
    });
  }

  const handleUpdateUser = async (values) => {
    try {
      const colRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(colRef, {
        ...values,
        photoURL: image,
      });
      toast.success("Update user successfully!");
    } catch (error) {
      toast.error("Update user failed!");
    }
  };
  return (
    <div className="flex-grow xs:px-2 sm:px-5 md:px-10 px-2 pt-5">
      <div className="flex items-center justify-between">
        <span className="uppercase text-white font-semibold text-2xl sm:text-[35px] mb-4">
          My Profile
        </span>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)} className="mt-5">
        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 justify-between">
          <div className="flex-grow flex flex-col max-w-2xl">
            <p className="capitalize text-white text-xl md:text-2xl font-medium mb-4">
              User Information
            </p>
            <Field>
              <label
                htmlFor="username"
                className="text-white mt-5 text-base font-medium mb-3"
              >
                Username
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
                className="text-white mt-5 text-base font-medium mb-3"
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
                className="text-white mt-5 text-base font-medium mb-3"
              >
                Email
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
                className="text-white mt-5 text-base font-medium mb-3"
              >
                Password
              </label>
              <Input
                placeholder="Enter your password"
                control={control}
                name="password"
                type="password"
              ></Input>
            </Field>
          </div>
          <div className="flex items-center flex-col shrink-0 md:max-w-[400px] w-full">
            <p className="capitalize text-white text-xl md:text-2xl font-medium mb-4">
              Avatar User
            </p>
            <div className="w-[250px] sm:w-[350px]">
              <ImageUpload
                className="!rounded-full h-full"
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                progress={progress}
                image={image || imageUrl}
              ></ImageUpload>
            </div>
            <p className="text-white text-lg font-medium mt-2">Anynomous</p>
          </div>
        </div>
        <button
          className="block mx-auto cursor-pointer active:scale-[.98] active:duration-75 transition-all hover:opacity-90 ease-in-out transform bg-violet-500 rounded-lg text-white font-bold text-lg py-2 px-4"
          type="submit"
        >
          {isSubmitting ? <LoadingSpinner></LoadingSpinner> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
