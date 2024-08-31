'use client';

import AccountSettings from '@/app/Layout/Main/accountSettings';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';

export default function Profile() {
  return (
    <div>
      <Provider store={store}>
        <AccountSettings />
      </Provider>
    </div>
  );
}
