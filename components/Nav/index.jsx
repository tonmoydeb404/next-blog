import Link from "next/link";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import NavTheme from "./NavTheme";

const Nav = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav_container">
          <Link href={"/"}>
            <a>
              <h1 className="nav_brand ">
                <span>NEXT</span> Blog
              </h1>
            </a>
          </Link>

          <NavLinks className="hidden md:flex" />

          <div className="nav_actions">
            <NavTheme />
            <NavSearch />
          </div>
        </div>
      </nav>

      <div className="nav_container-mobile ">
        <NavLinks className="text-sm" />
      </div>
    </>
  );
};

export default Nav;
