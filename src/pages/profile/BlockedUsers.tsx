import { useState } from "react";
import Input from "../../components/ui/Input";

const BlockedUsers = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between pt-5 pb-10">
      <div className="w-full space-y-15">
        <p className="text-center text-2xl">You aren't blocking anyone.</p>

        <div className="w-full px-5">
          <button
            className="border-primary hover:bg-primary w-full rounded-lg border-2 py-1 font-bold duration-50 hover:text-black active:scale-99"
            onClick={() => setShowModal((prev) => !prev)}
          >
            Block User
          </button>

          <div
            className={`${
              showModal
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-5 scale-90 opacity-0"
            } relative mt-1 h-65 transform rounded-xl bg-[#201D27] p-5 transition-all duration-200`}
          >
            <div className="absolute -top-2.5 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-[#201D27] border-l-transparent"></div>
            <form
              action="/api/user/block"
              method="POST"
              className="flex h-full flex-col justify-between rounded-xl bg-[#2A2731] p-5"
            >
              <div>
                <label htmlFor="username" className="font-bold">
                  Username
                </label>

                <div className="full mt-3 flex items-center rounded-lg border border-white/25 duration-300 outline-none focus-within:border-white/100">
                  <span className="ml-3 opacity-50">@</span>
                  <Input id="username" className="border-0 pl-0.5" />
                </div>
              </div>
              <button className="bg-primary self-start rounded-md px-4 py-2 text-sm font-bold text-black duration-50 hover:opacity-80">
                Block
              </button>
            </form>
          </div>
        </div>
      </div>

      <p className="text-sm font-extralight opacity-50 lg:hidden">
        When you block someone, that user won't be able to follow you, send you
        a friend request, or reply to your posts and comments.
      </p>
    </div>
  );
};

export default BlockedUsers;
