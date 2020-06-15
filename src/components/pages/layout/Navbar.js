import React from "react";

import { Link } from "react-router-dom";
import { FiLogOut, FiRepeat, FiNavigation, FiGitPullRequest, FiCalendar, FiSearch } from "react-icons/fi";

import NavLink, { menuClasses } from "../../utils/NavUtils";

const Search = () => {

    const [focus, setFocus] = React.useState(false);

    return (
        <div className="order-first sm:order-last mt-4 sm:mt-0 w-full sm:w-1/2 relative">
            <FiSearch className={`absolute bottom-0 top-0 my-auto ml-2 ${focus ? "text-dark" : "text-gray-500"}`} />
            <input className={`border border-gray-400 pl-8 h-10 focus:outline-none w-full sm:auto rounded`} id="username" type="text" placeholder="Hledat..."
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </div>
    )
}

const Navbar = props => {

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <header className="bg-dark h-navbar flex flex-row justify-between items-center">
                <div className="container mx-auto max-w-screen-xl px-4 flex flex-row items-center justify-between">
                    <div className="sm:hidden">
                        <button className={"block text-light focus:outline-none"} type="button" onClick={() => setOpen(prev => !prev)}>
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {
                                    open ?
                                        (
                                            <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                        ) :
                                        (
                                            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                        )
                                }
                            </svg>
                        </button>
                    </div>
                    <Link to="/" className="font-bold text-light text-xl">Trailtour 2020</Link>
                    <button className="focus:outline-none">
                        <FiLogOut className="h-6 w-6 text-light" />
                    </button>
                </div>
            </header>
            <nav className={`${open ? "block" : "hidden"} bg-light min-h-navbar sm:flex justify-between items-center shadow-navbar`}>
                <div className="container mx-auto max-w-screen-xl px-4 flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-start py-4 sm:py-0 sm:pt-0 w-full">
                        <NavLink to="/" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiRepeat className="mr-2" />Novinky</NavLink>
                        <NavLink to="/etapy" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiNavigation className="mr-2" />Etapy</NavLink>
                        {/* <NavLink to="/vysledky" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiCalendar className="mr-2" />Výsledky</NavLink> */}
                        <NavLink to="/changelog" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiGitPullRequest className="mr-2" />Changelog</NavLink>
                    </div>
                    <Search />
                </div>
            </nav>
        </>
    );
}

export default Navbar;