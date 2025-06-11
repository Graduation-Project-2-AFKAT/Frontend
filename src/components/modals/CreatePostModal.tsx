import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, X } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import api from "../../config/axios.config";
import { IPost } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createPost } from "../../redux/modules/posts";
import PostTheme from "./PostTheme";
import ProgressBar from "./ProgressBar";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type IPostCreateForm = Pick<IPost, "title" | "content">;

const validationSchema = yup.object({
  title: yup.string().trim().required("Post title is required").max(100),
  content: yup.string().trim().required("Post content is required").max(256),
});

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IPostCreateForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const title = watch("title") || "";
  const content = watch("content") || "";

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  const postImageRef = useRef<HTMLInputElement>(null);

  const [postTheme, setPostTheme] = useState("");
  const [bgZoom, setBgZoom] = useState(110);
  const [showImageArea, setshowImageArea] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [themes, setThemes] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchThemes() {
      const token = localStorage.getItem("access_token");

      if (token) {
        const { data } = await api.get(
          "https://afkat-a734fcb61a41.herokuapp.com/api/v1/home/posts/themes",
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );

        setThemes(data);
      }
    }

    fetchThemes();
  }, []);

  const LoadThemes = () => {
    return Object.keys(themes).map((theme) => {
      return (
        <PostTheme
          key={theme}
          postTheme={postTheme}
          ChangeTheme={setPostTheme}
          themeImage={themes[theme]}
        />
      );
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const images = Array.from(e.dataTransfer.files);

    if (images.length > 1) {
      toast.error(
        <div>
          <p>Only one image is allowed.</p>
        </div>,
      );
      return;
    }

    handleImageUpload(images[0]);
  };

  const handleImageUpload = (image: File) => {
    if (!image) return;

    const imageSize = image.size / 1024 / 1024; // Convert to MB
    if (imageSize > 5) {
      toast.error(
        <div>
          <p>Maximum image size is 5MB</p>
        </div>,
      );
      return;
    }

    const isValidType =
      image.type.startsWith("image/") ||
      /\.(jpe?g|png|gif|webp)$/i.test(image.name);

    if (!isValidType) {
      toast.error(
        <div className="flex items-start gap-2">
          <div>
            <p className="font-bold">Invalid image format</p>
            <p className="text-xs opacity-90">
              Only JPG, PNG, GIF, and WEBP files are supported
            </p>
          </div>
        </div>,
      );
      return;
    }

    handleImageChange(image);
  };

  const handleImageChange = (image: File) => {
    setImageFile(image);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(image);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  //* reset post on each open
  useEffect(() => {
    if (isOpen) {
      reset({ title: "", content: "" });
      setPostTheme("");
      setImageFile(null);
      setPreviewUrl(null);
      setshowImageArea(false);
    }
  }, [isOpen, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title || "");
      formData.append("content", data.content || "");
      formData.append("published_at", new Date().toISOString());
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (postTheme) {
        formData.append("theme", postTheme);
        formData.append("theme_zoom_number", bgZoom.toString());
      }

      // Dispatch post creation action
      await dispatch(createPost(formData));

      // Reset form and close modal
      reset();
      setImageFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onClose={(_) => {
          // Only close modal on Escape key, not outside clicks
          if (event?.type === "keydown") {
            onClose();
          }
        }}
      >
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
                className={`my-20 w-full max-w-2xl transform overflow-hidden rounded-lg border border-white/10 bg-[#2A2731] bg-cover bg-center shadow-xl`}
                style={{
                  backgroundImage: postTheme ? `url('${postTheme}')` : "none",
                  backgroundSize: `${bgZoom}%`,
                  backgroundPosition: "top center",
                }}
              >
                <form className="bg-black/25 py-6" onSubmit={onSubmit}>
                  {/* Background controls */}
                  {postTheme && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      <button
                        type="button"
                        className="rounded-md border border-white/50 bg-black/50 p-1 backdrop-blur-xs"
                        onClick={() =>
                          setBgZoom((prev) => Math.min(prev + 25, 300))
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
                        type="button"
                        className="rounded-md border border-white/50 bg-black/50 p-1 backdrop-blur-xs"
                        onClick={() =>
                          setBgZoom((prev) => Math.max(prev - 25, 100))
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
                      type="button"
                      className="group absolute top-4 right-0 translate-x-21 space-x-5 rounded-l-lg border border-r-0 border-black bg-red-400 py-2 pr-10 pl-4 text-sm font-extrabold tracking-wider text-black duration-300 hover:translate-x-5 hover:shadow-md hover:shadow-black/100"
                      onClick={onClose}
                    >
                      <span>X</span>
                      <span>Close</span>
                    </button>
                  </div>

                  {/* Image upload */}
                  <div className="mt-12 mb-5 flex items-center justify-start">
                    {showImageArea ? (
                      <div
                        className={`${postTheme ? "bg-black/75 backdrop-blur-md duration-0" : "bg-black/50"} w-full p-3 px-8 py-6 text-white`}
                      >
                        <div className="mb-5 flex items-center gap-x-5">
                          <span className="text-xl font-bold text-nowrap">
                            Select Image
                          </span>
                          <div className="h-0.5 w-full bg-[#8B8B8E]" />

                          <button
                            type="button"
                            className="hover:bg-primary hover:border-primary rounded-full border p-2 hover:text-black"
                            onClick={() => setshowImageArea(false)}
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <div className="mb-5 flex flex-col gap-y-1 text-xs">
                          <p className="font-light">
                            Your image must be a PNG, JPG, WebP or GIF.
                          </p>
                          <p className="font-bold">
                            Animated GIFs are supported.
                          </p>
                        </div>

                        <div className="flex flex-col items-center justify-between">
                          <div
                            className="text-primary hover:border-primary flex aspect-square w-100 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 transition-colors"
                            onClick={() => postImageRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleImageDrop(e)}
                          >
                            {previewUrl ? (
                              <div className="relative h-full w-full">
                                <img
                                  src={previewUrl}
                                  alt="Post Thumbnail"
                                  className="aspect-video h-full w-full rounded object-cover"
                                />
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage();
                                  }}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-6">
                                <Plus size={48} className="mb-2" />
                                <p className="text-center text-xl font-bold">
                                  Image / GIF
                                </p>
                                <p className="text-center">
                                  Click to upload or drag and drop your image
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <input
                          type="file"
                          ref={postImageRef}
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.gif,.webp"
                          multiple={false}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageUpload(e.target.files[0]);
                              e.target.value = "";
                            }
                          }}
                        />
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

                  {/* Post title */}
                  <div className="mb-3 px-8">
                    <input
                      placeholder="Game Title..."
                      className={`${postTheme && "bg-[#050505]/75 backdrop-blur-sm duration-0"} focus:border-primary w-full rounded-lg border-2 border-white/25 px-3 py-2 text-white transition-colors outline-none focus:ring-0 ${errors.title ? "border-red-500" : ""}`}
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Post content */}
                  <div className="px-8">
                    <textarea
                      placeholder="What's on your mind?"
                      className={`${postTheme && "bg-[#050505]/75 backdrop-blur-sm duration-0"} focus:border-primary field-sizing-content min-h-30 w-full resize-none rounded-lg border-2 border-white/25 p-3 text-white transition-colors outline-none focus:ring-0 ${errors.content ? "border-red-500" : ""}`}
                      {...register("content")}
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.content.message}
                      </p>
                    )}
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

                    {Object.keys(themes).length > 0 && <LoadThemes />}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-end px-8">
                    <button
                      type="submit"
                      disabled={
                        isLoading ||
                        title.length === 0 ||
                        content.length === 0 ||
                        content.length > 256
                      }
                      className={`bg-primary rounded-lg border border-black px-5 py-2 font-medium text-black shadow-md shadow-black/50 transition-transform disabled:cursor-not-allowed! disabled:opacity-70 ${
                        isLoading ||
                        content.length === 0 ||
                        content.length > 256
                          ? ""
                          : "hover:-translate-y-0.5 active:scale-95"
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
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePostModal;
