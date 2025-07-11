import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FileText, Image, Info, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import * as yup from "yup";
import Input from "../../components/form/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadAssetById, updateAsset } from "../../redux/modules/assets";
import { IAsset } from "../../interfaces";

type IAddArtFormData = Pick<IAsset, "id" | "title" | "description">;

const validationSchema = yup.object({
  id: yup.number().required("Id is required"),
  // author: yup.string().required("Author is required"),
  title: yup.string().required("Asset title is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),
  // tags: yup.array().of(yup.string()).default([]).min(1, "Select at least one tag").required(),
  // fileFormat: yup.string().required("File format is required"),
  // license: yup.string().required("License is required"),
  // price: yup.string().required("Price is required"),
});

const EditArt = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAddArtFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: undefined,
      title: "",
      description: "",
    },
  });

  const dispatch = useAppDispatch();
  const { Asset } = useAppSelector((state) => state.assets);
  const { isLoading } = useAppSelector((state) => state.loading);

  const location = useLocation();

  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File | null>(null);
  const [uploadedModelFile, setUploadedModelFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const modelFileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const fileFormats = ["GLTF", "GLB"];

  const tagsOptions = [
    "Unity",
    "Blender",
    "Krita",
    "Pixel Art",
    "Aseprite",
    "Photoshop",
    "Unreal Engine",
    "Maya",
    "Illustrator",
    "Substance 3D Modeler",
  ];

  const licenses = [
    "Standard Commercial License",
    "Extended Commercial License",
    "Editorial Use Only",
    "Personal Use Only",
    "Creative Commons",
  ];

  useEffect(() => {
    if (!Asset) {
      const pathParts = location.pathname.split("/");
      const assetId = pathParts[pathParts.length - 2];

      dispatch(loadAssetById(assetId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Asset) {
      const { id, title, description, thumbnail, tags } = Asset;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Asset]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    if (files.length > 1) {
      toast.error(
        <div>
          <h1 className="mb-2 font-bold">Only one model file is allowed.</h1>
          <p className="font-light">
            Please upload a single 3D model file or an archive containing the
            asset.
          </p>
        </div>,
      );
      return;
    }

    const fileSize = files[0].size / 1024 / 1024; // Convert to MB
    if (fileSize > 100) {
      toast.error(
        <div>
          <h1 className="mb-2 font-bold">File too large</h1>
          <p className="font-light">
            Your 3D model file exceeds the 100MB size limit. Please optimize
            your model or compress your files.
          </p>
        </div>,
      );
      return;
    }

    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    if (!files.length) return; // No files selected

    const file = files[0];

    const fileSize = file.size / 1024 / 1024; // Convert to MB
    if (fileSize > 100) {
      toast.error(
        <div>
          <h1 className="mb-2 font-bold">File too large</h1>
          <p className="font-light">
            Your 3D model file exceeds the 100MB size limit. Please optimize
            your model or compress your files.
          </p>
        </div>,
      );
      return;
    }

    const validFileExtensions = [".gltf", ".glb", ".zip", ".rar"];

    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!validFileExtensions.includes(extension)) {
      toast.error(
        <div>
          <h1 className="mb-2 font-bold">Invalid file format</h1>
          <p className="font-light">
            Please upload a valid 3D model file or compressed archive (GLTF,
            GLB, ZIP, etc.)
          </p>
        </div>,
      );
      return;
    }

    setUploadedModelFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedModelFile(null);
    if (modelFileInputRef.current) modelFileInputRef.current.value = "";
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

      setUploadedThumbnail(imageFile);

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

      setUploadedThumbnail(file);

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
    const formData = new FormData();

    formData.append("id", data.id.toString());
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (selectedTags.length > 0) {
      selectedTags.map((tag) => {
        formData.append("tags", tag);
      });
    }
    if (uploadedThumbnail) {
      formData.append("thumbnail", uploadedThumbnail);
    }
    if (uploadedModelFile) {
      formData.append("model_file", uploadedModelFile);
    }

    console.log("Submitting game update:", data);

    dispatch(updateAsset(formData));
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
        errors.push("Please enter an asset title");
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
          <h1 className="text-2xl font-bold">Edit Your 3D Asset</h1>
          <p className="text-sm text-white/70">
            Update your 3D model details to better showcase your work
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
              <span className="mt-2 text-sm">Asset Details</span>
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
              <span className="mt-2 text-sm">Preview & Tags</span>
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
                <Box size={20} />
              </div>
              <span className="mt-2 text-sm">Upload Model</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="w-full flex-1 p-6">
          {/* Step 1: Basic Info */}
          {activeStep === 1 && (
            <div className="grid grid-cols-1! gap-6 md:grid-cols-2!">
              <div className="col-span-1 md:col-span-2">
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="title"
                >
                  Asset Title
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <Input
                  placeholder="Enter your 3D asset title"
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
                  placeholder="Describe your 3D model (features, uses, technical details, etc.)"
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
                  htmlFor="fileFormat"
                >
                  File Format
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <select
                  id="fileFormat"
                  className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none focus:border-teal-400 focus:bg-[#1E1C21]"
                  // {...register("fileFormat")}
                >
                  {fileFormats.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="license"
                >
                  License
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <select
                  id="license"
                  className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none focus:border-teal-400 focus:bg-[#1E1C21]"
                  // {...register("license")}
                >
                  {licenses.map((license) => (
                    <option key={license} value={license}>
                      {license}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium"
                  htmlFor="price"
                >
                  Price
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <select
                  id="price"
                  className="w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none focus:border-teal-400 focus:bg-[#1E1C21]"
                  // {...register("price")}
                >
                  <option value="Free">Free</option>
                  <option value="$4.99">$4.99</option>
                  <option value="$9.99">$9.99</option>
                  <option value="$14.99">$14.99</option>
                  <option value="$19.99">$19.99</option>
                  <option value="$24.99">$24.99</option>
                  <option value="$29.99">$29.99</option>
                </select>
              </div>
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
                  className="hover:border-primary border-primary/20 flex aspect-video w-full max-w-3xl cursor-pointer flex-col items-center justify-center self-center rounded border-2 border-dashed bg-white/5 transition-colors"
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
                {selectedTags.length === 0 && (
                  <p className="mt-1 text-xs text-red-400">
                    Select at least one tag
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Upload Files */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                <p className="mb-4 text-center text-lg font-medium">
                  Upload Your 3D Model
                </p>
                <div
                  className="flex aspect-video w-full max-w-3xl cursor-pointer flex-col items-center justify-center rounded border border-dashed border-white/30 bg-white/5 transition-colors hover:border-teal-400/50"
                  onClick={() => modelFileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleFileDrop}
                >
                  <div className="flex flex-col items-center justify-center p-6">
                    <Box size={64} className="mb-4 text-white/70" />
                    <p className="mb-2 text-center text-lg text-white/70">
                      Click to upload or drag and drop your 3D model file
                    </p>
                    <p className="text-center text-sm text-white/50">
                      Supports GLTF, GLB and ZIP/RAR archives
                    </p>
                    <p className="mt-1 text-center text-xs text-white/40">
                      Maximum file size: 100MB
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="file"
                ref={modelFileInputRef}
                className="hidden"
                accept=".gltf,.glb,.zip"
                multiple={false}
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(Array.from(e.target.files));
                  }
                }}
              />

              {/* Uploaded Files */}
              {uploadedModelFile && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded File</p>
                  <div className="flex justify-center">
                    <div className="flex w-full items-center justify-between rounded bg-white/10 p-3">
                      <div className="flex items-center">
                        <Box className="mr-3 text-white/70" size={20} />
                        <div>
                          <span className="text-sm font-medium">
                            {uploadedModelFile.name}
                          </span>
                          <p className="text-xs text-white/50">
                            {Math.round(
                              (uploadedModelFile.size / 1024 / 1024) * 100,
                            ) / 100}
                            MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-white/70 hover:text-white"
                        onClick={() => handleRemoveFile()}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded bg-[#1A191F] p-4">
                <div className="flex items-start">
                  <Info size={20} className="mt-0.5 mr-3 text-teal-400" />
                  <div>
                    <h3 className="text-sm font-medium">
                      Guidelines for 3D model submissions:
                    </h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-white/70">
                      <li>
                        Ensure your model has proper topology and is optimized
                        for real-time use
                      </li>
                      <li>
                        Include textures and materials with your model
                        submission
                      </li>
                      <li>
                        Make sure you have proper rights to all parts of the
                        model
                      </li>
                      <li>
                        Provide accurate scale information in your description
                      </li>
                      <li>
                        Our team will review your submission within 1-3 business
                        days
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
                className="bg-primary text-primary-content hover:bg-primary/80 rounded px-6 py-2 font-bold"
                onClick={nextStep}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primary hover:bg-primary text-primary-content rounded px-6 py-2 font-bold disabled:cursor-not-allowed! disabled:opacity-50"
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
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <span>Submit 3D Asset</span>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditArt;
