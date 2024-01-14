import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const defaultValue = false;

export const HijriDateContext = createContext({
  showHijriDate: defaultValue,
  setShowHijriDate: (value: boolean) => {},
});

export function HijriDateProvider({ children }: { children: React.ReactNode }) {
  const [showHijriDate, _setShowHijriDate] = useState(defaultValue);
  const setShowHijriDate = useCallback((value: boolean) => {
    _setShowHijriDate(value);
    localStorage.setItem("showHijriDate", String(value));
  }, []);

  useEffect(() => {
    setShowHijriDate(localStorage.getItem("showHijriDate") === "true");
  }, [setShowHijriDate]);

  const value = useMemo(
    () => ({ showHijriDate, setShowHijriDate }),
    [showHijriDate, setShowHijriDate]
  );

  return <HijriDateContext.Provider value={value}>{children}</HijriDateContext.Provider>;
}
