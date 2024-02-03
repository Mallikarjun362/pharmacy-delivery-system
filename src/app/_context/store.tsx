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
  cart: any;
  setCart: Dispatch<SetStateAction<any>>;
  cacheReqReceivedDone: [];
  setCacheReqReceivedDone: Dispatch<SetStateAction<Array<any>>>;
}

const GlobalContext = createContext<ContextProps>({
  hoverContent: null,
  setHoverContent: (): any => null,
  currentUser: null,
  setCurrentUser: (): any => null,
  cart: {},
  setCart: (): any => ({}),
  cacheReqReceivedDone: [],
  setCacheReqReceivedDone: (): any => [],
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [hoverContent, setHoverContent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState({});
  const [cacheReqReceivedDone, setCacheReqReceivedDone] = useState<any>([]);
  return (
    <GlobalContext.Provider
      value={{
        hoverContent,
        setHoverContent,
        currentUser,
        setCurrentUser,
        cart,
        setCart,
        cacheReqReceivedDone,
        setCacheReqReceivedDone,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
