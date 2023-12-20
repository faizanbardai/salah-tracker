import getProfile from "../../service/auth/getProfile";

export default async function LoginButton() {
  const profile = await getProfile();
  console.log(profile);
  return (
    <div>
      <a href="/.auth/login/google">Log in with Google</a>
      {/* Display profile json as text */}
      <div>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </div>
  );
}
