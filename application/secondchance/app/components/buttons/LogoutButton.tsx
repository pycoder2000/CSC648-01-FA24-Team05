'use client';

import { useRouter } from "next/navigation";
import { resetAuthCookies } from "@/app/lib/actions";
import MenuLink from "@/app/components/navbar/MenuLink";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const submitLogout = async () => {
        resetAuthCookies();

        router.push('/')
    }

    return (
        <MenuLink
            label="Log out"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;