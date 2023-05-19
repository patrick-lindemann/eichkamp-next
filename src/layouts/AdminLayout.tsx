import {
  AdminFooter,
  AdminHeader,
  AdminSidebar,
  AdminSidebarHeader,
  AdminSidebarItem
} from '@/components';
import PropTypes from 'prop-types';

/* Types */

export interface AdminLayoutProps {
  children?: React.ReactNode;
}

/* Components */

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <>
    <AdminHeader />
    <AdminSidebar>
      <AdminSidebarHeader text="Menu" />
      <AdminSidebarItem text="Dashboard" href="#" />
      <AdminSidebarItem text="Inbox" href="#" />
      <AdminSidebarItem text="Messages" href="#" />
      <AdminSidebarItem text="Notifications" href="#" />
      <AdminSidebarHeader text="Tasks" />
      <AdminSidebarItem text="Available Tasks" href="#" />
      <AdminSidebarItem text="Clients" href="#" />
      <AdminSidebarHeader text="Settings" />
      <AdminSidebarItem text="Profile" href="#" />
      <AdminSidebarItem text="Settings" href="#" />
      <AdminSidebarItem text="Logout" href="#" />
    </AdminSidebar>
    <main role="main" className="content">
      {children}
    </main>
    <AdminFooter />
  </>
);

AdminLayout.propTypes = {
  children: PropTypes.node
};
