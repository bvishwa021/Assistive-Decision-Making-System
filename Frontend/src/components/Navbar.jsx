import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-[#FFFDF1] shadow-md sticky top-0 z-50 border-bottom border-[#655034]">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link 
                to='/' 
                className="flex items-center">
                    <h1 className="text-2xl font-bold text-[#562F00]">ChoiceLab</h1>
                </Link>
                <ul className="flex space-x-6">
                    <li>
                        <NavLink 
                        to='/' 
                        className={({ isActive }) =>
                            `text-[#562F00] hover:text-[#655034] ${isActive ? 'text-[#655034]' : 'text-[#562F00]'}`
                        }>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to='/input' 
                        className={({ isActive }) =>
                            `text-[#562F00] hover:text-[#655034] ${isActive ? 'text-[#655034]' : 'text-[#562F00]'}`
                        }>
                            Analyse Now
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;