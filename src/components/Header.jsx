import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/store/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {Logo} from '../utils/constants'
import { toggleGPTSearch } from "../utils/store/gptSlice";
import { changeLanguage } from "../utils/store/configSlice";
const Header = () => {
    const user = useSelector(store=>store.user);
      const GPTView=useSelector(store=>store.GPTSearch.showGPT)
    const [searchParams]=useSearchParams()
    const dispatch=useDispatch();
    // const navigate=useNavigate();
    const handleSignOut=()=>{
        signOut(auth).then(()=>{
            // navigate('/')
        }).catch((error)=>{
            console.log('error',error)
            // navigate()
        })
    }
  return (
    <div className="flex flex-col sm:flex-row fixed top-0 z-20 bg-gradient-to-b from-black from-70% w-full px-20 py-2 justify-between">
      <Link to='/browse'><img
        src={Logo}
        className="w-[12rem] h-[5rem]"
        alt=""
      /></Link>
{ user &&    
      <div className="sm:p-2 flex sm:gap-6 gap-2 items-center text-white justify-center">
        <select name="" id="" onChange={(e)=>dispatch(changeLanguage(e.target.value))} className="text-white bg-black p-2 rounded-lg">
          <option value='en'>English</option>
          <option value='hindi'>Hindi</option>
          <option value='spanish'>Spanish</option>
        </select>
        {!searchParams.get('q') && <button className="bg-purple-700 py-2 px-3 rounded-full text-white text-sm" onClick={()=>dispatch(toggleGPTSearch())}>{GPTView?'Homepage':'GPT Search'}</button>}
        <img src={user?.photoURL} alt="usericon" className="size-[2.5rem] object-cover rounded-lg" />
        <p className="font-semibold">{user?.displayName}</p>
        <button
          className="px-3 h-[2.5rem] text-sm font-semibold bg-red-600 text-white rounded-lg"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
        }
    </div>
  );
};

export default Header;
