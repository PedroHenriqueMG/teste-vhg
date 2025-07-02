import { AlertSuccessModal } from '@/components/alertSuccess';
import React, { createContext, useCallback, useContext, useState } from 'react';

type ShowAlertSuccess = (message: string) => void;

const AlertSuccessContext = createContext<ShowAlertSuccess>(() => {});

export const useAlertSuccess = () => useContext(AlertSuccessContext);

export const AlertSuccessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  const showAlert = useCallback((msg: string) => setMessage(msg), []);
  const handleClose = useCallback(() => setMessage(null), []);

  return (
    <AlertSuccessContext.Provider value={showAlert}>
      {children}
      <AlertSuccessModal
        visible={!!message}
        message={message || ''}
        onClose={handleClose}
      />
    </AlertSuccessContext.Provider>
  );
};
