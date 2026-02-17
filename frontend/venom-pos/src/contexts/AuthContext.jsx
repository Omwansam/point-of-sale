import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock users for demonstration
  const mockUsers = {
    admin: {
      id: 1,
      name: 'Admin User',
      email: 'admin@restaurant.com',
      role: 'admin',
      avatar: '👨‍💼'
    },
    cashier: {
      id: 2,
      name: 'Cashier User',
      email: 'cashier@restaurant.com',
      role: 'cashier',
      avatar: '👩‍💼'
    },
    waiter: {
      id: 3,
      name: 'Waiter Staff',
      email: 'waiter@restaurant.com',
      role: 'waiter',
      avatar: '👨‍💼',
      assignedTables: ['Table 1', 'Table 3', 'Table 5']
    },
    kitchen: {
      id: 4,
      name: 'Kitchen Staff',
      email: 'kitchen@restaurant.com',
      role: 'kitchen',
      avatar: '👨‍🍳'
    },
    inventory: {
      id: 5,
      name: 'Inventory Manager',
      email: 'inventory@restaurant.com',
      role: 'inventory',
      avatar: '📦'
    }
  };

  const login = (email, password) => {
    // Mock login logic
    if (email === 'admin@restaurant.com' && password === 'admin123') {
      const user = mockUsers.admin;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } else if (email === 'cashier@restaurant.com' && password === 'cashier123') {
      const user = mockUsers.cashier;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } else if (email === 'kitchen@restaurant.com' && password === 'kitchen123') {
      const user = mockUsers.kitchen;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } else if (email === 'waiter@restaurant.com' && password === 'waiter123') {
      const user = mockUsers.waiter;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    } else if (email === 'inventory@restaurant.com' && password === 'inventory123') {
      const user = mockUsers.inventory;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
