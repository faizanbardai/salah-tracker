import { redirect } from "next/navigation";

const getProfile = async () => {
  const res = await fetch("https://salah-tracker.azurewebsites.net/.auth/me");
  if (res.status !== 200) {
    return null;
  } else {
    const json = await res.json();
    console.log(json);
    redirect("/profile");
  }
};

export default getProfile;
