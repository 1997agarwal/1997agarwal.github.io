import { createContext, useContext } from 'react';

// Lets any page open the global Contact and Resume modals without prop drilling.
export const SiteContext = createContext({
  openContact: () => {},
  openResume: () => {},
});

export const useSite = () => useContext(SiteContext);
