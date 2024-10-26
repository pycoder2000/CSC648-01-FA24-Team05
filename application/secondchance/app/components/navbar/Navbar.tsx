import Image from "next/image";
import Link from "next/link";

import { getUserId } from "@/app/lib/actions";
import AddItemButton from "./AddItemButton";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";

const Navbar = async () => {
  const userId = await getUserId();

  console.log("userId: ", userId);

  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="w-full mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="SecondChance Logo"
              width={124}
              height={38}
            />
          </Link>

          <div className="flex space-x-6">
            <SearchFilters />
          </div>

          <div className="flex items-center space-x-6">
            <AddItemButton userId={userId} />

            <UserNav />
            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
