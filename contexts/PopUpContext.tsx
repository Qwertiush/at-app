import PopUpComponent from "@/components/PopUpComponent";
import React, { createContext, ReactNode, useContext } from "react";

type PopupOptions = {
  title: string;
  content: string;
  childForPopUp?: ReactNode;
  onConfirm?: (decision: boolean) => void;
  clear?: boolean;
};

type PopupContextType = {
  showPopup: (options: PopupOptions) => void;
  hidePopup: () => void;
};

const PopupContext = createContext<PopupContextType>({
  showPopup: () => {},
  hidePopup: () => {}
});

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = React.useState<PopupOptions[]>([]);

  //current popup is first in queue or null
  const popupOptions = queue.length > 0 ? queue[0] : null;

  const showPopup = (options: PopupOptions) => {
    setQueue(prev => [...prev, options]);
  };

  const hidePopup = () => {
    setQueue(prev => prev.slice(1)); // removing first in the queue
  };

  const handleConfirm = (decision: boolean) => {
    if (popupOptions?.onConfirm) {
      popupOptions.onConfirm(decision);
    }
    hidePopup();
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {popupOptions && (
        <PopUpComponent
          title={popupOptions.title}
          content={popupOptions.content}
          handleConfirm={popupOptions.onConfirm ? handleConfirm : null}
          children={popupOptions.childForPopUp}
          clear={popupOptions.clear}
        />
      )}
    </PopupContext.Provider>
  );
};


export const usePopup = () => useContext(PopupContext);
