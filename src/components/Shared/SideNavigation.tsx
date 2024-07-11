import React, { useState, useEffect } from 'react';
import { Link, Events } from 'react-scroll';

interface NavItem {
  id: string;
  label: string;
}

interface SideNavigationProps {
  items: NavItem[];
}

const SideNavigation: React.FC<SideNavigationProps> = ({ items }) => {
  const [activeSection, setActiveSection] = useState(items[0].id);

  useEffect(() => {
    const handleSetActive = (to: string) => {
      setActiveSection(to);
    };

    Events.scrollEvent.register('begin', handleSetActive);

    return () => {
      Events.scrollEvent.remove('begin');
    };
  }, []);

  return (
    <nav className="hidden lg:block sticky top-20 h-screen">
      <ul className="space-y-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={item.id}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active"
              className={`block py-2 px-4 rounded-md transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;