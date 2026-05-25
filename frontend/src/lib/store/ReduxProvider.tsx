'use client';

import { Provider } from 'react-redux';
import AuthBootstrap from './AuthBootstrap';
import { store } from './store';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
};
