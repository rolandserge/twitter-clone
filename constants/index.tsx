import { useSession } from "next-auth/react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export const itemSideBar = [    
    {
        label: 'Home',
        href: "/",
        icon: BsHouseFill
    },
    {
        label: 'Notifications',
        href: "/notifications",
        icon: BsBellFill,
        auth: true,
        alert: true
    },
    {
        label: 'Profile',
        href: "users",
        icon: FaUser,
        auth: true
    }
]