import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { sdk } from "@farcaster/frame-sdk";

// Types based on Farcaster Mini App docs [1]
type User = {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
  location?: {
    placeId: string;
    description: string;
  };
};

type Client = {
  clientFid: number;
  added: boolean;
  safeAreaInsets?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  notificationDetails?: {
    url: string;
    token: string;
  };
};

type MiniAppContextType = {
  user?: User;
  client?: Client;
  location?: any;
};

const MiniAppContext = createContext<MiniAppContextType>({});

export function MiniAppProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<MiniAppContextType>({});

  useEffect(() => {
    async function fetchContext() {
      const ctx = await sdk.context;
      setContext({
        user: ctx.user,
        client: ctx.client,
        location: ctx.location,
      });
    }
    fetchContext();
  }, []);

  return (
    <MiniAppContext.Provider value={context}>
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniAppContext() {
  return useContext(MiniAppContext);
}
