import React, { createContext, useCallback, useContext, useState } from 'react';

import { AlertErrorModal } from '@/components/alertError';

type ShowAlertError = (message: string) => void;

const AlertErrorContext = createContext<ShowAlertError>(() => {});

export const useAlertError = () => useContext(AlertErrorContext);

export const AlertErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);

  const showAlert = useCallback((msg: string) => setMessage(msg), []);
  const handleClose = useCallback(() => setMessage(null), []);

  return (
    <AlertErrorContext.Provider value={showAlert}>
      {children}
      <AlertErrorModal
        visible={!!message}
        message={message || ''}
        onClose={handleClose}
      />
    </AlertErrorContext.Provider>
  );
};
