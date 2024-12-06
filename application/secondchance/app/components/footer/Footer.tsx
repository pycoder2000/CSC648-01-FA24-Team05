import { faGithub, faLinkedin, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-gray-200 bg-white py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-t border-gray-200"></div>

        <div className="flex flex-col items-center justify-between space-y-6 text-gray-600 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-6">
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
            </a>
            <a
              href="https://medium.com/@yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FontAwesomeIcon icon={faMedium} className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center space-x-8">
            <a
              href="http://localhost:8000/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-gray-500"
            >
              Docs
            </a>
            <Link href="/about-team" className="text-sm hover:text-gray-500">
              About Team
            </Link>
            <Link href="/faq" className="text-sm hover:text-gray-500">
              F.A.Q
            </Link>
            <Link href="/privacy-policy" className="text-sm hover:text-gray-500">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-sm hover:text-gray-500">
              Terms &amp; Conditions
            </Link>
          </div>

          <p className="text-sm text-gray-600">
            © {currentYear} Secondchance, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
