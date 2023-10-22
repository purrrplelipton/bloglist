import { IconEye, IconEyeOff } from "@tabler/icons-react"
import Loader from "components/loader"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { verify } from "services/auth"
import { appendNotification, setUser } from "store/reducers/global"

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [verifying, setVerifying] = useState(false)
  const [passwordVisible, setPasswordVisibility] = useState(false)

  async function verifyDetails(e) {
    e.preventDefault()
    setVerifying(true)
    try {
      const id = await verify({
        email$alias: e.target.username.value,
        password: e.target.password.value,
        rememberMe: e.target.retain.checked,
      })
      dispatch(setUser(id))
      dispatch(
        appendNotification({
          message: "Sign in successful",
          color: "success",
        }),
      )
      setPasswordVisibility(false)
      navigate("/", { replace: true })
    } catch (error) {
      dispatch(
        appendNotification({
          message: error.message,
          color: "error",
        }),
      )
    }
    setVerifying(false)
  }

  return (
    <div
      role="main"
      className="flex flex-col items-stretch justify-center min-h-full gap-5 p-5"
    >
      <div className="my-4">
        <h1 className="text-4xl text-slate-600">Welcome</h1>
        <p className="text-sm text-slate-800">Enter your details</p>
      </div>
      <form
        className="flex flex-col items-stretch gap-3"
        onSubmit={verifyDetails}
      >
        <input
          type="text"
          name="username"
          autoComplete="off"
          placeholder="Email | Username"
          className="px-3 py-2 rounded-md outline-none focus:bg-slate-50"
        />
        <label className="relative flex items-center overflow-hidden rounded-md focus-within:bg-slate-50">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full py-2 pl-3 outline-none bg-inherit"
          />
          <button
            type="button"
            onClick={() =>
              setPasswordVisibility((previousState) => !previousState)
            }
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            className="p-2 rounded-md outline-none focus:bg-slate-100"
          >
            {passwordVisible ? <IconEyeOff /> : <IconEye />}
          </button>
        </label>
        <label className="flex items-center self-start gap-1">
          <input
            type="checkbox"
            name="retain"
            className="w-4 aspect-square accent-white"
          />
          <span className="text-sm">Remember me for 30 days</span>
        </label>
        <Link
          to="/password-reset"
          className="self-end text-xs underline focus:no-underline"
        >
          Forgot password
        </Link>
        <button
          type="submit"
          aria-disabled={verifying}
          className="relative p-3 bg-yellow-300 aria-disabled:bg-yellow-100 active:scale-95 aria-disabled:active:scale-100 rounded-xl"
        >
          {verifying && <i className="block h-6" />}
          {verifying ? <Loader width={22} /> : "Sign In"}
        </button>
      </form>
      <p className="text-sm text-center">
        Don&apos;t have an account?&nbsp;
        <Link to="/sign-up" className="underline focus:no-underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignIn
