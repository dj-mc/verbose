import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field, useField } from "formik";

interface ITextInput {
  name: string;
  label: string;
  autoComplete?: string;
  type?: string;
}

function TextInput({ label, ...props }: ITextInput) {
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl
        isInvalid={
          (meta.error && meta.touched && meta.value !== "") || undefined
        }
      >
        <div className="label-error">
          <FormLabel>{label}</FormLabel>{" "}
          <p className="error-message">{meta.error}</p>
        </div>
        <Input as={Field} {...field} {...props}></Input>
      </FormControl>
    </>
  );
}

export default TextInput;
