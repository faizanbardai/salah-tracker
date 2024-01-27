import { Checkbox, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { KeyedMutator } from "swr";
import { PrayerDay } from "@/types/prayerDay";

type FastRowProps = {
  date: string;
  fast: boolean;
  mutate: KeyedMutator<PrayerDay>;
};
export default function FastRow({ date, fast, mutate }: FastRowProps) {
  const [loading, setLoading] = useState(false);
  function handleChange(fast: boolean) {
    setLoading(true);
    fetch("/api/dayPrayers", {
      method: "POST",
      body: JSON.stringify({
        status: fast,
        date,
        prayer: "fast",
      }),
    })
      .then((res) => {
        const data = res.json() as Promise<PrayerDay>;
        mutate(data, { revalidate: false });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="flex gap-4 items-center" style={{ height: "40px" }}>
      <div className="flex-1">Fast</div>
      {loading && <Spinner color="primary" />}
      <Checkbox
        defaultSelected={fast}
        size="lg"
        color="success"
        icon={<FaUser />}
        onValueChange={handleChange}
      ></Checkbox>
    </div>
  );
}
