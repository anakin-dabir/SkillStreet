import More from "assets/icons/more.svg";
import Follow from "assets/icons/follow.svg";
import Share from "assets/icons/share.svg";
import Comments from "assets/icons/comments.svg";
import Dislike from "assets/icons/dislike.svg";
import Liked from "assets/icons/liked.svg";
import Like from "assets/icons/like.svg";

interface ReelActionButtonProps {
  iconSrc: string;
  label?: string;
}
function ReelActionButton({ iconSrc, label }: ReelActionButtonProps) {
  return (
    <div className='mt-3'>
      <div className='box-center w-11 h-11 md:h-12 md:w-12 cursor-pointer overflow-hidden rounded-full bg-black/[0.25] p-3 hover:bg-black/[0.5] md:bg-white/10 md:hover:bg-white/20'>
        <img className='h-auto w-[85%]' src={iconSrc} />
      </div>
      {label && label !== "" && (
        <p className='action-btn-shadow mt-1.5 text-center text-sm text-white'>
          {label}
        </p>
      )}
    </div>
  );
}
export function ReelActions() {
  return (
    <div className='flex h-full flex-col items-center justify-end'>
      <ReelActionButton iconSrc={Liked} label='Like' />
      <ReelActionButton iconSrc={Dislike} label='Dislike' />
      <ReelActionButton iconSrc={Comments} label='806' />
      <ReelActionButton iconSrc={Share} label='Share' />
      <ReelActionButton iconSrc={Follow} label='Follow' />
      <ReelActionButton iconSrc={More} />
    </div>
  );
}
