import { signIn,useSession} from 'next-auth/react'

const Profile = ()=>{
  const { data: session } = useSession();

  console.log(session)
  return session ? session : <button onClick={()=>signIn()}>sign in</button>
}

export default Profile
