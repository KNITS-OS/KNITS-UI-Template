import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import { Principal, Role } from "types";

type InitialContextType = {
  user: Principal;
  setUser: Dispatch<SetStateAction<Principal>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const regionalManagerUser = {
  fullName: "Gabriela Rios",
  username: "gabriela.rios",
  email: "gabriela.rios@kuehne-nagel.com",
  jwtToken: "asdlasdloldfiadjadsfhueiy2839r7489fsdhfaiuehf328",
  countryCode3: "BRA",
  authRole: Role.RegionalManager,
  role: "RegionalTransformationManager",
  imageUrl: "https://i.pravatar.cc/300",
};
export const anonymousUser = {
  authRole: Role.Anonymous,
  role: "Anonymous",
  fullName: "Anonymous",
  username: "Anonymous",
  email: "Anonymous",
  jwtToken: "Anonymous",
  countryCode3: "",
};

const initAuthContext: InitialContextType = {
  user: anonymousUser,
  setUser: () => {},
};

const AuthContext = createContext(initAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<Principal>(anonymousUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
