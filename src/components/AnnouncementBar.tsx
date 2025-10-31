import { MdOutlineClear } from "react-icons/md";
import { SignUpButton, SignedOut } from "@clerk/nextjs";

function AnnouncementBar() {
  return (
    <div className='w-full h-[38px] bg-black text-white flex justify-center items-center max-w-screen-2xl mx-auto'>
      {/* Left side */}
      <div className='flex items-center space-x-2'>
        <h1 className='text-[8px] md:text-xs '>
          Sign up and get 20% off to your first order.
        </h1>
        <SignedOut>
          <SignUpButton mode="modal">
            <button className='underline underline-offset-4 text-xs md:text-sm'>
              Sign Up Now
            </button>
          </SignUpButton>
        </SignedOut>
      </div>

      <MdOutlineClear className="hidden md:block absolute right-[100px] text-xl text-white"/>
    </div>
  );
}

export default AnnouncementBar;