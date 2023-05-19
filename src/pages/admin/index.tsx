import { NextPage } from 'next';
import { signOut } from 'next-auth/react';

export const AdminIndex: NextPage = () => (
  <>
    <h1 className="mb-3 text-2xl font-semibold">Admin Index</h1>
    <p>Only admin users can see this page.</p>
    <button onClick={() => signOut()}>Sign Out</button>
  </>
);

export default AdminIndex;
