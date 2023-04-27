import React, { useEffect, useState } from 'react'
import { Audio,ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from './Firebase/Fire';
import { Link } from 'react-router-dom';
const CaedStyle = () => {
    const [data, setData] = useState([]);
    const [loding, setLoading] = useState(false);
    useEffect(() => {
        // getting data from firebase Database
        async function getData() {
            setLoading(true);

            const _data = await getDocs(moviesRef);
          _data.forEach((doc) =>{
            setData((prv)=> [...prv ,{...(doc.data()) ,id:doc.id}])
           // console.log(doc.id);
    
          })
      
            setLoading(false);
        }
        getData();
    }, [])


    return (
        <div className='flex flex-wrap justify-between
     p-2 mt-2 m-4 ' >

            {loding ? <div className=' w-full flex justify-center items-center'> <ThreeDots height={40} color='white' /> </div> :
                data.map((e, i) => {

                    return (

                      <Link to={`/detail/${e.id}`}>  <div key={i} className=' m-9 card text-sm font-bold  shadow-lg shadow-white p-2 hover:-translate-y-3 cursor-pointer  mt-6 transition-all duration-500'>
                            <img className='h-40 md:h-72' src={e.image} />

                            <h1> <span className='text-blue-500'> Name: </span>{e.name}</h1>

                            <h1 className=''><span className='text-gray-400 flex items-start ' > Rating :  <ReactStars count={5} size={15} half={true}
                                value={e.rating/e.rated} edit={false} /></span></h1>
                            <h1><span className='text-green-700'>Year :</span>{e.year}</h1>

                        </div>
                        </Link>
                    );

                })

            }


        </div>

    )

}

export default CaedStyle