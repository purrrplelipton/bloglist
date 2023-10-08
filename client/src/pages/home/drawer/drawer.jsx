import DG_Chronicles from "@assets/vectors/dg_chronicles";
import Backdrop from "@components/backdrop";
import { signOutHandler } from "@src/hooks";
import { hideDrawer } from "@store/reducers/common";
import {
  IconHeartFilled,
  IconHome,
  IconArrowBarLeft,
  IconUser,
} from "@tabler/icons-react";
import { connect, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const navigations = [
  {
    href: "/",
    label: "Link to main page",
    icon: <IconHome className="flex-shrink-0 mx-3" />,
    title: "Home",
  },
  {
    href: "/favorites",
    label: "Link to my favorites",
    icon: <IconHeartFilled className="flex-shrink-0 mx-3" />,
    title: "Favorites",
  },
  {
    href: "/my-blogs",
    label: "Link to my blogs",
    icon: <IconUser className="flex-shrink-0 mx-3" />,
    title: "My blogs",
  },
];

const Drawer = ({ showDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignOut() {
    signOutHandler();
    navigate("/sign-in");
  }

  return (
    showDrawer && (
      <>
        <Backdrop isOpen={showDrawer} onClose={() => dispatch(hideDrawer())} />
        <div className="flex flex-col gap-5 h-full fixed top-0 left-0 w-full max-w-[280px] bg-white z-50 py-5">
          <div className="flex items-center gap-3 p-2 mx-auto my-1 rounded-lg bg-slate-50">
            <DG_Chronicles />
            <span className="capitalize">bloggerzon</span>
          </div>
          <nav className="flex-grow flex-shrink-0 basis-auto">
            {navigations.map(({ href, label, icon, title }) => (
              <NavLink
                key={v4()}
                to={href}
                className={({ isActive }) =>
                  `flex items-center w-full overflow-hidden h-12 min-w-[3rem] pl-3 rounded-tr-full rounded-br-full ${
                    isActive ? "bg-slate-50 font-bold" : "font-light"
                  }`
                }
                aria-label={label}
              >
                {icon}
                <span className="ml-5 overflow-hidden text-ellipsis whitespace-nowrap">
                  {title}
                </span>
              </NavLink>
            ))}
          </nav>
          <div className="flex-grow-0 flex-shrink-0 basis-auto">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center justify-center gap-1 px-2 py-1 mx-auto rounded-md bg-slate-50"
            >
              <IconArrowBarLeft className="text-red-400" />
              <span className="capitalize">sign out</span>
            </button>
          </div>
        </div>
      </>
    )
  );
};

const mapStateToProps = (state) => ({ showDrawer: state.common.showDrawer });

export default connect(mapStateToProps)(Drawer);
