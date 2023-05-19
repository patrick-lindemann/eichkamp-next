import PropTypes from 'prop-types';

/* Types */

export interface AdminHeaderProps {
  children?: React.ReactNode;
}

/* Component */

export const AdminHeader: React.FC<AdminHeaderProps> = ({ children }) => (
  <>Header</>
);

AdminHeader.propTypes = {
  children: PropTypes.node
};
