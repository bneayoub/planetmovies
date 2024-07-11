import React, { useState, useEffect } from 'react';
import { Link, Events } from 'react-scroll';
import { Film, Users, PlayCircle, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
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
    <nav className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-800 shadow-lg z-10 rounded-lg overflow-y-auto" style={{ width: '320px', maxHeight: '80vh' }}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-red-600">Content</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                smooth={true}
                duration={500}
                offset={-64}  // Adjust offset to account for the navbar height
                spy={true}
                activeClass="active"
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-6 h-6 mr-3" />
                <span className="text-lg">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavigation;
