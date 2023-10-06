import BloggerzonSVG from "@assets/vectors/bloggerzon-svg";
import Backdrop from "@components/backdrop";
import { IconHeartFilled, IconHome, IconUser } from "@tabler/icons-react";
import { connect, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { hideDrawer } from "@store/reducers/common";

const navigations = [
  {
    href: "/",
    aria: "Link to main page",
    id: uuidv4(),
    icon: <IconHome className="flex-shrink-0 mx-3" />,
    label: "Home",
  },
  {
    href: "/favorites",
    aria: "Link to my favorites",
    id: uuidv4(),
    icon: <IconHeartFilled className="flex-shrink-0 mx-3" />,
    label: "Favorites",
  },
  {
    href: "/my-blogs",
    aria: "Link to my blogs",
    id: uuidv4(),
    icon: <IconUser className="flex-shrink-0 mx-3" />,
    label: "My blogs",
  },
];

const Drawer = ({ showDrawer }) => {
  const dispatch = useDispatch();

  return (
    showDrawer && (
      <>
        <Backdrop isOpen={showDrawer} onClose={() => dispatch(hideDrawer())} />
        <div className="flex flex-col h-full fixed top-0 left-0 w-full max-w-[280px] bg-white z-50">
          <div className="flex items-center gap-3 p-2 mx-auto rounded-lg bg-slate-50">
            <BloggerzonSVG />
            <span>Bloggerzon</span>
          </div>
          <nav className="flex-grow flex-shrink-0 mt-2 basis-auto">
            {navigations.map(({ href, aria, id, icon, label }) => (
              <NavLink
                key={id}
                to={href}
                className={({ isActive }) =>
                  `flex items-center w-full overflow-hidden h-12 min-w-[3rem] pl-3 rounded-tr-full rounded-br-full ${
                    isActive ? "bg-slate-100" : ""
                  }`
                }
                aria-label={aria}
              >
                {icon}
                <span className="ml-5 overflow-hidden text-ellipsis whitespace-nowrap">
                  {label}
                </span>
              </NavLink>
            ))}
          </nav>
          <div className="flex-grow-0 flex-shrink-0 basis-auto">
            <a
              href="https://github.com/purrrplelipton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mx-auto"
            >
              Purrrplelipton
            </a>
          </div>
        </div>
      </>
    )
  );
};

const mapStateToProps = (state) => ({ showDrawer: state.common.showDrawer });

export default connect(mapStateToProps)(Drawer);
