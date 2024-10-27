import React, { useState, useEffect } from 'react';
import Button from '../../../../utils/Button';
import Select from '../../../../utils/Form/Select';

const themes = ["System Default", "Light", "Dark"];

const languages = [
  { label: "English", value: "english" },
  { label: "Hindi", value: "hindi" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Mandarin", value: "mandarin" },
  { label: "Japanese", value: "japanese" },
  { label: "Russian", value: "russian" },
  { label: "Korean", value: "korean" },
  { label: "Portuguese", value: "portuguese" },
  { label: "Arabic", value: "arabic" },
  { label: "Italian", value: "italian" }
];

const Appearance: React.FC = () => {

  const getSystemTheme = (): "Light" | "Dark" => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light";
  };

  const [selectedTheme, setSelectedTheme] = useState<string>('System Default'); 
  const [effectiveTheme, setEffectiveTheme] = useState<string>(getSystemTheme()); 
  const [language, setLanguage] = useState<string>('english');

  useEffect(() => {
    if (selectedTheme === 'System Default') {
      const systemTheme = getSystemTheme();
      setEffectiveTheme(systemTheme);

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        setEffectiveTheme(e.matches ? "Dark" : "Light");
      };

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, [selectedTheme]);

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);

    if (theme === 'System Default') {
      setEffectiveTheme(getSystemTheme());
    } else {
      setEffectiveTheme(theme);
    }
    console.log('Selected Theme:', theme, '| Effective Theme:', effectiveTheme);
  };

  return (
    <div className="px-4">
      <h1 className="text-lg font-semibold text-zinc-200 border-b-[1px] border-zinc-600 py-2">Appearance Settings</h1>
      <div className="p-2">
        <h3 className="text-zinc-500">Theme</h3>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Color Mode</p>
          <div className="grid grid-cols-3 col-span-2 bg-zinc-700 rounded-md">
            {themes.map((theme, idx) => (
              <Button
                label={theme}
                key={idx}
                className={`text-xs px-1 py-1 hover:bg-zinc-900 ${selectedTheme === theme ? 'bg-zinc-900' : 'bg-zinc-700'}`}
                onClickFunc={() => handleThemeChange(theme)} 
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2">
          <p className="col-span-1">Default language</p>
          <div className="col-span-2 w-full">
            <Select
              value={language}
              options={languages}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-zinc-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
