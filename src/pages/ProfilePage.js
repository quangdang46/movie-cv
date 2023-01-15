import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Field from "../components/Field/Field";
import { ImageUpload } from "../components/Image";
import Input from "../components/input/Input";
import { LoadingSpinner } from "../components/Loading";
import { Label } from "../components/Text";
import { auth, db } from "../fire-base/firebase-config";
import useFirebaseImage from "../hooks/useFirebaseImage";

const ProfilePage = () => {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const newPasswordRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const {
    control,
    handleSubmit,
    setValue,
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

  async function updateUser(data) {
    try {
      const colRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(colRef, {
        ...user,
        ...data,
      });
      toast.success("Update user successfully!");
    } catch (error) {
      toast.error("Update user failed!");
    }
  }

  const handleUpdateUser = async (values) => {
    try {
      const colRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(colRef, {
        ...user,
        ...values,
        photoURL: image,
      });
      toast.success("Update user successfully!");
    } catch (error) {
      toast.error("Update user failed!");
    }
  };
  const handleChangePassword = () => {
    const newPass = newPasswordRef.current.value;
    if (newPass.trim().length === 0) {
      toast.error("Password is required!");
      return;
    }

    updatePassword(auth.currentUser, newPass)
      .then(() => {
        newPasswordRef.current.value = "";
        oldPasswordRef.current.value = "";
        updateUser({
          password: newPass,
        });
        toast.success("Update password successfully!");
      })
      .catch((error) => {
        toast.error("Update password failed!");
      })
      .finally(() => {
        setIsChangePassword(false);
      });
  };
  const reAuthentication = async (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    if (oldPassword.trim().length === 0) {
      toast.error("Password is required!");
      return;
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPassword
    );
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        // setShowReAuth(true);
        // setIsChangePassword(true);
        handleChangePassword();
        toast.success("Re-authentication successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error);
      });
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
              <Label htmlFor="username" className="mb-3">
                Username
              </Label>
              <Input
                placeholder="Enter your full name"
                control={control}
                name="username"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="name" className="mb-3">
                Full name
              </Label>
              <Input
                placeholder="Enter your name"
                control={control}
                name="name"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="email" className="mb-3">
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                control={control}
                name="email"
                disabled="disabled"
                className="pointer-events-none"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="password" className="mb-3">
                {isChangePassword ? "Current your password" : "Password"}
              </Label>
              <Input
                placeholder="Enter your password"
                control={control}
                name="password"
                type={isChangePassword ? "text" : "password"}
                disabled="disabled"
                className="pointer-events-none"
              ></Input>
              <p
                className="mt-2 text-sm hover:text-blue-500 cursor-pointer"
                onClick={() => setIsChangePassword(!isChangePassword)}
              >
                {!isChangePassword
                  ? "Change password"
                  : "Don't change password"}
              </p>
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
      {isChangePassword && (
        <form onSubmit={reAuthentication} autoComplete="off">
          <Field>
            <Label htmlFor="oldpassword" className="mb-3">
              Enter your current password
            </Label>

            <input
              ref={oldPasswordRef}
              type="text"
              name="oldpassword"
              id="oldpassword"
              className="p-2 transition-all leading-none bg-dark-lighten-2 text-sm rounded border-none outline-none w-[200px]"
            />
          </Field>
          <Field>
            <Label htmlFor="newpassword" className="mb-3">
              Enter your new password
            </Label>
            <input
              ref={newPasswordRef}
              type="text"
              name="newpassword"
              id="newpassword"
              className="p-2 transition-all leading-none bg-dark-lighten-2 text-sm rounded border-none outline-none w-[200px]"
            />
          </Field>
          <button
            type="submit"
            className="mt-5 p-2 bg-dark-lighten-2 rounded hover:bg-gray-800"
          >
            Change password
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
