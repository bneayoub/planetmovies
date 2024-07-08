import React from 'react';
import { Facebook, Twitter, Instagram, Mail, LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
    <Icon className="w-6 h-6" />
    <span className="sr-only">{label}</span>
  </a>
);

const Contact: React.FC = () => {
  return (
    <div className="bg-purple-950 text-white py-9">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-2">Connect with Us</h3>
          <p>Stay updated with the latest movie and TV show recommendations.</p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex justify-end space-x-4">
            <SocialLink href="#" icon={Facebook} label="Facebook" />
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Instagram} label="Instagram" />
            <SocialLink href="mailto:contact@cinevault.com" icon={Mail} label="Email" />
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 Cinevault. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Contact;
