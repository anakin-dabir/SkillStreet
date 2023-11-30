import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Dimension } from "./Dimension";
import { ReelActions } from "./ReelActions";

// import Reel from "assets/Reel.jpg";
import Demo from "assets/Demo.jpg";

import Calendar from "assets/icons/calendar.svg";
import StarFilled from "assets/icons/star-filled.png";
import Star from "assets/icons/star.png";
import Fullscreen from "assets/icons/fullscreen.svg";
import FullscreenAlt from "assets/icons/fullscreen-alt.svg";
import ReelArrowDown from "assets/icons/reel-arrow-down.svg";
import ReelArrowUp from "assets/icons/reel-arrow-up.svg";

function ReelInfo() {
  return (
    <div className='flex h-full max-h-full'>
      <div className='mr-1 flex flex-1 flex-col'>
        <div className='mb-1 flex flex-1 overflow-hidden'>
          <img
            src={Demo}
            className='aspect-square h-full max-h-20 flex-shrink-0 self-stretch overflow-hidden rounded-lg object-cover object-right'
          />
          <div className='ml-3 flex-1'>
            <p className='fix-overflow-a max-w-full overflow-hidden text-ellipsis text-2xl font-bold md:text-xl'>
              Code Buzz
            </p>
            <div className='relative left-[-5px] flex md:top-[-2.5px]'>
              <img
                className='h-7 w-7 cursor-pointer md:h-5 md:w-5'
                src={StarFilled}
              />
              <img
                className='h-7 w-7 cursor-pointer md:h-5 md:w-5'
                src={Star}
              />
              <img
                className='h-7 w-7 cursor-pointer md:h-5 md:w-5'
                src={Star}
              />
              <img
                className='h-7 w-7 cursor-pointer md:h-5 md:w-5'
                src={Star}
              />
              <img
                className='h-7 w-7 cursor-pointer md:h-5 md:w-5'
                src={Star}
              />
            </div>
          </div>
        </div>
        <div className='fix-overflow text-a-black md:text-xs'>
          Java, JavaScript, Angular, C#, C++, Kotlin,Python, Ruby, Wordpress,
          Node JS, Flutter
        </div>
      </div>

      <div className='flex flex-shrink-0 flex-col items-end justify-between'>
        <div className='box-center aspect-square h-10 cursor-pointer rounded-full bg-black/[0.05] hover:bg-black/[0.1]'>
          <img className='aspect-square w-5' src={Calendar} />
        </div>
        <button className='rounded-md bg-a-yellow px-5 py-1 font-semibold transition-colors hover:bg-a-yellow/80 md:text-sm'>
          Join
        </button>
      </div>
    </div>
  );
}
interface ReelCardProps {
  cardSize: Dimension;
  setCardSize: (d: Dimension) => void;
}
export function ReelCard({ cardSize, setCardSize }: ReelCardProps) {
  const refCard = React.useRef<HTMLElement>(null);
  const [showInfo, setShowInfo] = React.useState(false);

  React.useLayoutEffect(() => {
    function update_() {
      setCardSize({
        w: refCard.current?.clientWidth || 0,
        h: refCard.current?.clientHeight || 0
      });
    }
    window.addEventListener("resize", update_);
    update_();
    return () => {
      window.removeEventListener("resize", update_);
    };
  }, []);

  const infoActiveImageHeight = 80;
  const infoActiveInvHeight = 100 - infoActiveImageHeight;

  const imageHeight = showInfo ? `${infoActiveImageHeight}%` : "100%";

  return (
    <div
      ref={refCard as any}
      className='relative w-full rounded-xl bg-white md:aspect-[14/25] md:w-auto'
    >
      <div
        className='absolute -left-20 z-30 hidden px-4 md:block'
        style={{ height: cardSize.h }}
      >
        <ReelActions />
      </div>

      {/*<motion.img
        className='absolute z-10 rounded-xl object-cover object-[75%]'
        style={{ width: cardSize.w }}
        animate={{
          height: imageHeight
        }}
        src={Reel}
      /> */}

      <motion.iframe
        className='absolute z-20 rounded-xl object-[75%]'
        style={{ width: cardSize.w }}
        animate={{
          height: imageHeight
        }}
        src='https://www.youtube.com/embed/MUl_rmB5FCs?controls=0&loop=1&autoplay=1&playlist=MUl_rmB5FCs&modestbranding=1'
        title='car chasing animation in blender 3D'
        frameBorder='0'
        allow='accelerometer; autoplay; modestbranding; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      />

      <motion.div
        // initial={{ bottom: `${infoActiveInvHeight}%` }}
        animate={{ bottom: showInfo ? `${infoActiveInvHeight}%` : "0%" }}
        className='absolute right-0 z-20 inline-flex h-auto flex-col-reverse items-center px-4 py-4'
      >
        <div
          onClick={() => setShowInfo(x => !x)}
          className='cursor-pointer rounded-full bg-black/[0.25] p-3 hover:bg-black/40'
        >
          <img
            className='h-5 w-5'
            src={showInfo ? FullscreenAlt : Fullscreen}
          />
        </div>
        <div className='mb-8 block md:hidden'>
          <ReelActions />
        </div>
      </motion.div>
      <AnimatePresence>
        {showInfo && (
          <>
            <motion.div
              key='desc'
              style={{ height: "auto", bottom: `${infoActiveInvHeight}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute left-0 z-20 inline-flex max-w-[85%] flex-col-reverse items-start p-4'
            >
              <div className='fix-overflow-b max-h-[4em] rounded-md bg-black/20 p-2.5 text-sm font-medium text-white md:max-h-[3.9em] md:text-xs'>
                <span className='font-bold'>Description:</span> YouTube shorts
                interface mocked up in Figma. All icons hand drawn
              </div>
              <div className='mb-3 rounded-md bg-black/20 p-2.5 text-sm font-semibold text-white md:text-xs'>
                3.4M views
              </div>
            </motion.div>
            <motion.div
              className='absolute left-0'
              key='info'
              style={{ top: `${infoActiveImageHeight}%` }}
              initial={{
                scale: 0.5,
                opacity: 0
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div
                style={{
                  width: cardSize.w,
                  maxWidth: cardSize.w,

                  height: cardSize.h,
                  maxHeight: cardSize.h
                }}
                className=''
              >
                <div
                  style={{
                    height: `${infoActiveInvHeight}%`,
                    maxHeight: `${infoActiveInvHeight}%`
                  }}
                  className='w-full max-w-full overflow-hidden overflow-ellipsis px-4 py-4'
                >
                  <ReelInfo />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className='absolute -right-20 z-30 mx-4 hidden h-full flex-col justify-between md:flex '>
        <div className='box-center aspect-square w-12 rounded-full bg-a-reel-arrow transition-colors hover:bg-black/20'>
          <img className='h-5 w-5' src={ReelArrowUp} />
        </div>
        <div className='box-center aspect-square w-12 rounded-full bg-a-reel-arrow transition-colors hover:bg-black/20'>
          <img className='h-5 w-5' src={ReelArrowDown} />
        </div>
      </div>
    </div>
  );
}
