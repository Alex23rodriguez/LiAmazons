import { signIn,useSession} from 'next-auth/react'

const Settings = ()=>{
  const { data: session } = useSession();

  console.log(session)
  return session ? "settings page (TODO)" : <button onClick={()=>signIn()}>sign in</button>
}

export default Settings
