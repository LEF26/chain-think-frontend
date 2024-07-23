import { AuthContext } from "@/context/AuthContext";
import { ComponentType, ReactElement, useContext } from "react";

function WithAuth(WrappedComponent, toogleModal) {
    const AuthHandler = useContext(AuthContext)

    return <WrappedComponent user={AuthHandler?.authDetails?.user} toogleModal={toogleModal}/>;
}

export default WithAuth;