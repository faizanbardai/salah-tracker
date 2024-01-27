import { Checkbox, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { KeyedMutator } from "swr";
import { PrayerDay } from "@/types/prayerDay";

type TahajjudRowProps = {
  date: string;
  tahajjud: boolean;
  mutate: KeyedMutator<PrayerDay>;
};
export default function TahajjudRow({ date, tahajjud, mutate }: TahajjudRowProps) {
  const [loading, setLoading] = useState(false);
  function handleChange(tahajjud: boolean) {
    setLoading(true);
    fetch("/api/dayPrayers", {
      method: "POST",
      body: JSON.stringify({
        status: tahajjud,
        date,
        prayer: "tahajjud",
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
      <div className="flex-1">Tahajjud</div>
      {loading && <Spinner color="primary" />}
      <Checkbox
        defaultSelected={tahajjud}
        size="lg"
        color="success"
        icon={<FaHouseChimneyUser />}
        onValueChange={handleChange}
      ></Checkbox>
    </div>
  );
}
