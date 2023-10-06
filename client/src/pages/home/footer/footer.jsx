import { setFormVisible } from "@store/reducers/home";
import { IconPlus } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer className="fixed right-0 bottom-0 w-full px-3 py-5">
      <div className="flex items-center">
        <button
          aria-label="Add blog"
          type="button"
          onClick={() => dispatch(setFormVisible())}
          className="p-2 rounded-full bg-white active:scale-95 shadow shadow-slate-200 hover:shadow-slate-50 mx-auto"
        >
          <IconPlus className="w-10 h-10" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
