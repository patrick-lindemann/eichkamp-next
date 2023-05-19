import PropTypes from 'prop-types';

/* Types */

export interface AdminLayoutProps {
  children?: React.ReactNode;
}

/* Components */

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <div>{children}</div>
);

AdminLayout.propTypes = {
  children: PropTypes.node
};

export default AdminLayout;
