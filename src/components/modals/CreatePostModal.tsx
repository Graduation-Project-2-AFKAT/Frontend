import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { X, Plus } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createPost } from "../../redux/modules/posts";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [postTheme, setPostTheme] = useState("");
  const [bgZoom, setBgZoom] = useState(110);

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  const [content, setContent] = useState("");
  const [showImageArea, setshowImageArea] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     setContent("");
  //     setImageFile(null);
  //     setshowImageArea(false);
  //     setPreviewUrl(null);
  //   }
  // }, [isOpen]);

  // Handle post submission
  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      // Create form data for post submission
      const formData = new FormData();
      formData.append("content", content);
      if (imageFile) {
        formData.append("attachment", imageFile);
      }

      // Dispatch post creation action
      //   await dispatch(createPost(formData)).unwrap();

      // Reset form and close modal
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </TransitionChild>

        {/* Modal dialog */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`${postTheme && `bg-[url(/patterns/${postTheme}.jpg)]`} my-20 w-full max-w-2xl transform overflow-hidden rounded-lg border bg-[#2A2731] bg-cover bg-center bg-no-repeat py-6 shadow-xl`}
                style={{
                  backgroundSize: `${bgZoom}%`,
                  backgroundPosition: "center center",
                }}
              >
                <div className="">
                  {/* Background controls */}
                  {postTheme && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        className="rounded-md border border-white/50 bg-black/50 p-1"
                        onClick={() =>
                          setBgZoom((prev) => Math.min(prev + 10, 300))
                        }
                        title="Zoom in"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </button>
                      <button
                        className="rounded-md border border-white/50 bg-black/50 p-1"
                        onClick={() =>
                          setBgZoom((prev) => Math.max(prev - 10, 110))
                        }
                        title="Zoom out"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Modal header */}
                  <div>
                    <button
                      className="group absolute top-4 right-0 translate-x-21 space-x-5 rounded-l-lg border border-r-0 border-red-400 bg-red-400 py-2 pr-10 pl-4 text-sm font-extrabold tracking-wider text-black duration-300 hover:translate-x-5 hover:shadow-md hover:shadow-black/100"
                      onClick={onClose}
                    >
                      <span>X</span>
                      <span>Close</span>
                    </button>
                  </div>

                  {/* Image upload */}
                  <div className="mt-12 mb-5 flex items-center justify-start">
                    {showImageArea ? (
                      <div className="w-full bg-black/25 px-8 py-6">
                        <div className="mb-5 flex items-center gap-x-5">
                          <span className="text-xl font-bold text-nowrap">
                            Select Image
                          </span>
                          <div className="h-0.5 w-full bg-white/20" />

                          <button
                            className="hover:bg-primary hover:border-primary rounded-full border p-2 hover:text-black"
                            onClick={() => setshowImageArea(false)}
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="mb-5 flex flex-col gap-y-1 text-xs">
                          <p className="font-light">
                            Your image must be a PNG, JPG, or GIF.
                          </p>
                          <p className="font-bold">
                            Animated GIFs are supported.
                          </p>
                        </div>

                        <div className="flex items-center gap-x-5">
                          <div
                            className="text-primary hover:border-primary flex aspect-square h-35 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 font-bold transition-colors"
                            onClick={() =>
                              document
                                .getElementById("file-upload-input")
                                ?.click()
                            }
                          >
                            <Plus size={40} />
                            <p>Image / GIF</p>
                            <input
                              id="file-upload-input"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                              multiple={false}
                            />
                          </div>

                          {/* Image preview */}
                          {previewUrl && (
                            <div className="relative overflow-hidden rounded-lg">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="aspect-video max-h-35 w-full object-cover"
                                loading="lazy"
                              />
                              <button
                                onClick={() => {
                                  setImageFile(null);
                                  setPreviewUrl(null);
                                }}
                                className="absolute top-2 right-2 rounded-full bg-black/60 p-1"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="hover:bg-primary ml-8 cursor-pointer rounded-md bg-[#2A2731]/90 px-4 py-2 font-medium transition-colors hover:text-black"
                        onClick={() => setshowImageArea(true)}
                      >
                        <i className="fa-regular fa-image mr-2" />
                        Add Image
                      </div>
                    )}
                  </div>

                  {/* Post content */}
                  <div className="px-8">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What's on your mind?"
                      className="focus:border-primary field-sizing-content min-h-30 w-full resize-none rounded-lg border border-white/50 bg-[#2A2731]/99 p-3 text-white transition-colors outline-none focus:ring-0"
                    />
                  </div>

                  <div className="mb-5">
                    <ProgressBar
                      content={content}
                      label={"HP"}
                      maxLength={256}
                    />
                  </div>

                  <div className="flex gap-x-3 px-8">
                    <div
                      className="group hover:border-primary relative aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border-2 bg-[#151318] transition-colors"
                      onClick={() => setPostTheme("")}
                    >
                      <hr className="group-hover:border-primary absolute top-0 right-0 w-[140%] origin-top-right -rotate-45 border transition-colors" />
                    </div>
                    <div
                      className={`${postTheme === "p1" && "border-primary"} group aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border-2 hover:border-2`}
                      onClick={() => setPostTheme("p1")}
                    >
                      <img
                        src="/patterns/p1.jpg"
                        alt="pattern 1"
                        className="scale-250 transition-transform group-hover:scale-200"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className={`${postTheme === "p2" && "border-primary"} group aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border-2 hover:border-2`}
                      onClick={() => setPostTheme("p2")}
                    >
                      <img
                        src="/patterns/p2.jpg"
                        alt="pattern 2"
                        className="scale-250 transition-transform group-hover:scale-200"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className={`${postTheme === "p3" && "border-primary"} group aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border-2 hover:border-2`}
                      onClick={() => setPostTheme("p3")}
                    >
                      <img
                        src="/patterns/p3.jpg"
                        alt="pattern 3"
                        className="scale-250 transition-transform group-hover:scale-200"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-end px-8">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || (!content.trim() && !imageFile)}
                      className={`bg-primary rounded-lg border border-black px-5 py-2 font-medium text-black shadow-md shadow-black/50 transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 ${
                        isLoading ? "cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-black" />
                          Posting...
                        </span>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePostModal;
