import { IconX } from "@tabler/icons-react";
import { bool, element, func, node, oneOfType, string } from "prop-types";

const Backdrop = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-[#0001] backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
        role="presentation"
      >
        <button
          type="button"
          aria-label="Close form"
          className="absolute top-0 right-0 p-1 -translate-x-6 translate-y-8 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <IconX />
        </button>
        {children}
      </div>
    )
  );
};

Backdrop.defaultProps = {
  children: null,
};

Backdrop.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  children: oneOfType([node, element, string]),
};

export default Backdrop;
