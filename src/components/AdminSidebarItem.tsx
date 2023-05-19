import PropTypes from 'prop-types';

/* Types */

export interface AdminSidebarItemProps {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

/* Component */

export const AdminSidebarItem: React.FC<AdminSidebarItemProps> = ({
  text,
  href
}) => (
  <li>
    <a
      href={href}
      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
    >
      <span className="inline-flex justify-center items-center ml-4">
        {/* icon */}
      </span>
      <span className="ml-2 text-sm tracking-wide truncate">{text}</span>
    </a>
  </li>
);

AdminSidebarItem.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.node
};
