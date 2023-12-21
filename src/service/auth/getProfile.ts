// import { redirect } from "next/navigation";

const getProfile = async () => {
  try {
    const res = await fetch("https://salah-tracker.azurewebsites.net/.auth/me");
    return res.json();
  } catch (error) {
    return { error };
  }
};

export default getProfile;
