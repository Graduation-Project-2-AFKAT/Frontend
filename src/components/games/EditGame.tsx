import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../../components/form/Input";
import { Image, Info, X, FileText, Box, Gamepad2 } from "lucide-react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateGame } from "../../redux/modules/games";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useLocation } from "react-router";
import { loadGameById } from "../../redux/modules/games";

interface IEditGameFormData {
  id: number | null;
  title: string;
  description: string;
  tags: string[];
  releaseDate: string;
  status: string;
  // genre: string;
  // platform: string;
  thumbnail: null | File;
}

const validationSchema = yup.object({
  title: yup.string().required("Game title is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),
  tag: yup.array().min(1, "Select at least one tag"),
  releaseDate: yup.string().required("Release date is required"),
  status: yup.string().required("Status is required"),
  // genre: yup.string().required("Genre is required"),
  // platform: yup.string().required("Platform is required"),
});

const EditGame = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IEditGameFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: null,
      title: "",
      description: "",
      tags: [],
      releaseDate: new Date().toISOString().split("T")[0],
      status: "Released",
      // genre: "",
      // platform: "",
      thumbnail: null,
    },
  });

  const { isLoading } = useAppSelector((state) => state.loading);
  const { Game } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();

  const location = useLocation();

  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedWebGLFiles, setUploadedWebGLFiles] = useState<File[] | null>(
    null,
  );
  const [uploadedWindowsFiles, setUploadedWindowsFiles] = useState<
    File[] | null
  >(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const webGLInputRef = useRef<HTMLInputElement>(null);
  const windowsInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const statusOptions = [
    "Released",
    "Early Access",
    "Beta",
    "Alpha",
    "In Development",
  ];

  const genreOptions = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Puzzle",
    "Sports",
    "Racing",
    "Horror",
    "Platform",
    "Shooter",
    "Fighting",
    "Casual",
    "Educational",
  ];

  const platformOptions = [
    "Web (WebGL)",
    "Windows",
    "Mac",
    "Linux",
    "Android",
    "iOS",
  ];

  const tagsOptions = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Puzzle",
    "Racing",
    "Fighting",
    "Shooter",
    "Horror",
    "Cards Game",
    "Educational",
  ];

  useEffect(() => {
    if (!Game) {
      const pathParts = location.pathname.split("/");
      const gameId = pathParts[pathParts.length - 2];

      dispatch(loadGameById(gameId));
    }
  }, [Game, dispatch, location.pathname]);

  useEffect(() => {
    if (Game) {
      const {
        id,
        title,
        description,
        thumbnail,
        tags,
        // releaseDate,
        // status,
        // genre,
        // platform,
      } = Game;

      setValue("id", id);
      setValue("title", title);
      setValue("description", description);

      // Update state variables
      setSelectedTags(tags || []);

      if (thumbnail) {
        setUploadedImage(
          typeof thumbnail === "string"
            ? thumbnail
            : URL.createObjectURL(thumbnail),
        );
      }
    }
  }, [Game]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleWebGLDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Validation logic for WebGL files
    handleWebGLUpload(files);
  };

  const handleWindowsDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Validation logic for Windows files
    handleWindowsUpload(files);
  };

  const handleWebGLUpload = (files: File[]) => {
    if (!files.length) return;

    // Check file size (500MB max for WebGL builds)
    const totalSize =
      files.reduce((total, file) => total + file.size, 0) / 1024 / 1024;
    if (totalSize > 500) {
      toast.error(
        <div>
          <h1 className="mb-2 font-bold">Files too large</h1>
          <p className="font-light">
            Your WebGL files exceed the 500MB size limit. Please optimize your
            game build.
          </p>
        </div>,
      );
      return;
    }

    // Basic validation for index.html presence in WebGL builds
    const hasIndexFile = files.some((file) => file.name === "index.html");
    if (!hasIndexFile && files.length > 1) {
      toast.warning(
        <div>
          <h1 className="mb-2 font-bold">Missing index.html</h1>
          <p className="font-light">
            WebGL builds should contain an index.html file. Please check your
            files.
          </p>
        </div>,
      );
    }

    setUploadedWebGLFiles(files);
  };

  const handleWindowsUpload = (files: File[]) => {
    if (!files.length) return;

    // Check file size (1GB max for Windows builds)
    const totalSize =
      files.reduce((total, file) => total + file.size, 0) / 1024 / 1024 / 1024;
    if (totalSize > 1) {
      toast.error(
        <div>
          <h1 className="mb-2 font-bold">Files too large</h1>
          <p className="font-light">
            Your Windows build exceeds the 1GB size limit. Please optimize your
            game.
          </p>
        </div>,
      );
      return;
    }

    // Basic validation for executable presence in Windows builds
    const hasExeFile = files.some((file) => file.name.endsWith(".exe"));
    if (!hasExeFile && files.length > 1) {
      toast.warning(
        <div>
          <h1 className="mb-2 font-bold">Missing executable</h1>
          <p className="font-light">
            Windows builds should contain an .exe file. Please check your files.
          </p>
        </div>,
      );
    }

    setUploadedWindowsFiles(files);
  };

  const handleRemoveWebGLFiles = () => {
    setUploadedWebGLFiles(null);
    if (webGLInputRef.current) webGLInputRef.current.value = "";
  };

  const handleRemoveWindowsFiles = () => {
    setUploadedWindowsFiles(null);
    if (windowsInputRef.current) windowsInputRef.current.value = "";
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Filter for image files
    const imageFile = files.find(
      (file) =>
        file.type.startsWith("image/") &&
        (file.type === "image/jpeg" || file.type === "image/png"),
    );

    if (imageFile) {
      // Check file size
      if (imageFile.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setValue("thumbnail", imageFile);

      // Process the image
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      toast.error("Please upload a valid image file (JPG, PNG)");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setValue("thumbnail", file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Submitting game update:", data);
    const formData = new FormData();

    formData.append("id", data.id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", selectedTags.join(","));
    formData.append("releaseDate", data.releaseDate);
    formData.append("status", data.status);
    formData.append("genre", data.genre);
    formData.append("platform", data.platform);

    // TODO: check difference of this below between editGame.tsx and editArt.tsx
    // Add cover image if uploaded
    if (imageInputRef.current?.files && imageInputRef.current.files[0]) {
      formData.append("coverImage", imageInputRef.current.files[0]);
    }

    // Add WebGL files if uploaded
    if (uploadedWebGLFiles) {
      uploadedWebGLFiles.forEach((file) => {
        formData.append("webglFiles", file);
      });
    }

    // Add Windows files if uploaded
    if (uploadedWindowsFiles) {
      uploadedWindowsFiles.forEach((file) => {
        formData.append("windowsFiles", file);
      });
    }

    dispatch(updateGame(formData));
  });

  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const errors: string[] = [];
    // For step 1, validate title, description
    if (activeStep === 1) {
      const titleValue = document.getElementById("title") as HTMLInputElement;
      const descValue = document.getElementById(
        "description",
      ) as HTMLTextAreaElement;

      // Collect all errors
      if (!titleValue?.value) {
        errors.push("Please enter a game title");
      }

      if (!descValue?.value) {
        errors.push("Description is required");
      } else if (descValue.value.length < 20) {
        errors.push("Description must be at least 20 characters");
      }
    }

    // For step 2, validate image and tags
    if (activeStep === 2) {
      if (!uploadedImage) {
        errors.push("Please upload a cover image");
      }

      if (selectedTags.length === 0) {
        errors.push("Please select at least one tag");
      }
    }

    // If there are errors, show them all at once
    if (errors.length > 0) {
      toast.error(
        <div>
          <p className="mb-2 font-bold">Please fix the following errors:</p>
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>,
        {
          autoClose: 5000, // Give users more time to read all errors
          className: "error-toast",
        },
      );
      return;
    }

    // If all validations pass, increment the step
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  return (
    <main className="w-full overflow-y-auto">
      <form
        className="border-primary relative mx-auto my-10 flex h-fit w-[90%] max-w-5xl flex-col items-start rounded-2xl border-2 bg-[#121015] shadow-md duration-500 focus-within:shadow-lg focus-within:shadow-teal-400/25"
        onSubmit={onSubmit}
      >
        {/* Header */}
        <div className="w-full border-b border-white/10 p-6">
          <h1 className="text-2xl font-bold">Edit Your Game</h1>
          <p className="text-sm text-white/70">
            Update your game's information and files
          </p>
        </div>

        {/* Progress Steps */}
        <div className="w-full px-6 pt-4">
          <div className="flex justify-between">
            <div className={`flex flex-col items-center`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activeStep >= 1 ? "bg-primary text-black" : "bg-white/20"}`}
              >
                <FileText size={20} />
              </div>
              <span className="mt-2 text-sm">Game Details</span>
            </div>
            <div className="relative flex-1">
              <div
                className={`absolute top-5 h-1 w-full ${activeStep >= 2 ? "bg-primary" : "bg-white/20"}`}
              />
            </div>
            <div className={`flex flex-col items-center`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activeStep >= 2 ? "bg-primary text-black" : "bg-white/20"}`}
              >
                <Image size={20} />
              </div>
              <span className="mt-2 text-sm">Media & Tags</span>
            </div>
            <div className="relative flex-1">
              <div
                className={`absolute top-5 h-1 w-full ${activeStep >= 3 ? "bg-primary" : "bg-white/20"}`}
              />
            </div>
            <div className={`flex flex-col items-center`}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activeStep >= 3 ? "bg-primary text-black" : "bg-white/20"}`}
              >
                <Gamepad2 size={20} />
              </div>
              <span className="mt-2 text-sm">Game Files</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="w-full flex-1 p-6">
          {/* Step 1: Basic Info */}
          {activeStep === 1 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-1 md:col-span-2">
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="title"
                >
                  Game Title
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <Input
                  placeholder="Enter your game title"
                  className="w-full"
                  id="title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="col-span-1 md:col-span-2">
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="description"
                >
                  Description
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  className="field-sizing-content min-h-[150px] w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none focus:border-teal-400"
                  placeholder="Describe your game, its features, gameplay, and what makes it special"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="releaseDate"
                >
                  Release Date
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <Input
                  type="date"
                  id="releaseDate"
                  className="w-full"
                  {...register("releaseDate")}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="status"
                >
                  Development Status
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <select
                  id="status"
                  className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none focus:border-teal-400 focus:bg-[#1E1C21]"
                  {...register("status")}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="genre"
                >
                  Genre
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <select
                  id="genre"
                  className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none focus:border-teal-400 focus:bg-[#1E1C21]"
                  {...register("genre")}
                >
                  <option value="">Select a genre</option>
                  {genreOptions.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="platform"
                >
                  Primary Platform
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <select
                  id="platform"
                  className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none focus:border-teal-400 focus:bg-[#1E1C21]"
                  {...register("platform")}
                >
                  <option value="">Select a platform</option>
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>
          )}

          {/* Step 2: Media & Tags */}
          {activeStep === 2 && (
            <div className="space-y-6">
              {/* Cover Image */}
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-medium">
                  Cover Image
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <div
                  className="border-primary/50 hover:border-primary flex aspect-video w-full max-w-3xl cursor-pointer flex-col items-center justify-center self-center rounded border-2 border-dashed bg-white/5 transition-colors"
                  onClick={() => imageInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleImageDrop}
                >
                  {uploadedImage ? (
                    <div className="relative h-full w-full">
                      <img
                        src={uploadedImage}
                        alt="Cover"
                        className="h-full w-full rounded object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImage(null);
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6">
                      <Image size={48} className="mb-2 text-white/70" />
                      <p className="mb-1 text-white/70">
                        Click or drop an image here
                      </p>
                      <p className="text-xs text-white/50">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={imageInputRef}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple={false}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e);
                      e.target.value = "";
                    }
                  }}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tags (select at least one)
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagsOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`rounded-full px-4 py-1 text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-primary border-primary border text-black"
                          : "border border-white/30 bg-white/5 hover:border-teal-400/50"
                      }`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {errors.tags && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.tags.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Upload Game Files */}
          {activeStep === 3 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-5 border-b border-white/10 pb-8 md:grid-cols-2">
                {/* WebGL Files (for web) */}
                <div className="flex h-full flex-col items-center">
                  <label className="mb-2 block text-sm font-medium">
                    WebGL Build Files (for web browser)
                  </label>

                  <div
                    className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center self-center rounded border border-dashed border-white/30 bg-white/5 transition-colors hover:border-teal-400/50"
                    onClick={() => webGLInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleWebGLDrop}
                  >
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <Gamepad2 size={64} className="mb-4 text-white/70" />
                      <p className="mb-2 text-lg text-white/70">
                        WebGL build files
                      </p>
                      <p className="text-sm text-white/50">
                        Include all necessary files, including index.html
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Maximum total size: 500MB
                      </p>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={webGLInputRef}
                    className="hidden"
                    multiple={true}
                    onChange={(e) => {
                      if (e.target.files) {
                        handleWebGLUpload(Array.from(e.target.files));
                        e.target.value = "";
                      }
                    }}
                  />

                  {/* Uploaded WebGL Files */}
                  {uploadedWebGLFiles && uploadedWebGLFiles.length > 0 && (
                    <div className="mt-4 w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          Uploaded WebGL Files ({uploadedWebGLFiles.length})
                        </p>
                        <button
                          type="button"
                          className="text-xs text-white/70 hover:text-white"
                          onClick={handleRemoveWebGLFiles}
                        >
                          Remove all
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto rounded border border-white/10 bg-black/20 p-3">
                        {uploadedWebGLFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center border-b border-white/5 py-2 last:border-b-0"
                          >
                            <FileText
                              size={16}
                              className="mr-2 text-white/70"
                            />
                            <span className="flex-1 truncate text-sm">
                              {file.name}
                            </span>
                            <span className="ml-2 text-xs text-white/50">
                              {Math.round((file.size / 1024 / 1024) * 100) /
                                100}{" "}
                              MB
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-white/50">
                        Total:{" "}
                        {Math.round(
                          (uploadedWebGLFiles.reduce(
                            (total, file) => total + file.size,
                            0,
                          ) /
                            1024 /
                            1024) *
                            100,
                        ) / 100}{" "}
                        MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Windows Build Files */}
                <div className="flex h-full flex-col items-center">
                  <label className="mb-2 block text-sm font-medium">
                    Windows Build Files (optional)
                  </label>
                  <div
                    className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center self-center rounded border border-dashed border-white/30 bg-white/5 transition-colors hover:border-teal-400/50"
                    onClick={() => windowsInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleWindowsDrop}
                  >
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <Box size={64} className="mb-4 text-white/70" />
                      <p className="mb-2 text-lg text-white/70">
                        Windows build files
                      </p>
                      <p className="text-sm text-white/50">
                        Include executable and all necessary files
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        Maximum total size: 1GB
                      </p>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={windowsInputRef}
                    className="hidden"
                    multiple={true}
                    onChange={(e) => {
                      if (e.target.files) {
                        handleWindowsUpload(Array.from(e.target.files));
                        e.target.value = "";
                      }
                    }}
                  />

                  {/* Uploaded Windows Files */}
                  {uploadedWindowsFiles && uploadedWindowsFiles.length > 0 && (
                    <div className="mt-4 w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          Uploaded Windows Files ({uploadedWindowsFiles.length})
                        </p>
                        <button
                          type="button"
                          className="text-xs text-white/70 hover:text-white"
                          onClick={handleRemoveWindowsFiles}
                        >
                          Remove all
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto rounded border border-white/10 bg-black/20 p-3">
                        {uploadedWindowsFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center border-b border-white/5 py-2 last:border-b-0"
                          >
                            <FileText
                              size={16}
                              className="mr-2 text-white/70"
                            />
                            <span className="flex-1 truncate text-sm">
                              {file.name}
                            </span>
                            <span className="ml-2 text-xs text-white/50">
                              {Math.round((file.size / 1024 / 1024) * 100) /
                                100}{" "}
                              MB
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-white/50">
                        Total:{" "}
                        {Math.round(
                          (uploadedWindowsFiles.reduce(
                            (total, file) => total + file.size,
                            0,
                          ) /
                            1024 /
                            1024) *
                            100,
                        ) / 100}{" "}
                        MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded bg-[#1A191F] p-4">
                <div className="flex items-start">
                  <Info size={20} className="mt-0.5 mr-3 text-teal-400" />
                  <div>
                    <h3 className="text-sm font-medium">
                      Guidelines for game submissions:
                    </h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-white/70">
                      <li>
                        Ensure your game works correctly on the target platforms
                      </li>
                      <li>
                        WebGL builds must include an index.html file for proper
                        browser loading
                      </li>
                      <li>
                        Windows builds should include the executable and all
                        necessary files
                      </li>
                      <li>
                        Make sure you have proper rights to all assets in your
                        game
                      </li>
                      <li>
                        Our team will review your updated submission within 1-3
                        business days
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="w-full border-t border-white/10 p-6">
          <div className="flex justify-between">
            <button
              type="button"
              className={`rounded px-6 py-2 ${activeStep === 1 ? "invisible" : "bg-white/10 hover:bg-white/20"}`}
              onClick={prevStep}
              disabled={activeStep === 1}
            >
              Previous
            </button>

            {activeStep < 3 ? (
              <button
                type="button"
                className="bg-primary hover:bg-primary/90 rounded px-6 py-2 font-bold text-black"
                onClick={nextStep}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-content rounded px-6 py-2 font-bold disabled:cursor-not-allowed! disabled:opacity-50"
                onClick={() => {
                  const errorsKeys = Object.keys(errors);

                  if (errorsKeys.length > 0) {
                    console.log("error");
                    toast.error(
                      <div>
                        <p className="mb-2 font-bold">
                          Please fix the following errors:
                        </p>
                        <ul className="list-disc pl-4">
                          {errorsKeys.map((errorKey) => (
                            <li key={errorKey}>
                              {errors[errorKey as keyof typeof errors]?.message}
                            </li>
                          ))}
                        </ul>
                      </div>,
                      {
                        autoClose: 5000, // Give users more time to read all errors
                        className: "error-toast",
                      },
                    );
                    return;
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="text-primary-content h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Updating...</span>
                  </div>
                ) : (
                  <span>Update Game</span>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditGame;
