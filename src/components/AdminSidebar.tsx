import PropTypes from 'prop-types';

/* Types */

export interface AdminSidebarProps {
  children?: React.ReactNode;
}

/* Component */

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div className="flex items-center justify-center h-14"></div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">{children}</ul>
      </div>
    </div>
  </div>
);

AdminSidebar.propTypes = {
  children: PropTypes.node
};
