"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// import LogoutButton from "@/app/components/buttons/LogoutButton";
import MenuLink from "@/app/components/navbar/MenuLink";

// import useLoginModal from "@/app/hooks/useLoginModal";
// import useSignupModal from "@/app/hooks/useSignupModal";

interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const router = useRouter();
  //   const loginModal = useLoginModal();
  //   const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);

  console.log("User ID:", userId);

  return (
    <div className="p-3 h-[48px] lg:h-[64px] relative inline-block border flex flex-col justify-center rounded-full">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 ml-2"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">
          {userId ? (
            <>
              <MenuLink
                label="Inbox"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/inbox");
                }}
              />

              <MenuLink
                label="My Listings"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/mylistings");
                }}
              />

              <MenuLink
                label="My Favorites"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myfavorites");
                }}
              />

              <MenuLink
                label="My Rentals"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myrentals");
                }}
              />

              {/* <LogoutButton /> */}
            </>
          ) : (
            <>
              <MenuLink
                label="Log in"
                onClick={() => {
                  setIsOpen(false);
                  //   loginModal.open();
                }}
              />

              <MenuLink
                label="Sign up"
                onClick={() => {
                  setIsOpen(false);
                  //   signupModal.open();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
