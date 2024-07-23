import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StateErrorType } from "../../types";
import axios, { AxiosError } from "axios";

export function onTextChange(
  event: ChangeEvent<HTMLInputElement>,
  setDetail: any
) {
  const { name, value } = event.target;

  setDetail((prev: any) => {
    return {
      ...prev,
      [name]: value,
    };
  });
}


export const FormatError = (error: any | AxiosError , setError:StateErrorType, message:string) => {
  console.log(error);
  if (error instanceof Error && !axios.isAxiosError(error)) {
    setError({
      message: message,
      error: error.message,
    });
  } else if (error?.response?.data) {
    const errorsFromResponse = error?.response?.data?.errors;
    let errorMessage = "";
    if (errorsFromResponse) {
      Object.keys(errorsFromResponse).map((currentErrorKey) => {
        const currentError = errorsFromResponse[currentErrorKey];
        errorMessage = errorMessage + currentError[0] + "\n";
      });
    } else if (error?.response?.data?.response) {
      errorMessage = error?.response?.data?.response;
    } else {
      errorMessage = "Something went wrong";
    }

    setError({
      message: message,
      error: errorMessage,
    });
  } else {
    setError({
      message: "Unknown",
      error: "Something went wrong",
    });
  }
};