import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { checkValidateData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { BG_URL, User_Img } from "../utils/constants";

const LoginPage = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState(null);
  const email = useRef(null);
  const password = useRef(null);        
  const name = useRef(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();
//   useEffect(()=>setErrors({}),[isSignInForm])
  const handleSubmit = () => {
    const res = checkValidateData(
      isSignInForm,
      name?.current?.value,
      email?.current?.value,
      password?.current?.value
    );
    console.log(res);
    setErrors(res);
    // if error then return
    // if (res != {}) return;
    if (Object.keys(res).length!==0) return;
    // if no error check if it is sign in form or login form 
    if (isSignInForm) {
        //firebase docs create user
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name?.current?.value, photoURL: "https://i.pinimg.com/564x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg"
          }).then(() => {
            const {uid,email,displayName,photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
            navigate('/browse')
            // Profile updated!
            // ...
          }).catch((error) => {
            setErrors({ main: error.message });
            // An error occurred
            // ...
          });
          console.log(user, "created user");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode=='auth/email-already-in-use'){
            setErrors({ main: 'User Already Exists' });
          }
          else{
            setErrors({ main: errorCode+ ' - ' +errorMessage });
          }
        });
    } else {
        console.log('login')
        //firebase docs login user
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, "user");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage,errorCode)
          if(errorCode=='auth/invalid-credential'){
              setErrors({ main: 'Invalid Credentials' });
          }
          else{
            setErrors({ main: errorCode+ ' - ' +errorMessage });
          }
        });

    }
  };
  return (
    <div className='w-[100dvw] h-[100dvh]  flex items-center justify-center'   style={{ 
      backgroundImage: `url(${BG_URL})`}}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[27rem] min-h-[24rem] bg-black mt-5 text-white p-14 bg-opacity-80"
      >
        <p className="text-3xl mb-6 font-bold">
          {isSignInForm ? "Sign In" : "Login"}
        </p>
        {isSignInForm && ( 
          <>
            <label htmlFor="" className="block mt-1 text-sm">
              Full Name
            </label>
            <input
              ref={name}
              type="text"
              className="my-2 p-3 bg-opacity-30 bg-blue-200 w-full rounded-md focus:bg-black focus:bg-opacity-100"
              placeholder="Name"
            />
            {errors?.name && (
              <p className="text-sm font-semibold text-red-600 mb-3">
                {errors?.name}
              </p>
            )}
          </>
        )}

        <label htmlFor="" className="block mt-1 text-sm">
          Email
        </label>
        <input
          ref={email}
          type="text"
          className="my-2 p-3 bg-opacity-30 bg-blue-200 w-full rounded-md focus:bg-black focus:bg-opacity-100"
          placeholder="Email"
        />
        {errors?.email && (
          <p className="text-sm font-semibold text-red-600 mb-3">
            {errors?.email}
          </p>
        )}

        <label htmlFor="" className="block mt-1 text-sm ">
          Password
        </label>
        <div className="flex items-center bg-opacity-30 bg-blue-200 w-full rounded-md my-2 focus-within:bg-black focus-within:bg-opacity-100 focus-within:border-white focus-within:border">
          <input
            ref={password}
            type={showPass ? "text" : "password"}
            className="p-3 bg-transparent outline-none w-[90%]"
            placeholder="Password"
          />

          <div
            className="w-[10%] cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            <FaEye />
          </div>
        </div>
        {errors?.password && (
          <p className="text-sm font-semibold text-red-600 mb-3">
            {errors?.password}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="px-3 bg-red-600 hover:bg-red-700 w-full py-2.5 my-4 rounded-md text-white font-semibold"
        >
          {isSignInForm ? "Sign In" : "Login"}
        </button>
        {errors?.main && (
          <p className="text-sm font-semibold text-red-600 mb-3">
            {errors?.main}
          </p>
        )}
        <p
          className="cursor-pointer"
          onClick={() => setIsSignInForm(!isSignInForm)}
        >
          {isSignInForm
            ? "Already registered ? Login"
            : "New user ? Sign up now"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

// https://cinemeta-catalogs.strem.io/imdbRating/catalog/movie/imdbRating.json
