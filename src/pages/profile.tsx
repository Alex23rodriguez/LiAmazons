import { Avatar } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <>
      <h1>Profile</h1>
      {/* <Avatar */}
      {/*   sx={{ */}
      {/*     width: 64, */}
      {/*     height: 64, */}
      {/**/}
      {/*     bgcolor: "red", */}
      {/*   }} */}
      {/*   // src="http://placeimg.com/300/300/people" */}
      {/*   src="" */}
      {/* /> */}
      <h3>Name</h3>
      {session?.user?.name}
      <h3>Email</h3>
      {session?.user?.email}
      <h3>Image</h3>
      {session?.user?.image}

    </>
  );
};

export default Profile;
