import Backdrop from "assets/backdrop.png";

import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { Reels } from "./components/Reels";

export function App() {
  return (
    <div
      className='h-full bg-a-bg/[65] bg-contain'
      style={{
        backgroundImage: `url(${Backdrop})`
      }}
    >
      <TopBar />
      <div className='flex h-full pt-16'>
        <Sidebar />
        <Reels />
      </div>
    </div>
  );
}
