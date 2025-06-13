import { yupResolver } from "@hookform/resolvers/yup";
import {
  Calendar,
  Image,
  Info,
  Trophy,
  Users,
  X,
  // ,Award
} from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Input from "../components/form/Input";
import { useAppSelector } from "../redux/hooks";
import { IJam } from "../interfaces";

type IHostJamFormData = Pick<
  IJam,
  | "title"
  | "description"
  | "start_date"
  | "end_date"
  | "location"
  | "isOnline"
  | "participants_count"
  | "prizes"
> & {
  rules: string;
  organizer_name: string;
  organizer_email: string;
};

const validationSchema = yup.object({
  title: yup.string().required("Game jam title is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters"),
  start_date: yup.string().required("Start date is required"),
  end_date: yup.string().required("End date is required"),
  location: yup.string().required("Location is required"),
  isOnline: yup.boolean().required(),
  participants_count: yup
    .number()
    .min(1, "Must allow at least 1 participant")
    .required(),
  prizes: yup.string().required("Prizes is required"),
  rules: yup.string().required("Rules are required"),
  organizer_name: yup.string().required("Organizer name is required"),
  organizer_email: yup.string().required("Organizer email is required"),
  // organizerName: yup.string().required("Organizer name is required"),
  // organizerEmail: yup
  //   .string()
  //   .email("Invalid email")
  //   .required("Email is required"),
  // organizerWebsite: yup.string().url("Must be a valid URL").nullable(),
});

const HostJam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IHostJamFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "Online",
      isOnline: true,
      participants_count: 1,
      prizes: "",
      rules:
        "All games must be created during the jam period.\nTeams of up to 4 people are allowed.\nYou may use any engine or tools.\nSubmissions must include a playable build.\nThird-party assets are allowed but must be credited.",
      organizer_email: "",
      organizer_name: "",
      // organizerWebsite: "",
    },
  });

  const { isLoading } = useAppSelector((state) => state.loading);

  const [activeStep, setActiveStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleImageDrop = (e: React.DragEvent, type: "cover" | "logo") => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    const imageFile = files.find(
      (file) =>
        file.type.startsWith("image/") &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif"),
    );

    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === "cover") {
          setUploadedImage(event.target?.result as string);
        } else {
          setUploadedLogo(event.target?.result as string);
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      toast.error("Please upload a valid image file (JPG, PNG, GIF)");
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "logo",
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === "cover") {
          setUploadedImage(event.target?.result as string);
        } else {
          setUploadedLogo(event.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // const addPrize = () => {
  //   const prizes = watch("prizes") || [];
  //   const nextPosition = prizes.length + 1;

  //   let positionText;
  //   switch (nextPosition) {
  //     case 1:
  //       positionText = "1st Place";
  //       break;
  //     case 2:
  //       positionText = "2nd Place";
  //       break;
  //     case 3:
  //       positionText = "3rd Place";
  //       break;
  //     default:
  //       positionText = `${nextPosition}th Place`;
  //   }

  //   setValue("prizes", [...prizes, { position: positionText, prize: "" }]);
  // };

  // const removePrize = (index: number) => {
  //   const prizes = watch("prizes");
  //   setValue(
  //     "prizes",
  //     prizes.filter((_, i) => i !== index),
  //   );
  // };

  const onSubmit: SubmitHandler<IHostJamFormData> = (data) => {
    if (!uploadedImage) {
      toast.error("Please upload a cover image for your game jam");
      return;
    }

    if (!uploadedLogo) {
      toast.error("Please upload an organizer logo");
      return;
    }
    console.log("submitted form:", data);

    // // Validate date range
    // const start = new Date(data.start_date);
    // const end = new Date(data.end_date);
    // if (end <= start) {
    //   toast.error("End date must be after the start date");
    //   return;
    // }

    // console.log({
    //   ...data,
    //   coverImage: uploadedImage,
    //   organizerLogo: uploadedLogo,
    // });

    // toast.success(
    //   "Game jam proposal submitted! Our team will review and contact you shortly.",
    // );
    // Here you would typically send the data to your backend
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    // For step 1, validate basic details
    if (activeStep === 1) {
      const titleValue = watch("title");
      const descValue = watch("description");
      const startDate = watch("start_date");
      const endDate = watch("end_date");
      const location = watch("location");

      // Collect all errors
      if (!titleValue) {
        errors.push("Please enter a game jam title");
      }

      if (!descValue) {
        errors.push("Description is required");
      } else if (descValue.length < 20) {
        errors.push("Description must be at least 20 characters");
      }

      if (!startDate) {
        errors.push("Start date is required");
      }

      if (!endDate) {
        errors.push("End date is required");
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end <= start) {
          errors.push("End date must be after the start date");
        }
      }

      if (!location) {
        errors.push("Location is required");
      }
    }

    // For step 2, validate images, prizes and rules
    if (activeStep === 2) {
      if (!uploadedImage) {
        errors.push("Please upload a cover image");
      }

      const prizes = watch("prizes");
      if (!prizes) {
        errors.push("Prizes is required");
      }
      // if (!prizes || prizes.length === 0) {
      //   errors.push("At least one prize is required");
      // } else {
      //   const emptyPrizes = prizes.filter(
      //     (prize) => !prize.position || !prize.prize,
      //   );
      //   if (emptyPrizes.length > 0) {
      //     errors.push("All prizes details must be filled");
      //   }
      // }

      // const rules = watch("rules");
      // if (!rules) {
      //   errors.push("Game jam rules are required");
      // }
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
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-lg bg-[#16141C]/80 p-8 shadow-xl">
            <div className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-r-transparent border-b-white/30 border-l-white/30"></div>
            <p className="text-lg font-medium text-white">
              Please wait while we process your request...
            </p>
          </div>
        </div>
      ) : null}

      <div className="w-full overflow-y-auto">
        <form
          className="border-primary focus-within:shadow-primary/25 relative mx-auto my-10 flex h-fit w-[85%] max-w-4xl flex-col items-start rounded-2xl border-2 bg-[#121015] shadow-md duration-500 focus-within:shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Header */}
          <div className="w-full border-b border-white/10 p-6">
            <h1 className="text-2xl font-bold">Host a Game Jam</h1>
            <p className="text-sm text-white/70">
              Create an exciting game development competition and inspire
              creativity in the AFKAT community
            </p>
          </div>

          {/* Progress Steps */}
          <div className="w-full px-6 pt-4">
            <div className="flex justify-between">
              <div className={`flex flex-col items-center`}>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${activeStep >= 1 ? "bg-primary text-black" : "bg-white/20"}`}
                >
                  <Calendar size={20} />
                </div>
                <span className="mt-2 text-sm">Basic Details</span>
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
                  <Trophy size={20} />
                </div>
                <span className="mt-2 text-sm">Prizes & Rules</span>
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
                  <Users size={20} />
                </div>
                <span className="mt-2 text-sm">Organizer Info</span>
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
                    Game Jam Title
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="Enter your game jam title"
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
                    className="focus:border-primary field-sizing-content min-h-[150px] w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none"
                    placeholder="Describe your game jam (goals, target audience, etc.)"
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
                    htmlFor="startDate"
                  >
                    Start Date
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    className="w-full"
                    {...register("start_date")}
                  />
                  {errors.start_date && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.start_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="endDate"
                  >
                    End Date
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    className="w-full"
                    {...register("end_date")}
                  />
                  {errors.end_date && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.end_date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="location"
                  >
                    Location
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <Input
                    id="location"
                    placeholder={
                      watch("isOnline") ? "Online" : "e.g., San Francisco, CA"
                    }
                    className="w-full"
                    disabled={watch("isOnline")}
                    value={watch("isOnline") ? "Online" : watch("location")}
                    onChange={(e) => setValue("location", e.target.value)}
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="maxParticipants"
                  >
                    Maximum Participants
                  </label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    className="w-full"
                    {...register("participants_count", { valueAsNumber: true })}
                  />
                  {errors.participants_count && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.participants_count.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isOnline"
                    className="text-primary h-4 w-4 rounded border-white/10 bg-white/5 transition-colors"
                    {...register("isOnline")}
                    onChange={(e) => {
                      setValue("isOnline", e.target.checked);
                      if (e.target.checked) {
                        setValue("location", "Online");
                      } else {
                        setValue("location", "");
                      }
                    }}
                  />
                  <label htmlFor="isOnline" className="text-sm font-medium">
                    This is an online event
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Prizes, Images & Rules */}
            {activeStep === 2 && (
              <div className="space-y-6">
                {/* Cover Image */}
                <div className="flex flex-col">
                  <label className="mb-2 block text-sm font-medium">
                    Cover Image
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <div
                    className="hover:border-primary/20 flex aspect-video w-full max-w-3xl cursor-pointer flex-col items-center justify-center self-center rounded border border-dashed border-white/30 bg-white/5 transition-colors"
                    onClick={() => imageInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleImageDrop(e, "cover")}
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
                          Click or drop a cover image here
                        </p>
                        <p className="text-xs text-white/50">
                          PNG, JPG, GIF up to 5MB - Landscape orientation
                          recommended (16:9)
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={imageInputRef}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif"
                    multiple={false}
                    onChange={(e) => handleImageUpload(e, "cover")}
                  />
                </div>

                {/* Prizes */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Prizes
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {/* <div className="flex-1">
                        <Input
                          placeholder="Position (e.g., 1st Place)"
                          className="w-full cursor-not-allowed bg-white/5 opacity-70"
                          {...register(`prizes.${index}.position`)}
                          disabled
                        />
                      </div> */}
                      <div className="w-full">
                        <Input
                          placeholder="Prize details (e.g., $500 + Publishing Deal)"
                          className="w-full"
                          {...register(`prizes`)}
                        />
                      </div>
                      {/* {watch("prizes")?.length > 1 && (
                        <button
                          type="button"
                          className="rounded bg-white/10 p-2 hover:bg-white/20"
                          // onClick={() => removePrize(index)}
                        >
                          <X size={16} />
                        </button>
                      )} */}
                    </div>

                    {/* <button
                      type="button"
                      className="border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-primary/20 mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-dashed px-4 py-2.5 text-sm font-medium transition-all hover:shadow-sm"
                      // onClick={addPrize}
                    >
                      <Award size={18} />
                      Add Another Prize
                    </button> */}
                  </div>
                  {errors.prizes && (
                    <p className="mt-1 text-xs text-red-400">
                      At least one prize is required
                    </p>
                  )}
                </div>

                {/* Rules */}
                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="rules"
                  >
                    Rules & Guidelines
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <textarea
                    id="rules"
                    className="focus:border-primary min-h-[150px] w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors outline-none"
                    placeholder="List the rules and guidelines for your game jam"
                    {...register("rules")}
                    defaultValue={`All games must be created during the jam period.\nTeams of up to 4 people are allowed.\nYou may use any engine or tools.\nSubmissions must include a playable build.\nThird-party assets are allowed but must be credited.`}
                  />
                  {/* {errors.rules && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.rules.message}
                    </p>
                  )} */}
                  <p className="mt-1 text-xs text-white/50">
                    Each line will be displayed as a separate rule point
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Organizer Information */}
            {activeStep === 3 && (
              <div className="grid grid-cols-1! gap-6 md:grid-cols-2!">
                <div className="col-span-1 md:col-span-2">
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="organizerName"
                  >
                    Organizer Name
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <Input
                    id="organizerName"
                    placeholder="Studio or organization name"
                    className="w-full"
                    {...register("organizer_name")}
                  />
                  {errors.organizer_name && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.organizer_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="organizerEmail"
                  >
                    Contact Email
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <Input
                    id="organizerEmail"
                    type="email"
                    placeholder="Your email address"
                    className="w-full"
                    {...register("organizer_email")}
                  />
                  {errors.organizer_email && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.organizer_email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="organizerWebsite"
                  >
                    Website (Optional)
                  </label>
                  <Input
                    id="organizerWebsite"
                    type="url"
                    placeholder="https://yourorganization.com"
                    className="w-full"
                    // {...register("organizerWebsite")}
                  />
                  {/* {errors.organizerWebsite && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.organizerWebsite.message}
                    </p>
                  )} */}
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Organizer Logo
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <div
                    className="hover:border-primary/50 flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-white/30 bg-white/5 transition-colors"
                    onClick={() => logoInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleImageDrop(e, "logo")}
                  >
                    {uploadedLogo ? (
                      <div className="relative h-full w-full">
                        <img
                          src={uploadedLogo}
                          alt="Organizer Logo"
                          className="h-full w-full rounded object-contain p-2"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white hover:bg-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedLogo(null);
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Image size={32} className="mb-2 text-white/70" />
                        <p className="mb-1 text-xs text-white/70">
                          Organization Logo
                        </p>
                        <p className="text-xs text-white/50">
                          Square format recommended
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={logoInputRef}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif"
                    multiple={false}
                    onChange={(e) => handleImageUpload(e, "logo")}
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <div className="rounded bg-[#1A191F] p-4">
                    <div className="flex items-start">
                      <Info size={20} className="text-primary mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium">
                          Next steps after submission:
                        </h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-white/70">
                          <li>
                            Our team will review your game jam proposal within
                            3-5 business days
                          </li>
                          <li>
                            We may contact you for additional information or
                            clarification
                          </li>
                          <li>
                            Once approved, your game jam will be published on
                            our platform
                          </li>
                          <li>
                            You'll receive access to a dedicated dashboard to
                            manage your jam
                          </li>
                          <li>
                            We provide support throughout the process of running
                            your game jam
                          </li>
                        </ul>
                      </div>
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
                  className="hover:bg-primary/80 bg-primary text-primary-content rounded px-6 py-2 font-bold"
                  onClick={(e) => nextStep(e)}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary text-primary-content rounded px-6 py-2 font-bold"
                >
                  Submit Game Jam
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HostJam;
