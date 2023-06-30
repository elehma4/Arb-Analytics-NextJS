import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login, checkToken} from '../../components/auth/authSlice';
import { useNavigate } from 'react-router-dom'



const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isLoading = useSelector(state => state.isLoading)
  const token = useSelector(state => state.token) 

  const navigate = useNavigate(); 
  const dispatch = useDispatch();


  useEffect(() => {
    
    if(localStorage.token){
      dispatch(checkToken())
    }
  
  }, [])


  useEffect(() => {
    
    if(!isLoading && token ){
      navigate('/main')
    }
  }, [token])
  

  const handleSubmit = (e) => {
    
    e.preventDefault() 

    let dataObj = {
      formData: {
        email, password
      }
    }

    dispatch(login(dataObj))
  }

  return (
    <div className="mt-5">
      <div className="grid place-items-center">
        <div className="register">
          <img
            className="h-16"
            src="https://avatars.githubusercontent.com/u/67744643?s=200&v=4"
            alt=""
          />
          <h2 className="text-2xl font-bold">Sign In</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form__field">
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@mailaddress.com"
              />
            </div>
            <div className="form__field">
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
            <div className="form__field">
              <input
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                type="submit"
                value="Log In"
              />
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
  
export default Signin;