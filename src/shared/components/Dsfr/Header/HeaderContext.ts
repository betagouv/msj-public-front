import { createContext } from 'react';

interface Context {
  isOpenNav: boolean,
  onOpenNav: (open?: boolean) => void,
  isMobile: boolean,
  navButton?: string
}
const HeaderContext = createContext<Context>({
  isOpenNav: false,
  onOpenNav: () => {},
  isMobile: false,
});

export default HeaderContext;
