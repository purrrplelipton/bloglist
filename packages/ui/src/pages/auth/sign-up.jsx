import { IconEye, IconEyeOff } from "@tabler/icons-react"
import Loader from "components/loader"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import usersApi from "services/users"
import { appendNotification } from "store/reducers/global"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [passwordVisible, setPasswordVisibilty] = useState(false)
  const [creatingAccount, setAccountCreationState] = useState(false)
  const [acceptedToS, setAcceptedToS] = useState(false)

  async function submitDetails(e) {
    e.preventDefault()
    if (
      !e.target.firstname.value.trim() ||
      !e.target.lastname.value.trim() ||
      !e.target.email.value.trim() ||
      !e.target.password.value.trim()
    )
      return
    setAccountCreationState(true)
    try {
      await usersApi.post({
        name: {
          first: e.target.firstname.value,
          last: e.target.lastname.value,
        },
        email: e.target.email.value,
        password: e.target.password.value,
      })
      dispatch(
        appendNotification({
          message: "Account created successfully",
          color: "success",
        }),
      )
      navigate("/sign-in", { replace: true })
    } catch (error) {
      dispatch(
        appendNotification({
          message: error.message,
          color: "error",
        }),
      )
    }
    setAccountCreationState(false)
  }

  return (
    <div
      role="main"
      className="flex flex-col items-stretch justify-center min-h-full gap-5 p-5"
    >
      <form
        className="flex flex-col items-stretch gap-3"
        onSubmit={submitDetails}
      >
        <div className="flex items-center overflow-hidden rounded focus-within:bg-slate-50">
          <input
            type="text"
            name="firstname"
            className="w-1/2 py-2 pl-3 pr-1 transition bg-transparent outline-none focus:bg-slate-100"
            placeholder="First Name"
            autoComplete="off"
          />
          <input
            type="text"
            name="lastname"
            className="w-1/2 py-2 pl-1 pr-3 transition bg-transparent outline-none focus:bg-slate-100"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          className="px-3 py-2 transition rounded outline-none focus:bg-slate-50"
        />
        <label className="flex items-center overflow-hidden rounded focus-within:bg-slate-50">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="w-full py-2 pl-3 transition bg-transparent outline-none"
            autoComplete="off"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => {
              setPasswordVisibilty((previousState) => !previousState)
            }}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            className="p-2 outline-none focus:bg-slate-100"
          >
            {passwordVisible ? <IconEyeOff /> : <IconEye />}
          </button>
        </label>
        <label className="flex items-center self-start gap-1">
          <input
            type="checkbox"
            name="tos"
            className="w-4 aspect-square accent-white"
            checked={acceptedToS}
            onChange={({ target: { checked } }) => setAcceptedToS(checked)}
          />
          <span className="text-sm">I agree to the Tobi Terms of Service</span>
        </label>
        <button
          type="submit"
          aria-disabled={!acceptedToS}
          className="relative p-3 bg-yellow-300 rounded-lg aria-disabled:bg-yellow-100 active:scale-95 aria-disabled:active:scale-100"
        >
          {creatingAccount ? <Loader width={22} /> : "Sign Up"}
          {creatingAccount && <i className="h-6" />}
        </button>
      </form>
      <p className="text-sm text-center">
        Already have an account?&nbsp;
        <Link to="/sign-in" className="underline focus:no-underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default SignUp
