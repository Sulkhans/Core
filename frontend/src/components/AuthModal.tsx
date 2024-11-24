import { Fragment, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  close: () => void;
};

const AuthModal = ({ isOpen, close }: Props) => {
  const [isRegistered, setIsRegistered] = useState(true);
  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="flex justify-center items-center fixed inset-0 z-50 overflow-hidden">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={close}
            className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
          />
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-700"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 -translate-y-0"
          leave="ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed w-full px-4">
            <div className="w-full max-w-[22rem] mx-auto p-6 rounded-md bg-white">
              {isRegistered ? (
                <form action="" className="flex flex-col gap-4 text-center">
                  <h1>Log in to your account</h1>
                  <input
                    placeholder="Email"
                    className="rounded-md px-4 py-2 bg-core-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="rounded-md px-4 py-2 bg-core-white"
                  />
                  <button className="bg-core-main hover:bg-core-dark active:bg-core-dark py-2 rounded-md text-white transition-colors">
                    Log in
                  </button>
                  <p className="text-sm text-pretty">
                    Don't have an account?{" "}
                    <span
                      onClick={() => setIsRegistered(false)}
                      className="font-medium text-core-main cursor-pointer"
                    >
                      Sign up
                    </span>
                  </p>
                </form>
              ) : (
                <form action="" className="flex flex-col gap-4 text-center">
                  <h1>Create a new account</h1>
                  <div className="flex gap-4 *:w-1/2">
                    <input
                      placeholder="First name"
                      className="rounded-md px-4 py-2 bg-core-white"
                    />
                    <input
                      placeholder="Last name"
                      className="rounded-md px-4 py-2 bg-core-white"
                    />
                  </div>
                  <input
                    placeholder="Email"
                    className="rounded-md px-4 py-2 bg-core-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="rounded-md px-4 py-2 bg-core-white"
                  />

                  <button className="bg-core-main hover:bg-core-dark active:bg-core-dark py-2 rounded-md text-white transition-colors">
                    Sign up
                  </button>
                  <p className="text-sm text-pretty">
                    Already have an account?{" "}
                    <span
                      onClick={() => setIsRegistered(true)}
                      className="font-medium text-core-main cursor-pointer"
                    >
                      Log in
                    </span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default AuthModal;
