import React, { createContext, useState, ReactNode } from 'react';

// Define the type for your user data
interface User {
  email: string;
  // Add other properties as needed
}

// Define the context type
interface UserContextType {
  user: User | null; // User can be null if not logged in
  setUser: (user: User | null) => void; // Function to update user
}

// Create the UserContext with default value
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State to hold user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
