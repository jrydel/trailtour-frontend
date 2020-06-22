import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { FiRepeat, FiNavigation, FiGitPullRequest, FiCalendar, FiSearch } from "react-icons/fi";

import { NavbarContainer } from "../layout/Layout";
import NavLink, { menuClasses } from "../../utils/NavUtils";
import useSWR from "swr";
import { fetcher, defaultGetOptions, API_URL } from "../../utils/FetchUtils";
import { formatStageNumber } from "../../utils/FormatUtils";

const SearchBar = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const { data } = useSWR(query !== "" ? `${API_URL}/fulltext?database=trailtour&match=${query}` : null, url => fetcher(url, defaultGetOptions));

    React.useEffect(() => {
        setOpen(query !== "");
    }, [query]);

    return (
        <div className="order-first sm:order-last mt-4 sm:mt-0 w-full sm:w-1/2 relative">
            <FiSearch className={`absolute bottom-0 top-0 my-auto ml-2`} />
            <input className={`border border-gray-400 pl-8 h-10 focus:outline-none w-full sm:auto rounded`} id="searchbar" placeholder="Hledat..." type="text" autoComplete="off" value={query}
                onChange={event => setQuery(event.target.value)}
                onBlur={() => setQuery("")}
                onKeyDown={event => {
                    if (event.key === "Escape") {
                        setQuery("");
                        event.target.blur();
                    }
                }}
            />
            <div className={`${open ? "block" : "hidden"} absolute flex flex-col bg-light rounded-lg p-4 max-h-searchbar overflow-y-auto w-full divide-y divide-gray-light border-l border-r border-b border-gray-light`} style={{ zIndex: 9999 }}>
                <div className="inline-flex flex-col p-2">
                    <p className="text-sm font-bold">Etapy</p>
                    {
                        data && data.stages.map((val, index) => <div onMouseDown={() => navigate(`/etapa/${val.number}`)} key={index} className="p-2 text-primary hover:underline cursor-pointer">{`${formatStageNumber(val.number)} - ${val.name}`}</div>)
                    }
                </div>
                <div className="inline-flex flex-col p-2">
                    <p className="text-sm font-bold">Závodníci</p>
                    {
                        data && data.athletes.map((val, index) => <div onMouseDown={() => navigate(`/zavodnik/${val.id}`)} key={index} className="p-2 text-primary hover:underline cursor-pointer">{`${val.name} ${val.club ? `(${val.club})` : ""}`}</div>)
                    }
                </div>
                <div className="inline-flex flex-col p-2">
                    <p className="text-sm font-bold">Kluby</p>
                    {
                        data && data.clubs.map((val, index) => <div onMouseDown={() => navigate(`/klub/${val.id}`)} key={index} className="p-2 text-primary hover:underline cursor-pointer">{val.name}</div>)
                    }
                </div>
            </div>
        </div>
    )
}

const Navbar = props => {

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <header className="bg-dark h-navbar flex flex-row items-center">
                <NavbarContainer>
                    <div className="flex flex-row items-center justify-between">
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
                        <Link to="/" className="font-bold text-light text-xl">KamTT 2020</Link>
                        <div />
                    </div>
                </NavbarContainer>
            </header>
            <nav className={`${open ? "block" : "hidden"} bg-light min-h-navbar sm:flex justify-between items-center shadow-navbar`}>
                <NavbarContainer>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex flex-col sm:flex-row items-start py-4 sm:py-0 sm:pt-0 w-full">
                            <NavLink to="/" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiRepeat className="mr-2" />Novinky</NavLink>
                            <NavLink to="/etapy" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiNavigation className="mr-2" />Etapy</NavLink>
                            {/* <NavLink to="/vysledky" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiCalendar className="mr-2" />Výsledky</NavLink> */}
                            {/* <NavLink to="/changelog" component={Link} classes={menuClasses} onClick={() => setOpen(prev => !prev)}><FiGitPullRequest className="mr-2" />Changelog</NavLink> */}
                        </div>
                        <SearchBar />
                    </div>
                </NavbarContainer>
            </nav>
        </>
    );
}

export default Navbar;