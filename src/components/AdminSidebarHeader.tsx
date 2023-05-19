import PropTypes from 'prop-types';

/* Types */

export interface AdminSidebarHeaderProps {
  text: string;
}

/* Component */

export const AdminSidebarHeader: React.FC<AdminSidebarHeaderProps> = ({
  text
}) => (
  <li className="px-5">
    <div className="flex flex-row items-center h-8">
      <div className="text-sm font-light tracking-wide text-gray-500">
        {text}
      </div>
    </div>
  </li>
);

AdminSidebarHeader.propTypes = {
  text: PropTypes.string.isRequired
};
