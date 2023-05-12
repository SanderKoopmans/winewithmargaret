import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null);

type MenuProps = {
    children: React.ReactNode | React.ReactNode[];
}

export const Menu = ({ children }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => setIsExpanded(!isExpanded);

  return (
    <MenuContext.Provider value={{isExpanded, handleButtonClick}}>
      {children}
    </MenuContext.Provider>
  )
};

type MenuButtonProps = {
  children: string;
}

export const MenuButton = ({ children }: MenuButtonProps) => {
  const handleButtonClick = useContext(MenuContext);

  return (
    <button onClick={handleButtonClick}>{children}</button>
  )
};
