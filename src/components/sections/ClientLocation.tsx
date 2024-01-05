import useSWR from "swr";

export default function ClientLocation() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const url = "/api/ip";
  const { data, error, isLoading } = useSWR(url, fetcher, { revalidateOnFocus: false });
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Failed to load</div>;
  return (
    <div>
      Fajr: {data.Fajr}, Dhuhr: {data.Dhuhr}
    </div>
  );
}
