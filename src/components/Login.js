import React, { useContext, useRef, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { userRef } from '../Firebase/Fire';
import { data } from 'autoprefixer';
import bcrypt from 'bcryptjs'
import { Appstate } from '../App';








function Login() {
  const useAppstate = useContext(Appstate);
  const navigate  = useNavigate();
  const [from, setFrom] = useState({
    mobile: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);


  // perfrom as a clickhandler of login button

  const login = async () => {
    setLoading(true);

    try {
      // yha pe hum password and mobile no match karenge

      const quer = query(userRef, where('mobile', '==', from.mobile))
      const querySnapshot = await getDocs(quer);

      // iske ander compare hoga
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(from.password , _data.password);
        if (isUser) {
           useAppstate.setLogin(true);
           navigate('/');
           swal({
             title: "success",
             icon: "success",
             buttons: false,
             timer: 3000
            })


        }
        else {
          swal({
            title: "invalid Credential",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
    })


    }


    catch (error) {
      swal({
        title: "error ",
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }




  return (
    <div className='w-full flex  flex-col items-center mt-9'>
      <h1 className='text-xl font-bold '>Login</h1>


      <div class="p-2  w-full md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-white">Mobile Number</label>
          <input
            type="number"
            id="name"
            name="name"
            value={from.mobile}
            onChange={(e) => setFrom({ ...from, mobile: e.target.value })}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>


      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="name" class="leading-7 text-sm text-white">Password</label>
          <input
            type="password"
            id="name"
            name="name"
            value={from.password}
            onChange={(e) => setFrom({ ...from, password: e.target.value })}
            class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className='p-2 w-full'>
        <button

          onClick={login}
          class="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">

          {loading ? <TailSpin height={45} color='white' /> :
            'Login'}</button>
      </div>


      <div>
        <p>Didn't have account? <Link to={'/signup'}><span className='text-blue-500'>Signup</span> </Link></p>
      </div>


    </div>
  )
}

export default Login