'use client';
import {
  SetStateAction,
  createContext,
  useContext,
  Dispatch,
  useState,
} from 'react';

interface ContextProps {
  hoverContent: any;
  setHoverContent: Dispatch<SetStateAction<any>>;
  currentUser: any;
  setCurrentUser: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<ContextProps>({
  hoverContent: null,
  setHoverContent: (): any => null,
  currentUser: null,
  setCurrentUser: (): any => null,
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [hoverContent, setHoverContent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        hoverContent,
        setHoverContent,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);