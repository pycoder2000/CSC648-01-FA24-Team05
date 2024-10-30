'use client';

import LogoutButton from '@/app/components/buttons/LogoutButton';
import MenuLink from '@/app/components/navbar/MenuLink';
import useLoginModal from '@/app/hooks/useLoginModal';
import useSignupModal from '@/app/hooks/useSignupModal';
import apiService from '@/app/services/apiService';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await apiService.get(`/api/auth/users/${userId}/`);
        setUserName(userData.name);
        setUserImage(userData.avatar_url);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex h-[48px] cursor-pointer items-center rounded-full border px-4 transition duration-300 hover:bg-gray-100 lg:h-[64px]">
      <button ref={buttonRef} onClick={toggleMenu} className="flex items-center space-x-2">
        {userId && userImage ? (
          <div className="relative">
            <Image
              className="h-10 w-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
              src={userImage}
              alt="User Avatar"
              width={40}
              height={40}
            />
            <span className="absolute left-7 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="absolute right-0 top-[60px] flex w-[220px] cursor-pointer flex-col rounded-xl border bg-white shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {userId ? (
              <>
                {userName && (
                  <div
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/sellers/${userId}`);
                    }}
                    className="cursor-pointer rounded-lg border-b border-gray-200 p-4 text-gray-900 transition hover:bg-gray-100"
                  >
                    <p className="text-lg font-semibold">{userName}</p>
                  </div>
                )}

                <MenuLink
                  label="Inbox"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/inbox');
                  }}
                />

                <MenuLink
                  label="My Listings"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/mylistings');
                  }}
                />

                <MenuLink
                  label="My Favorites"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/myfavorites');
                  }}
                />

                <MenuLink
                  label="My Rentals"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/myrentals');
                  }}
                />

                <hr className="my-1 border-t border-gray-200" />

                <LogoutButton />
              </>
            ) : (
              <>
                <MenuLink
                  label="Log in"
                  onClick={() => {
                    setIsOpen(false);
                    loginModal.open();
                  }}
                />

                <MenuLink
                  label="Sign up"
                  onClick={() => {
                    setIsOpen(false);
                    signupModal.open();
                  }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserNav;
