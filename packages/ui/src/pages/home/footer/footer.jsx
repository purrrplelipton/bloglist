import { IconPlus } from "@tabler/icons-react"
import React from "react"
import { useDispatch } from "react-redux"
import { setFormVisible } from "store/reducers/home"

const Footer = () => {
  const dispatch = useDispatch()

  return (
    <footer className="fixed bottom-0 right-0 w-full px-3 py-5">
      <div className="flex items-center">
        <button
          aria-label="Add blog"
          type="button"
          onClick={() => dispatch(setFormVisible())}
          className="p-2 mx-auto bg-white rounded-full shadow active:scale-95 shadow-slate-200 hover:shadow-slate-50"
        >
          <IconPlus className="w-10 h-10" />
        </button>
      </div>
    </footer>
  )
}

export default Footer
