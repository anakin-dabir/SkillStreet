import cx from "classnames";
import React, { useContext, createContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SearchDrawer } from "./SearchDrawer";

import Logo from "assets/logo.png";
import Search from "assets/Search.svg";
import Cross from "assets/cross.svg";
import SearchAlt from "assets/search-alt.svg";
import TopMore from "assets/top-more.svg";
import DropdownArrow from "assets/dropdown-arrow.svg";
import User from "assets/user.svg";
import Profile from "assets/profile.png";
import Bell from "assets/bell.svg";
import DrawerArrow from "assets/drawer-arrow.svg";
import Moon from "assets/sidebar/moon.svg";
import Sun from "assets/sidebar/sun.svg";

const DrawerContext = createContext({
  expanded: false,
  setExpanded: (x: boolean) => {},
  subcats: false,
  setSubcats: (x: boolean) => {},
  userNav: false,
  setUserNav: (x: boolean) => {}
});

function UserProfile() {
  return (
    <>
      <img className='ml-4 lg:ml-10' src={Bell} />
      <img
        className='ml-4 mr-1 h-8 w-8 self-center rounded-full border-2 border-a-yellow lg:ml-10 lg:mr-4'
        src={Profile}
      />
    </>
  );
}

export function TopBar() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [subcats, setSubcats] = React.useState(false);
  const [userNav, setUserNav] = React.useState(false);

  const [catDropdown, setCatDropdown] = React.useState(false);

  React.useEffect(() => {
    function listener() {
      setCatDropdown(false);
    }

    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };

  }, []);

  return (
    <DrawerContext.Provider
      value={{
        expanded,
        setExpanded: value => {
          if (!value) {
            setSubcats(false);
            setUserNav(false);
          }
          setExpanded(value);
        },
        subcats,
        setSubcats,
        userNav,
        setUserNav
      }}
    >
      <Drawer setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <SearchDrawer
        open={searchDrawerOpen}
        onClose={() => setSearchDrawerOpen(false)}
      />
      <div
        className='
          fixed
          left-0 top-0 z-50 flex
          h-16 w-full items-center
          justify-between
          border-b border-a-bar-border bg-a-bar px-2 py-2
          lg:px-4
        '
      >
        <div
          onClick={() => setSearchDrawerOpen(true)}
          className='block active:bg-white/10 md:hidden'
        >
          <img className='mx-4' src={SearchAlt} />
        </div>
        <img src={Logo} className='h-full py-2 lg:ml-8' />
        <div
          className='mx-4 block active:bg-white/10 md:hidden'
          onClick={() => setExpanded(true)}
        >
          <img src={TopMore} />
        </div>

        <div className='hidden flex-1 justify-end md:flex'>
          <div className='ml-4 flex h-10 w-[60%] overflow-hidden rounded-full border border-a-bar-border'>
            <input
              placeholder='What do you want to learn?'
              type='search'
              size={1}
              className='h-full flex-1 appearance-none bg-transparent px-4 font-medium text-[#f0f0f0] outline-none'
            />
            <button className='box-center w-24 bg-[#333539] hover:bg-a-bar-border'>
              <img src={Search} />
            </button>
          </div>

          <button onClick={(e) => { e.stopPropagation(); setCatDropdown(x => !x) }} className='relative ml-2 flex h-10 items-center rounded-full bg-a-yellow px-3 py-1 text-sm font-semibold transition-colors hover:bg-a-yellow/80 lg:ml-4'>
            Categories
            <img className='relative top-[1px] ml-2 w-3' src={DropdownArrow} />
            {catDropdown && <div className="absolute bottom-[-15px] top-full left-0 ">
              <div className="text-white bg-a-reel-arrow py-2 shadow-lg border-a-bar-border border-2 rounded-lg">
                <p onClick={(e) => { e.stopPropagation(); setCatDropdown(false); }} className='px-3 py-2 hover:bg-a-bg whitespace-nowrap font-semibold text-white'>SubCategory 1</p>
                <p onClick={(e) => { e.stopPropagation(); setCatDropdown(false); }} className='px-3 py-2 hover:bg-a-bg whitespace-nowrap font-semibold text-white'>SubCategory 2</p>
                <p onClick={(e) => { e.stopPropagation(); setCatDropdown(false); }} className='px-3 py-2 hover:bg-a-bg whitespace-nowrap font-semibold text-white'>SubCategory 3</p>
              </div>
            </div>}
          </button>
          <button className='ml-2 h-10 rounded-full bg-a-yellow px-3 py-1 text-sm font-semibold transition-colors hover:bg-a-yellow/80 lg:ml-4'>
            SkillShorts
          </button>
          {loggedIn ? (
            <UserProfile />
          ) : (
            <button
              onClick={() => setLoggedIn(true)}
              className='ml-2 h-10 whitespace-nowrap rounded-full bg-a-yellow px-4 py-1 text-sm font-semibold transition-colors hover:bg-a-yellow/80 lg:ml-4'
            >
              Login/Sign up
            </button>
          )}
        </div>
      </div>
    </DrawerContext.Provider>
  );
}

/* =================== */

function Overlay() {
  const { expanded, setExpanded } = useContext(DrawerContext);
  if (!expanded) return null;
  return (
    <div
      id='overlay'
      className='fixed left-0 top-0 z-[79] h-screen w-screen bg-black/80'
      onClick={() => setExpanded(false)}
    ></div>
  );
}

function CompactThemeToggle() {
  return (
    <div className='absolute bottom-0 w-full max-w-full'>
      <div className='m-6 flex items-center'>
        <div className='inline-flex items-center rounded-full bg-a-gray p-1.5'>
          <div className='box-center mr-1 w-fit rounded-full border-2 border-[#6C6C6C] bg-[#979797] p-2'>
            <img src={Sun} />
          </div>
          <div className='box-center ml-1 w-fit rounded-full border-2 border-white bg-a-gray p-2'>
            <img src={Moon} />
          </div>
        </div>
        <p className='ml-4 font-semibold text-white'>Dark Mode</p>
      </div>
    </div>
  );
}

// @ts-ignore
interface CategoryProps {
  label: string;
  onClick?: () => void;
  className?: string;
}
function Category({ label, onClick, className }: CategoryProps) {
  return (
    <div
      onClick={onClick}
      className={cx("flex cursor-pointer px-8 py-4", className)}
    >
      <p className='font-semibold text-white'>{label}</p>
      <div className='flex-grow' />
      <div className='self-center'>
        <img src={DrawerArrow} />
      </div>
    </div>
  );
}

interface DrawerProps {
  loggedIn: boolean;
  setLoggedIn: (_: boolean) => void;
}
export function Drawer({ loggedIn, setLoggedIn }: DrawerProps) {
  const { expanded, setExpanded, subcats, setSubcats, setUserNav, userNav } =
    useContext(DrawerContext);

  return (
    <div className='contents md:hidden'>
      <motion.div
        initial={{ width: "0vw" }}
        animate={{ width: expanded ? "83vw" : "0vw" }}
        transition={{ duration: 0.1 }}
        className={cx(
          "group fixed right-0 top-0 z-[80] h-full border-l-2 border-a-bar-border bg-a-bar",
          !expanded && "closed"
        )}
      >
        <div className='relative h-full'>
          {loggedIn ? (
            !userNav ? (
              <div
                onClick={() => setUserNav(true)}
                className='flex bg-a-bg px-8'
              >
                <img
                  className='mx-6 h-16 w-16 self-center rounded-full border-2 border-a-yellow lg:ml-10 lg:mr-4'
                  src={Profile}
                />
                <div className='py-10'>
                  <p className='font-bold text-a-yellow'>
                    Hi, <br /> Ravi Kr. Jangid
                  </p>
                  <p className='font-medium text-white'>Welcome back</p>
                </div>
                <div className='flex-grow' />
                <div className='self-center'>
                  <img src={DrawerArrow} />
                </div>
              </div>
            ) : (
              [...Array(3)].map((_, i) => (
                <Category
                  onClick={() => {
                    setExpanded(false);
                  }}
                  key={i}
                  className='border border-a-bar-border bg-a-bg'
                  label={"Profile Nav " + (i + 1)}
                />
              ))
            )
          ) : (
            <div className='flex items-center bg-a-bg'>
              <img className='ml-10 mr-5' src={User} />
              <p
                className='mr-2 cursor-pointer whitespace-nowrap text-lg font-semibold text-white'
                onClick={() => setLoggedIn(true)}
              >
                Login/Sign up
              </p>
              <div className='flex-grow' />
              <div
                className='self-stretch border-l border-a-bar-border p-7 active:bg-white/10'
                onClick={() => setExpanded(false)}
              >
                <img src={Cross} />
              </div>
            </div>
          )}

          {!subcats ? (
            <Category
              className='border border-a-bar-border bg-a-reel-arrow'
              onClick={() => setSubcats(true)}
              label='Categories'
            />
          ) : (
            [...Array(3)].map((_, i) => (
              <Category
                onClick={() => {
                  setExpanded(false);
                }}
                key={i}
                label={"Subcategory " + (i + 1)}
                className='border border-a-bar-border bg-a-reel-arrow'
              />
            ))
          )}

          <CompactThemeToggle />
        </div>
      </motion.div>
      <Overlay />
    </div>
  );
}
