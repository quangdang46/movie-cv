import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../Icon";
import Input from "./Input";

const InputPasswordToggle = ({ control, name, ...props }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name={name ? name : "password"}
        placeholder="Enter your password"
        control={control}
        {...props}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
