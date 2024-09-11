import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { login } from '../services/userApis';

interface User {
  userId: string;
  userName: string;
}
interface IAuthContext {
  isLoggedIn: boolean;
  user: User | null;
  logoutHandler: () => void;
  isLoading: boolean;
  loginHandler: (userName: string) => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loginHandler = async (userInput: string) => {
    try {
      let { userId, userName } = await login(userInput);
      console.log('userName:', userName);
      console.log('userId:', userId);
      if (userId && userName) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);

        setUser({ userId, userName });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('error while logging in ', error);
    }
  };

  const logoutHandler = (): void => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (userId && userName) {
      setUser({ userId, userName });
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, logoutHandler, loginHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
