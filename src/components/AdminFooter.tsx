import PropTypes from 'prop-types';

/* Types */

export interface AdminFooterProps {
  children?: React.ReactNode;
}

/* Component */

export const AdminFooter: React.FC<AdminFooterProps> = ({ children }) => (
  <>Footer</>
);

AdminFooter.propTypes = {
  children: PropTypes.node
};
