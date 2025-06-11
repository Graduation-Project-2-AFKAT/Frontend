import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTheme } from "../../redux/modules/themes";
import { toast } from "react-toastify";

interface ThemeCard {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    "base-100": string;
  };
}

const Themes = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.themes.current);

  const [selectedTheme, setSelectedTheme] = useState<string>(
    currentTheme || "dark",
  );

  const themes: ThemeCard[] = [
    {
      id: "dark",
      name: "Default",
      colors: {
        primary: "#1FB2A5",
        secondary: "#D926AA",
        accent: "#661AE6",
        neutral: "#191D24",
        "base-100": "#2A303C",
      },
    },
    {
      id: "synthwave",
      name: "Synthwave",
      colors: {
        primary: "#E779C1",
        secondary: "#58C7F3",
        accent: "#F3CC30",
        neutral: "#20134E",
        "base-100": "#2D1B69",
      },
    },
    {
      id: "halloween",
      name: "Halloween",
      colors: {
        primary: "#F28C18",
        secondary: "#6D3A9C",
        accent: "#51A800",
        neutral: "#1F1D2E",
        "base-100": "#2E2A36",
      },
    },
    {
      id: "forest",
      name: "Forest",
      colors: {
        primary: "#1EB854",
        secondary: "#1FD65F",
        accent: "#D99330",
        neutral: "#110E0E",
        "base-100": "#171212",
      },
    },
    {
      id: "night",
      name: "Night",
      colors: {
        primary: "#38BDF8",
        secondary: "#818CF8",
        accent: "#F471B5",
        neutral: "#1E293B",
        "base-100": "#0F172A",
      },
    },
    {
      id: "coffee",
      name: "Coffee",
      colors: {
        primary: "#DB924B",
        secondary: "#263E3F",
        accent: "#10576E",
        neutral: "#120C12",
        "base-100": "#20161F",
      },
    },
    {
      id: "dim",
      name: "Dim",
      colors: {
        primary: "#9FE88D",
        secondary: "#FF7D5C",
        accent: "#C148AC",
        neutral: "#21202E",
        "base-100": "#2A2B36",
      },
    },
    {
      id: "sunset",
      name: "Sunset",
      colors: {
        primary: "#FF865B",
        secondary: "#D63E6C",
        accent: "#F98943",
        neutral: "#312824",
        "base-100": "#221B17",
      },
    },
    {
      id: "abyss",
      name: "Abyss",
      colors: {
        primary: "#BDFF00",
        secondary: "#9477E4",
        accent: "#FFB765",
        neutral: "#131620",
        "base-100": "#090B13",
      },
    },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }, [selectedTheme, dispatch]);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const saveTheme = () => {
    dispatch(setTheme(selectedTheme));
    toast.success("Theme applied successfully");
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Choose a Theme</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
              selectedTheme !== theme.id
                ? "border-base-content/20 hover:border-base-content/100"
                : "border-primary"
            }`}
            onClick={() => handleThemeSelect(theme.id)}
          >
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-md font-medium">{theme.name}</h3>
                {selectedTheme === theme.id && (
                  <Check size={20} className="text-primary" />
                )}
              </div>

              {/* Color palette preview */}
              <div className="flex h-10 w-full overflow-hidden rounded">
                <div
                  className="h-full w-1/5"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div
                  className="h-full w-1/5"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div
                  className="h-full w-1/5"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <div
                  className="h-full w-1/5"
                  style={{ backgroundColor: theme.colors.neutral }}
                />
                <div
                  className="h-full w-1/5"
                  style={{ backgroundColor: theme.colors["base-100"] }}
                />
              </div>

              {/* Theme preview */}
              <div
                className="border-base-content/10 mt-4 rounded border p-4"
                style={{ backgroundColor: theme.colors["neutral"] }}
              >
                <div className="flex flex-col gap-2">
                  <div
                    className="h-4 w-3/4 rounded"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="h-2 w-5/6 rounded"
                    style={{
                      backgroundColor: theme.colors.secondary,
                      opacity: 0.7,
                    }}
                  />
                  <div
                    className="h-2 w-4/6 rounded"
                    style={{
                      backgroundColor: theme.colors.accent,
                      opacity: 0.5,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 mb-15 flex justify-end">
        <button
          className="btn btn-primary rounded font-bold"
          onClick={saveTheme}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Themes;
