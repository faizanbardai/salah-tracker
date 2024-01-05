import useSWR from "swr";

type ClientLocationProps = {
  ip_address: string | null;
  user_agent: string | null;
};

export default function ClientLocation() {
  const fetcher = (url: string): Promise<ClientLocationProps> =>
    fetch(url).then((res) => res.json());
  const url = "/api/ip";
  const { data, error, isLoading } = useSWR(url, fetcher, { revalidateOnFocus: false });
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Failed to load</div>;
  return <div>{data.ip_address}</div>;
}
