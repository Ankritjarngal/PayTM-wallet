import { useNavigate } from "react-router-dom";

export function AuthComponent({ mode }) {
  const navigate=useNavigate()
    const isLogin = mode === 'Signin';
    const isSignUp = mode === 'Signup'; 

  
    return (
      <div >
        {isLogin && (
          <p className="text-gray-700">
            Don't have an account?{' '}
            <span className="text-blue-500 cursor-pointer" onClick={()=>{
              navigate("/signup")
            }}>Sign up</span>
          </p>
        )}
  
        {isSignUp && (
          <p className="text-gray-700">
            Already have an account?{' '}
            <span className="text-blue-500 cursor-pointer" onClick={()=>{
              navigate("/signin")
            }}>Signin</span>
          </p>
        )}
      </div>
    );
  }
  