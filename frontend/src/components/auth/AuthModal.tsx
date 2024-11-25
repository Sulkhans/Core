import { Fragment, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import Login from "./Login";
import Signup from "./Signup";

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
                <Login toggle={() => setIsRegistered(false)} close={close} />
              ) : (
                <Signup toggle={() => setIsRegistered(true)} close={close} />
              )}
            </div>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default AuthModal;
