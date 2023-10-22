import { IconX } from "@tabler/icons-react"
import { bool, func } from "prop-types"
import React from "react"

function Backdrop(props) {
  const { isOpen, onClose, ...rest } = props

  return (
    isOpen && (
      <div
        className={`${
          rest.fixed ? "absolute" : "fixed"
        } top-0 right-0 bottom-0 left-0 z-[100] bg-black bg-opacity-5 backdrop-blur-sm`}
        onClick={onClose}
        role="presentation"
      >
        <div className="relative flex items-center justify-center h-full">
          <button
            type="button"
            aria-label="Close form"
            className="absolute top-0 right-0 p-1 -translate-x-6 translate-y-8 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <IconX />
          </button>
          {rest.children}
        </div>
      </div>
    )
  )
}

Backdrop.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
}

export default Backdrop
