import cx from "classnames";
import React, { useContext, createContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Subscriptions from "assets/sidebar/subscriptions.svg";
import WatchLater from "assets/sidebar/watch-later.svg";
import History from "assets/sidebar/history.svg";
import YourVideos from "assets/sidebar/your-videos.svg";
import Saved from "assets/sidebar/saved.svg";
import LikedVideos from "assets/sidebar/liked-videos.svg";
import Settings from "assets/sidebar/settings.svg";
import Manage from "assets/sidebar/manage.svg";

import SidebarArrow from "assets/sidebar/arrow.svg";
import Moon from "assets/sidebar/moon.svg";
import Sun from "assets/sidebar/sun.svg";

const SidebarStateContext = createContext({
  expanded: false,
  setExpanded: (x: boolean) => {}
});

function Overlay() {
  const { expanded, setExpanded } = useContext(SidebarStateContext);
  if (!expanded) return null;
  return (
    <div
      id='overlay'
      className='fixed left-0 top-0 z-[59] h-screen w-screen bg-black/80'
      onClick={() => setExpanded(false)}
    ></div>
  );
}

interface SidebarLinkProps {
  label: string;
  iconUrl: string;
}
function SidebarLink(props: SidebarLinkProps) {
  const { expanded, setExpanded } = useContext(SidebarStateContext);

  const ref = React.useRef<HTMLElement>();

  const handleClick = () => {
    let elem = ref.current;
    if (!elem)
      return;

    // only close the sidebar on mobile
    if (Boolean(elem.closest('.mobile')))
      setExpanded(false);
  }

  return (
    <p ref={ref as any} className='sidelink' onClick={handleClick}>
      <img src={props.iconUrl} />
      {expanded && (
        <motion.span
          initial={{ height: 0, opacity: 0, width: "0" }}
          animate={{ height: "auto", opacity: [0, 0, 1], width: "auto" }}
          className='sidename'
        >
          {props.label}
        </motion.span>
      )}
    </p>
  );
}
function ThemeToggle() {
  const { expanded } = useContext(SidebarStateContext);

  return (
    <div className='absolute bottom-0 w-full max-w-full'>
      <div className='box-center mx-4 h-24 border-t border-a-bar-border py-4'>
        <AnimatePresence mode='wait'>
          {expanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              key='long'
              className='flex flex-1 overflow-hidden rounded-full bg-a-gray p-1.5'
            >
              <div className='flex flex-1 flex-shrink-0 items-center rounded-full p-1'>
                <img className='mx-2' src={Sun} />
                <span className='ml-2 flex-1 text-sm font-semibold text-[#6C6C6C]'>
                  Light
                </span>
              </div>
              <div className='flex flex-1 flex-shrink-0 items-center rounded-full bg-white p-1'>
                <span className='ml-4 flex-1 text-sm font-medium text-a-gray'>
                  Dark
                </span>
                <div className='aspect-square rounded-full bg-a-gray p-1'>
                  <img src={Moon} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key='short'
              className='box-center rounded-full border-2 border-white bg-a-gray p-1'
            >
              <img src={Moon} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
function Content() {
  return (
    <div className='mt-12 group-[.closed]:[&>img]:m-0'>
      <SidebarLink iconUrl={Subscriptions} label='Subscriptions' />
      <SidebarLink iconUrl={WatchLater} label='Watch later' />
      <SidebarLink iconUrl={History} label='History' />
      <SidebarLink iconUrl={YourVideos} label='Your videos' />
      <SidebarLink iconUrl={Saved} label='Saved' />
      <SidebarLink iconUrl={LikedVideos} label='Liked videos' />
      <SidebarLink iconUrl={Settings} label='Settings' />
      <SidebarLink iconUrl={Manage} label='Manage' />
    </div>
  );
}

function CollapseButton() {
  const { expanded, setExpanded } = useContext(SidebarStateContext);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className='
        box-center absolute right-0 top-24 z-[75] aspect-square w-12 translate-x-1/2 rounded-full
        bg-a-yellow hover:bg-a-yellow/90 active:bg-a-yellow/90 md:top-4
        md:w-7
      '
    >
      <motion.img
        animate={{ rotate: expanded ? -180 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className='relative w-2 group-[.closed]:left-2 md:static'
        src={SidebarArrow}
      />
    </div>
  );
}

export function Sidebar() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <SidebarStateContext.Provider value={{ expanded, setExpanded }}>
      <div className='contents md:hidden'>
        <motion.div
          initial={{ width: "0vw" }}
          animate={{ width: expanded ? "83vw" : "0vw" }}
          className={cx(
            "mobile group fixed left-0 top-0 z-[60] h-full border-r-2 border-a-bar-border bg-a-bar",
            !expanded && "closed"
          )}
        >
          <CollapseButton />
          <div className='max-w-full overflow-hidden'>
            <div className='min-w-screen h-full w-screen'>
              <Content />
            </div>
          </div>
        </motion.div>
        <Overlay />
      </div>
      <div className='hidden md:contents'>
        <motion.div
          initial={{ width: "0vw" }}
          animate={{ width: expanded ? "25%" : "" }}
          className={cx(
            "group relative hidden max-w-[250px] cursor-pointer border-r border-a-bar-border bg-a-bar md:block",
            !expanded && "closed"
          )}
        >
          <CollapseButton />
          <Content />

          <ThemeToggle />
        </motion.div>
      </div>
    </SidebarStateContext.Provider>
  );
}
