import React, { createContext, useContext } from 'react';

interface DriveContextType {
  driveId: string;
}

const DriveContext = createContext<DriveContextType | undefined>(undefined);

export const useDriveContext = () => {
  const context = useContext(DriveContext);
  if (context === undefined) {
    throw new Error('useDriveContext must be used within a DriveProvider');
  }
  return context;
};

export const DriveProvider: React.FC<DriveContextType & { children: React.ReactNode }> = ({ driveId, children }) => {
  return (
    <DriveContext.Provider value={{ driveId }}>
      {children}
    </DriveContext.Provider>
  );
}; 