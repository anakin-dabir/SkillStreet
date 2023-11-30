import React from "react";

import { Dimension } from "./Dimension";
import { ReelCard } from "./ReelCard";

import Reel from "assets/Reel.jpg";
import GoLive from "assets/icons/go-live.svg";
import VideoRecord from "assets/icons/vid-record.svg";
import VideoUpload from "assets/icons/vid-upload.svg";

export function Reels() {
  const [cardSize, setCardSize] = React.useState<Dimension>({ w: 0, h: 0 });

  const sizeStyle = { width: cardSize.w, height: cardSize.h };

  return (
    <div className='relative flex flex-1 flex-col'>
      <div className='flex flex-1 justify-center p-2 md:px-8 md:py-4'>
        <ReelCard cardSize={cardSize} setCardSize={setCardSize} />
      </div>
      <div className='relative hidden h-[12%] pt-8 md:block'>
        <div className='preview-overlay' />
        <div className='mx-auto rounded-xl bg-white' style={sizeStyle}>
          <img
            className='absolute rounded-xl object-cover object-[75%]'
            style={sizeStyle}
            src={Reel}
          />
        </div>
      </div>

      <div className='absolute right-0 top-0 hidden pr-2.5 pt-2.5 md:block lg:pr-8'>
        <div className='flex flex-col overflow-hidden rounded-full border border-a-bar-border lg:flex-row'>
          <img
            className='cursor-pointer py-2 transition-colors hover:bg-black/20 lg:px-3 lg:py-0 lg:first:pl-6 lg:last:pr-6'
            src={VideoUpload}
          />
          <img
            className='cursor-pointer py-2 transition-colors hover:bg-black/20 lg:px-3 lg:py-0 lg:first:pl-6 lg:last:pr-6'
            src={VideoRecord}
          />
          <img
            className='cursor-pointer py-2 transition-colors hover:bg-black/20 lg:px-3 lg:py-0 lg:first:pl-6 lg:last:pr-6'
            src={GoLive}
          />
        </div>
      </div>
    </div>
  );
}
