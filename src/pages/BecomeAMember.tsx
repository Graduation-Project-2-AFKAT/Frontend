import { yupResolver } from "@hookform/resolvers/yup";
import { Code, Palette, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export interface IMembershipFormData {
  role: "developer" | "designer" | "admin";
  experience: string;
  portfolio: string;
  // skills: string[];
  motivation: string;
  references: string;
}

const BecomeAMember = () => {
  const [selectedRole, setSelectedRole] = useState<
    "developer" | "designer" | "admin" | null
  >(null);
  const [submitting, setSubmitting] = useState(false);
  const [customSkill, setCustomSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const validationSchema = yup.object({
    role: yup
      .string()
      .oneOf(["developer", "designer", "admin"], "Please select a role")
      .required("Role is required"),
    experience: yup
      .string()
      .required("Experience is required")
      .min(20, "Please provide more details about your experience"),
    portfolio: yup.string().url("Must be a valid URL").required(),
    motivation: yup
      .string()
      .required("Please tell us why you want to join")
      .min(20, "Your answer should be at least 20 characters"),
    references: yup.string().required(),
    // skills: yup.array().min(2, "Select at least 2 skills"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IMembershipFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      role: undefined,
      experience: "",
      portfolio: undefined,
      motivation: "",
      references: undefined,
    },
  });

  const developerSkills = [
    "Python",
    "C#",
    "Unity",
    "Unreal Engine",
    "Godot",
    "GameMaker",
    "3D Modeling",
    "WebGL",
  ];

  const designerSkills = [
    "UI/UX",
    "Graphic Design",
    "Character Design",
    "Environment Art",
    "Animation",
    "Concept Art",
    "3D Modeling",
    "Texturing",
    "Lighting",
    "Photoshop",
    "Illustrator",
    "Blender",
    "Maya",
    "ZBrush",
  ];

  const adminSkills = [
    "Community Management",
    "Content Moderation",
    "User Support",
    "Documentation",
    "Project Management",
    "Quality Assurance",
    "Data Analysis",
    "Social Media Management",
    "Event Planning",
  ];

  const skillsByRole = {
    developer: developerSkills,
    designer: designerSkills,
    admin: adminSkills,
  };

  const handleRoleSelect = (role: "developer" | "designer" | "admin") => {
    setSelectedRole(role);
    setValue("role", role);
    setSelectedSkills([]);
  };

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(updatedSkills);

    // if (updatedSkills.length >= 2) {
    //   clearErrors("skills");
    // } else {
    //   setError("skills", {
    //     type: "manual",
    //     message: "Select at least 2 skills",
    //   });
    // }
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      const updatedSkills = [...selectedSkills, customSkill];
      setSelectedSkills(updatedSkills);
      // setValue("skills", updatedSkills);
      setCustomSkill("");

      // if (updatedSkills.length >= 2) {
      //   clearErrors("skills");
      // }
    }
  };

  const handleRemoveCustomSkill = (skill: string) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
  };

  const onSubmit = async (data: IMembershipFormData) => {
    try {
      setSubmitting(true);
      console.log("Form submitted:", data);

      toast.success(
        "Your application has been submitted successfully! We'll review it and get back to you soon.",
      );
      reset();
      setSelectedRole(null);
      setSelectedSkills([]);
      setCustomSkill("");
    } catch (error) {
      toast.error(
        "There was an error submitting your application. Please try again.",
      );
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <div className="mx-auto my-10 w-[85%] max-w-4xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Become a Member</h1>
          <p className="text-white/70">
            Join our team and help shape the future of AFKAT
          </p>
        </div>

        <form
          className="border-primary focus-within:shadow-primary/25 rounded-2xl border-2 bg-[#121015] p-8 shadow-lg duration-500 focus-within:shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Show form errors at the top */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-8 rounded bg-red-500/10 p-4">
              <h3 className="mb-2 font-bold text-red-400">
                Please fix the following errors:
              </h3>
              <ul className="list-disc pl-5 text-sm text-red-400">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>{error?.message as string}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Choose your role</h2>
            <div className="grid grid-cols-1! gap-4 sm:grid-cols-3!">
              <div
                className={`flex cursor-pointer flex-col items-center rounded-lg p-6 transition-all ${
                  selectedRole === "developer"
                    ? "border-primary border-2 bg-[#2A2731]"
                    : "border border-white/10 bg-white/5 hover:border-white/30"
                }`}
                onClick={() => handleRoleSelect("developer")}
              >
                <Code
                  size={48}
                  className={
                    selectedRole === "developer"
                      ? "text-primary"
                      : "text-white/70"
                  }
                />
                <h3 className="mt-4 text-lg font-semibold">Developer</h3>
                <p className="mt-2 text-center text-sm text-white/70">
                  Create games and interactive experiences
                </p>
              </div>

              <div
                className={`flex cursor-pointer flex-col items-center rounded-lg p-6 transition-all ${
                  selectedRole === "designer"
                    ? "border-primary border-2 bg-[#2A2731]"
                    : "border border-white/10 bg-white/5 hover:border-white/30"
                }`}
                onClick={() => handleRoleSelect("designer")}
              >
                <Palette
                  size={48}
                  className={
                    selectedRole === "designer"
                      ? "text-primary"
                      : "text-white/70"
                  }
                />
                <h3 className="mt-4 text-lg font-semibold">Designer</h3>
                <p className="mt-2 text-center text-sm text-white/70">
                  Create visuals, UI/UX and game assets
                </p>
              </div>

              <div
                className={`flex cursor-pointer flex-col items-center rounded-lg p-6 transition-all ${
                  selectedRole === "admin"
                    ? "border-primary border-2 bg-[#2A2731]"
                    : "border border-white/10 bg-white/5 hover:border-white/30"
                }`}
                onClick={() => handleRoleSelect("admin")}
              >
                <ShieldCheck
                  size={48}
                  className={
                    selectedRole === "admin" ? "text-primary" : "text-white/70"
                  }
                />
                <h3 className="mt-4 text-lg font-semibold">Admin</h3>
                <p className="mt-2 text-center text-sm text-white/70">
                  Manage community and platform operations
                </p>
              </div>
            </div>
            {errors.role && (
              <p className="mt-2 text-sm text-red-400">{errors.role.message}</p>
            )}

            <hr className="my-10 opacity-10" />
          </div>

          {selectedRole && (
            <>
              {/* Experience */}
              <div className="mb-6">
                <label className="mb-2 block font-medium" htmlFor="experience">
                  Relevant Experience
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <textarea
                  id="experience"
                  className="focus:border-primary min-h-[120px] w-full rounded border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 transition-colors outline-none"
                  placeholder={`Tell us about your experience as ${selectedRole === "admin" ? "an" : "a"} ${selectedRole}...`}
                  {...register("experience")}
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* Portfolio Link */}
              <div className="mb-6">
                <label className="mb-2 block font-medium" htmlFor="urlLink">
                  Portfolio or GitHub Link{" "}
                  <span className="text-white/50">(optional)</span>
                </label>
                <input
                  id="urlLink"
                  type="url"
                  className="focus:border-primary w-full rounded border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 transition-colors outline-none"
                  placeholder="https://"
                  {...register("portfolio")}
                />
                {errors.portfolio && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.portfolio.message}
                  </p>
                )}
              </div>

              {/* Skills Selection */}
              <div className="mb-6">
                <label className="mb-2 block font-medium">
                  Skills (select at least 2)
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <div className="mb-4 flex flex-wrap gap-2">
                  {skillsByRole[selectedRole].map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={`rounded-full px-3 py-1 text-sm transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-primary text-black"
                          : "hover:border-primary border border-white/30 bg-white/5"
                      }`}
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                {/* Custom Skill Input */}
                <div className="flex">
                  <input
                    type="text"
                    className="focus:border-primary flex-1 rounded-l border border-white/10 bg-white/5 p-2 text-white placeholder-white/50 transition-colors outline-none"
                    placeholder="Add another skill..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="rounded-r bg-white/10 px-4 py-2 hover:bg-white/20"
                    onClick={addCustomSkill}
                  >
                    Add
                  </button>
                </div>
                {selectedSkills.length < 2 && (
                  <p className="mt-1 text-sm text-red-400">
                    Select at least 2 skills
                  </p>
                )}

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSkills.map(
                    (skill) =>
                      !skillsByRole[selectedRole].includes(skill) && (
                        <div
                          key={skill}
                          className="flex items-center rounded bg-white/10 px-2 py-1 text-sm"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            className="ml-2 text-white/70 hover:text-white"
                            onClick={() => handleRemoveCustomSkill(skill)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ),
                  )}
                </div>
              </div>

              {/* Motivation */}
              <div className="mb-6">
                <label className="mb-2 block font-medium" htmlFor="motivation">
                  Why do you want to join our team?
                  <span className="ml-1 text-red-400">*</span>
                </label>
                <textarea
                  id="motivation"
                  className="focus:border-primary min-h-[120px] w-full rounded border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 transition-colors outline-none"
                  placeholder="Tell us why you're interested in joining AFKAT..."
                  {...register("motivation")}
                />
                {errors.motivation && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.motivation.message}
                  </p>
                )}
              </div>

              {/* References */}
              <div className="mb-8">
                <label className="mb-2 block font-medium" htmlFor="references">
                  References <span className="text-white/50">(optional)</span>
                </label>
                <input
                  id="references"
                  type="text"
                  className="focus:border-primary w-full rounded border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 transition-colors outline-none"
                  placeholder="Names and contact information of references..."
                  {...register("references")}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/80 text-primary-content rounded px-6 py-3 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-15 text-center">
          <h2 className="mb-4 text-xl font-semibold">
            Join Our Creative Community
          </h2>
          <p className="mx-auto max-w-2xl text-white/70">
            Have questions about the application process? Reach out to us at{" "}
            <a
              href="mailto:membership@afkat.org"
              className="text-primary hover:underline"
            >
              membership@afkat.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BecomeAMember;
