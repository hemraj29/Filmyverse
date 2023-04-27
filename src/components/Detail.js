import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { moviesRef } from '../Firebase/Fire';
import { doc } from 'firebase/firestore';
import { db } from '../Firebase/Fire';
import { Bars, ThreeCircles } from 'react-loader-spinner';
import Reviews from './Reviews';

const Detail = () => {

    const { id } = useParams();
    console.log(id);
    // alert(id);
    const [data,setData] = useState({
        title:"",
        image:"",
        year:"",
        description:"",
        Rating : 0,
        rated: 0
    })
 
    // this is for show loading screen 
      const [loading , setLoading] = useState(true);
    useEffect(() => {
        async function getData() {
            const _doc = doc(db,"movies",id);
            const data_ = await getDoc(_doc);
             
           setLoading(false);
          //  const data_ = await getDoc(moviesRef, id);
            setData(data_.data());

        }
        getData();
    }, [])
             
             
    return (
        <div className=' w-full p-4 md:p-0 pt-4 mt-4 flex flex-col md:flex-row md:items-start justify-center'>
          
          {  loading ? <div className='h-96 flex w-full justify-center items-center'>  <ThreeCircles height={40}/>  </div> :   
            <>

            <img className='h-96' src={data.image} alt='Movie Poster' />

            
            <div className=' md:ml-4 p-5 w-full md:w-1/2'>
                <h1 className='text-2xl font-bold text-gray-100 mt-4'>  {data.title}
                    <span className='text-xl'> {data.year}</span></h1>

                    <p>This Page Shows Detail </p>
                      
                
                <ReactStars
                    size={25}
                    half={true}
                   value={data.Rating/data.rated}
                   edit={false}
                    
                />

                <p className='mt-3 pt-4'>{data.description}
                
                </p>
                <Reviews id={id} prevRating={data.Rating} userRated={data.rated} />
            </div>
            </> }
        </div>
    )
}

export default Detail