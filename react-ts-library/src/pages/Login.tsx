import { LoginForm } from "../components/LoginForm";
import { NotAllowed } from "../components/NotAllowed";
import { useAuth } from "../data/useAuth";


const Login = () => {
    const {user} = useAuth();

    if (!user){
      return (
        <div className='container'>
            <LoginForm></LoginForm>
        </div>
        );
    } else {
      return(
        <div className='container'>
          <NotAllowed></NotAllowed>
        </div>
      );
    }
  };

export default Login;