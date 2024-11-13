import Image from 'next/image';
import Link from 'next/link';

import AddItemButton from '@/app/components/navbar/AddItemButton';
import SearchFilters from '@/app/components/navbar/SearchFilters';
import UserNav from '@/app/components/navbar/UserNav';
import { getUserId } from '@/app/lib/actions';

const Navbar = async () => {
  const userId = await getUserId();

  return (
    <nav className="fixed left-0 top-0 z-10 flex w-full items-center justify-between border-b border-white bg-white py-6 shadow-md">
      <div className="mx-auto w-full px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/logo.png" alt="SecondChance Logo" width={124} height={38} />
          </Link>

          <div className="flex space-x-6">
            <SearchFilters />
          </div>

          <div className="flex items-center space-x-6">
            <AddItemButton userId={userId} />

            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
