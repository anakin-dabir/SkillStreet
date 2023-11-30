import SearchAlt from "assets/search-alt.svg";
import Cross from "assets/cross.svg";
import { AnimatePresence, motion } from "framer-motion";

interface SearchDrawerProps {
  onClose?: () => void;
  open?: boolean;
}
export function SearchDrawer(props: SearchDrawerProps) {
  return (
    <AnimatePresence>
      {props.open && (
        <motion.div
          initial={{ height: "0%" }}
          animate={{
            height: "100%"
          }}
          exit={{ height: "0%" }}
          transition={{ ease: "easeOut" }}
          className='fixed left-0 top-0 z-[80] h-full w-full bg-a-bg'
        >
          <div className='flex h-16 border-b-2 border-a-bar-border'>
            <div className='box-center pl-6 pr-2'>
              <img className='w-7' src={SearchAlt} />
            </div>
            <input
              size={1}
              className='flex-1 bg-transparent px-4 text-white outline-none'
              placeholder='Search...'
            />
            <div className='box-center px-4 active:bg-white/10' onClick={() => props.onClose?.()}>
              <img className='w-5' src={Cross} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
