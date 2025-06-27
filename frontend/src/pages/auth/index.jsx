import {auth, provider} from "../../config/firebase-config"
import {signInWithPopup} from 'firebase/auth'
export const Auth = ()=>{
    
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth,provider)
        console.log(results)
    }
    
    return (<div classNmae = "login-page">
        <p>Sign in with google</p>
        <button className="login-with-google-button" onClick={signInWithGoogle}>
            {" "}
            Sign in with google
            </button>
        
        </div>
        
    )

}