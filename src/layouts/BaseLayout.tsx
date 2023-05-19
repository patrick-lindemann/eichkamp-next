import PropTypes from 'prop-types';

/* Types */

export interface BaseLayoutProps {
  children?: React.ReactNode;
}

/* Components */

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => (
  <>{children}</>
);

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
