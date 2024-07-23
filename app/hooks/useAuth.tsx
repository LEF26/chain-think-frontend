import { ChangeEvent, useContext, useState } from "react";
import { AuthContextType, AuthenticationType, ErrorType, User } from "../../types";
import axiosClient, { apiURL } from "../services/axios-client";
import axios, { AxiosResponse } from "axios";
import { FormatError } from "../utils/methods";
import { AuthContext } from "../../context/AuthContext";

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<ErrorType>(null);

  const AuthHandler = useContext<AuthContextType | null>(AuthContext);

  const [signInDetails, setSignInDetails] = useState<User>({
    id: '',
    email: "sample@gmail.com",
    password: "dummypass",
    full_name: '',
    bank_account_number: '',
    tron: '',
    eth: '',
    bsc: '',
  });

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name);

    setSignInDetails((prev: User) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignInSuccess = (response: AxiosResponse<any, any>, successHandler: () => void) => {


    AuthHandler?.setAuthDetails({
      token: response.data.token,
      user: {
        ...response.data.user,
      },
    });

    successHandler()
  };

  async function signIn(successHandler: () => void) {
    setLoading(true);
    try {
      const response = await axios.post(`${apiURL}/sign-in`, signInDetails);

      console.log(response.data);
      handleSignInSuccess(response, successHandler);
    } catch (error) {
      FormatError(error, setError, "Authentication Error");
    } finally {
      setLoading(false);
    }
  }



  async function updateProfile(successHandler: () => void) {
    setLoading(true);
    try {
      const response = await axios.post(`${apiURL}/update/${AuthHandler?.authDetails?.user?.id}`, signInDetails);

      console.log(response.data);
      handleSignInSuccess(response, successHandler);
    } catch (error) {
      FormatError(error, setError, "Authentication Error");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    signInDetails,
    signIn,
    updateProfile,
    onTextChange,
  };
}

export default useAuth;
