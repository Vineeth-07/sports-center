import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const loggedInUser = [
  { name: "Preferences", href: "/preferences" },
  { name: "Sign out", href: "/logout" },
];

const guestUser = [
  { name: "Sign up", href: "/users" },
  { name: "Sign in", href: "/users/sign_in" },
];

type User = string | null;

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const authToken: User = localStorage.getItem("authToken");

  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (authToken) {
      setUser(authToken);
    } else {
      setUser(null);
    }
  }, [authToken]);
  let handler = user ? loggedInUser : guestUser;

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200 bg-purple-300">
        {({}) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link to={"/"}>
                {" "}
                <img src={logo} className="w-14 h-14" />
              </Link>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h3 className="mb-2 text-[2em] font-bold tracking-tight text-gray-900 dark:text-white">
                    SportsBuzz
                  </h3>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {handler.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
