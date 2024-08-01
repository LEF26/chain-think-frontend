import { ChangeEvent, useContext, useState } from "react";
import {
  AuthContextType,
  AuthenticationType,
  ErrorType,
  User,
} from "../../types";
import { doc, collection, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { AuthContext } from "@/context/AuthContext";
import { FormatError } from "../utils/methods";

function useFirestore() {
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState(false);
  const AuthHandler = useContext<AuthContextType | null>(AuthContext);

  const [updateDetails, setUpdateDetails] = useState({...AuthHandler?.authDetails});

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name);

    setUpdateDetails((prev:any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignInSuccess = (data: any, successHandler: () => void) => {
    AuthHandler?.setAuthDetails({ ...data });
    successHandler();
  };

  const saveUserToUserBucket = async (user: any, password: string) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { ...user.providerData[0], password, uid: user.uid });
  };

  const retrieveUserFromUserBucket = async (
    user: any,
    successHandler: () => void
  ) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const response = await getDoc(userRef);

      const data = response.data();
      handleSignInSuccess(data, successHandler);
    } catch (error) {
      FormatError(error, setError, "404 error");
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfoToUserBucket = async (successHandler: () => void) => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", AuthHandler?.authDetails.uid);
      const response = await updateDoc(userRef, {...updateDetails});
      console.log(response);
      retrieveUserFromUserBucket(AuthHandler?.authDetails, successHandler);
    } catch (error) {
      FormatError(error, setError, "Update Profile Error");
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    updateDetails,
    onTextChange,
    saveUserToUserBucket,
    updateUserInfoToUserBucket,
    retrieveUserFromUserBucket,
  };
}

export default useFirestore;
