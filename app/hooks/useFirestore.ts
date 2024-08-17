import { ChangeEvent, useContext, useState } from "react";
import {
  AuthContextType,
  AuthenticationType,
  ErrorType,
  FirebaseTaskType,
  User,
} from "../../types";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  getDoc,
  query,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../utils/firebase";
import { AuthContext } from "@/context/AuthContext";
import { FormatError } from "../utils/methods";
import { TaskContext } from "@/context/TaskContext";

function useFirestore() {
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState(false);
  const AuthHandler = useContext<AuthContextType | null>(AuthContext);
  const TasksHandler = useContext(TaskContext);

  const [updateDetails, setUpdateDetails] = useState({
    ...AuthHandler?.authDetails,
  });

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUpdateDetails((prev: any) => {
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

  const retriveTasksFromTaskBucket = async () => {
    const taskQuery = query(collection(db, "tasks"));
    let tasks: DocumentData = [];
    const querySnapshot = await getDocs(taskQuery);

    querySnapshot.forEach((current) => {
      tasks.push({ ...current.data() });
    });

    return tasks;
  };

  const saveUserToUserBucket = async (user: any, password: string) => {
    const userRef = doc(db, "users", user.uid);
    const tasksDetails: any = {};

    TasksHandler.tasks.map((current: any) => {
      tasksDetails[current.id] = {
        done: false,
      };
    });

    await setDoc(userRef, {
      ...user.providerData[0],
      password,
      uid: user.uid,
      balance: 0,
      tasks_status: { ...tasksDetails },
    });
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
      const response = await updateDoc(userRef, { ...updateDetails });
      retrieveUserFromUserBucket(AuthHandler?.authDetails, successHandler);
    } catch (error) {
      FormatError(error, setError, "Update Profile Error");
    } finally {
      setLoading(false);
    }
  };

  const makeUpdateToUserBucket = async (
    newInfo: any,
    successHandler: () => void
  ) => {
    setLoading(true);
    try {
      const userRef = doc(db, "users", AuthHandler?.authDetails.uid);
      const response = await updateDoc(userRef, { ...newInfo });
      await retrieveUserFromUserBucket(
        AuthHandler?.authDetails,
        successHandler
      );
    } catch (error) {
      FormatError(error, setError, "Update Profile Error");
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToBucket = (file: File, handleSuccess: () => void) => {
    setLoading(true);

    const name = AuthHandler?.authDetails?.email.split("@")[0];

    const ReceiptsRef = ref(
      storage,
      `receipts/${AuthHandler?.authDetails?.email}/${file.name}.jpg`
    );

    uploadBytes(ReceiptsRef, file)
      .then((snapshot) => {
        if (AuthHandler?.authDetails?.receipts) {
            makeUpdateToUserBucket({
              receipts: [...AuthHandler?.authDetails?.receipts, snapshot.metadata.fullPath ]
            },
           handleSuccess)
        } else{
          makeUpdateToUserBucket({
            receipts: [ snapshot.metadata.fullPath ]
          },
         handleSuccess)
        }
      })
      .catch((error) =>
        setError({ message: "Receipt Upload Error", error: error.message })
      )
      .then(() => setLoading(false));
  };

  return {
    error,
    loading,
    updateDetails,
    onTextChange,
    saveUserToUserBucket,
    updateUserInfoToUserBucket,
    retrieveUserFromUserBucket,
    retriveTasksFromTaskBucket,
    makeUpdateToUserBucket,
    uploadImageToBucket,
  };
}

export default useFirestore;
