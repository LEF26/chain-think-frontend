import { AuthContext } from "@/context/AuthContext";
import { ComponentType, ReactElement, useContext, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";

function WithAuth(WrappedComponent, toogleModal, toogleReceiptModal) {
  const AuthHandler = useContext(AuthContext);
  const { retrieveUserFromUserBucket } = useFirestore();

  useEffect(() => {
    const initUser = async () => {
      await retrieveUserFromUserBucket(AuthHandler.authDetails, () => {});
    };
    initUser();
  }, []);

  return (
    <WrappedComponent
      user={AuthHandler?.authDetails}
      toogleModal={toogleModal}
      toogleReceiptModal={toogleReceiptModal}
    />
  );
}

export default WithAuth;
