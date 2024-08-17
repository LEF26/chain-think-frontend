import { ChangeEvent, useContext, useState } from "react";
import {
  AuthContextType,
  AuthenticationType,
  ErrorType,
  User,
} from "../../types";
import axiosClient, { apiURL } from "../services/axios-client";
import axios, { AxiosResponse } from "axios";
import { FormatError } from "../utils/methods";
import { AuthContext } from "../../context/AuthContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../utils/firebase";
import useFirestore from "./useFirestore";
import { TaskContext } from "@/context/TaskContext";

const CREDENTIALS_ERRROR = "Firebase: Error (auth/invalid-credential).";
const AUTHENTICATION_ERRROR = "Firebase: Error (auth/email-already-in-use).";

function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<ErrorType>(null);

  const { saveUserToUserBucket, retrieveUserFromUserBucket } = useFirestore();

  const AuthHandler = useContext<AuthContextType | null>(AuthContext);

  const [signInDetails, setSignInDetails] = useState({
    email: "sample@gmail.com",
    password: "dummypass",
  });

  const [userCredential, setUserCredentials] = useState();

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignInSuccess = (
    credentials: any,
    successHandler: () => void
  ) => {
    AuthHandler?.setAuthDetails({
      ...credentials.providerData[0],
      uid: credentials.uid,
    });
    setUserCredentials(credentials);
    successHandler();
  };

  const firebaseSignIn = (successHandler: () => void) => {
    setLoading(true);
    const auth = getAuth(app);
    signInWithEmailAndPassword(
      auth,
      signInDetails.email,
      signInDetails.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        retrieveUserFromUserBucket(user, successHandler);
        // handleSignInSuccess(user, successHandler);
        // console.log(user)
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.message == CREDENTIALS_ERRROR) {
          firebaseCreateAccount(successHandler);
        } else {
          setError({
            message: "error",
            error: error.message,
          });
        }
      });
  };

  const firebaseCreateAccount = (successHandler: () => void) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(
      auth,
      signInDetails.email,
      signInDetails.password
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        saveUserToUserBucket(user, signInDetails.password);
        retrieveUserFromUserBucket(user, successHandler);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.message == AUTHENTICATION_ERRROR) {
          setError({
            message: "error",
            error: "Invalid password or email already in use",
          });
        } else {
          setError({
            message: "error",
            error: error.message,
          });
        }
        // ..
      });
    setLoading(false);
  };

  async function updateProfile(successHandler: () => void) {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiURL}/update/${AuthHandler?.authDetails?.user?.id}`,
        signInDetails
      );

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
    updateProfile,
    onTextChange,
    firebaseSignIn,
  };
}

export default useAuth;
