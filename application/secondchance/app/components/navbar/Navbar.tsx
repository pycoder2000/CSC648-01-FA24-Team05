import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";

let placeHolder = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Second_Chance_Logo.png/800px-Second_Chance_Logo.png?20190622052123"

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image 
                        src={placeHolder} // Not correct image// TODO 
                        alt="SecondChance logo"
                        width={180}
                        height={38}
                        />

                    </Link>

                    <div className="flex space-x-6">
                        <SearchFilters/>
                    </div>

                    <div className="flex items-center space-x-6">
                    <p className="text-black">Add property - User Nav</p>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
