import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';

import { addDoc } from 'firebase/firestore';
import {moviesRef}  from '../Firebase/Fire';
import swal from 'sweetalert';
import SweetAlertIcons from 'vue-sweetalert-icons';



function AddMovie() {

    const [from , setFrom] = useState({
      name:"",
      year:"",
      description : "",
      image : "",
      rated: 0,
      Rating: 0
    });

    const [loading , setLoading] = useState(false)

  
    const addMovie = async() => {
   setLoading(true);
      await addDoc(moviesRef , from);
      // this is showing Interactive 
    swal({
      title: "Sucessfully Added",
    icon:"success",
      timer :3000,
      buttons:false,
    })
  //  <template>
  //   <sweetalert-icon icon="success" />
  //   </template>

  
      setLoading(false);
    }



  return (
    <div className=''>
        <section class="text-gray-300 body-font relative">
  <div class="container px-5 py-8 mx-auto">
  <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-xl font-medium title-font mb-3 mt-10 text-pink-400">Add New Movie</h1>
   
    </div>




    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white">Name</label>
            <input 
            type="text" 
             id="name"
              name="name"
              value={from.name}
              onChange={(e) => setFrom({...from , name:e.target.value})}
             class="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>


        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="email" class="leading-7 text-sm text-white">Year</label>
            <input type="email"
            value={from.year}
            onChange={(e)=> setFrom({...from , year: e.target.value })} id="email" name="email" class="w-full bg-gray-100 rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
           
          </div>
        </div>



        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-white">Description</label>
            <input value={from.description}
            onChange={(e)=> setFrom({
              ...from , description:e.target.value
            })}
             id="message" name="message" class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-15 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
          </div>
             </div>





             <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-white">image</label>
            <input value={from.image}
            onChange={(e)=> setFrom({
              ...from , image:e.target.value
            })}
             id="message" name="message" class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-56 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
          </div>
             </div>





        <div class="p-2 w-full">
          <button onClick={addMovie} class="flex mx-auto text-white bg-green-900 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
          {/* /* // this is for loading  */ }
          {loading ? <TailSpin height={45} color='white' /> :
          'SUBMIT' }</button>
        </div>
         
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default AddMovie