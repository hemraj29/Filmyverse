import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviwesRef,db} from '../Firebase/Fire';
import { addDoc,doc,updateDoc , query, where , getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { Share } from '@mui/icons-material';
import swal from 'sweetalert';


/// 2:56



const Reviews = ({id , prevRating ,userRated}) => {
  const [rating,setRating] = useState(0);
 const [loading,setLoading] = useState(false);
const [from, setFrom] = useState("")
const[data,setData] = useState([]);
const [reviewsload,setReviewload] = useState(false);




  const sendReview = async () =>
  {
    
try {
     setLoading(true)
  await addDoc(reviwesRef,{
    movieId: id ,
    Name: "hemraj yadav" ,
    Rating : rating,
    thought : from ,
    Timestamp : new Date().getTime()
  })

// this is for show the ratig of movie in based on
// given review rating
  const ref = doc(db,"movies",id);
  await updateDoc(ref,{
    rating : prevRating + rating ,
     rated : userRated + 1
  })
  

swal(
  {
    title:"Review Send Sucessfully",
    icon: 'success',
    buttons:false,
    timer:3000
  }
  
)

setFrom("");
setRating(0)
  
} 
catch (error) 
{
  swal({
    title:'error Meassage',
    icon:'error',
    buttons:false,
    timer:3000
  })
  
}
 setLoading(false)
  }

  // for get reviews of particular movie
      useEffect(()=>{
          async function getData(){
            setReviewload(true)
              let quer = query(reviwesRef, where('movieId', '==' , id))
              const querySnapshot = await getDocs(quer)

              querySnapshot.forEach((doc)=>{
                setData((prev)=>[...prev ,doc.data()])
              })
            setReviewload(false)
        }
        getData();
          },[])





  return (
      <div className='mt-2 py-2 border-t-2 border-gray-400 w-full'>

            <ReactStars
              size={20}
              half={true}
              onChange={(rate)=> {setRating(rate)
              // alert(rate)
              }}
             //  value={rating}
           
            />

            <input  
            type='text'
            value={from} 
            onChange={(e)=>{
              setFrom(e.target.value)
            }}
              placeholder='Share Your Thoughts...'
              className='w-full p-2 text-black outline-none  '
            />
            <button onClick={sendReview} className='mt-2 bg-green-600 w-full p-2 flex justify-center '>
             {
              loading ? <TailSpin height={20} color='white'/> :
             'Share'
             }
            </button>
           
              {
               reviewsload ? <div className='buttonc mt-3 flex justify-center items-center '  > 
  <ThreeDots height={15} color='white'/>
               </div>
               :
                <div className='mt-4'>
                  {
                    data.map((e,i) => {
                      return(
                        <div key={i} className='bg-gray-900  w-full  p-2 mt-2 border-b border-gray-600 '> 
                           <div className='flex items-center'>
                                <p className='text-blue-300'>{e.Name}</p>
                                <p className='ml-2 text-xs'>({new Date(e.Timestamp).toLocaleString()})</p>
                           </div>
                               <ReactStars
                               size={25}
                               half={true}
                               value={e.Rating}
                                />
                           <p>{e.thought}</p>
                        
                        </div>
                      )
                    })
                  }
                </div>
              }
           
      </div>
  )
}

export default Reviews