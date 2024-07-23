'use client'

import Navbar from "@/components/navbar";
import Quiz from "@/components/quiz";
import { LoadingOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";





function Dashboard() {

    const {data: session} = useSession()
    const [showPopOver, setShowPopover] = useState(false)
    const [title, setTitle] = useState('')
    const [cordinator, setCordinator] = useState('')
    const [school, setSchool] = useState('')
    const router= useRouter()
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

   useEffect(()=>{
    if(session){
      async function fetchquiz(){
        try {
          const response = await fetch(`/api/quizzes?username=${session.username}`, {
            cache: 'no-store',
            method: 'GET',
          })
          const data = await response.json()
          if (data?.message === 'ok') {
            setQuizzes(data.quizzes || [])
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchquiz()
    }
   },[session])

   setTimeout(() => {
    setLoading(false);
  }, "3000");
    
  const createquiz = async (e) => {
    setLoading(true)
    try{
      e.preventDefault();
      if (!title || !cordinator || ! school) {
        setError('please fill the fields')
         setLoading(false)
         return;
       }
    const response = await fetch('/api/create', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'applications/json',
      },
      body: JSON.stringify({title, cordinator, school,  username: session.username})
    })
      const data = await response.json()
      const ok = data?.message === 'ok'
      if(ok){
        router.push(`/dashboard/${title}`)
      }else{
        setLoading(false)
        setError('Quiz with this title already exists')
      }
  }catch(error){
    setLoading(false)
    console.log(error)
  }
  }

  return (
    <>
    <Navbar
        themeMode={'light'}
      />
      {!showPopOver &&
        (<>
        
        
        <button
          className="mx-auto mb-14 flex items-center justify-center rounded-lg bg-teal-500 px-5 py-2.5 text-3xl font-medium text-white"
          onClick={()=>setShowPopover(true)}
        >
          Create Quiz
        </button> 
        {quizzes.length > 0 && !loading && <Quiz quizzes={quizzes}/>}
        {loading && <div className="w-full flex items-center justify-center mb-20"><LoadingOutlined className="text-4xl"/></div>}
        {quizzes.length == 0 && !loading && <h1 className=" mx-auto mb-10 text-4xl text-center text-gray-800 max-w-lg p-6 border-2 border-gray-600 rounded-lg bg-white shadow-lg italic">
          I'm hosting a quiz show, but I never considered myself a game show host.
      </h1>}
        </>
      
      )}  
        {showPopOver  && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9gDujS4O5Eqe1NrlXwaFNvTf53q6ulWo1cg&s"
            className="mx-auto h-10 w-auto bg-clip-padding bg-transparent rounded-full"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Create Quiz
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" >

          <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                School Name
              </label>
              <div className="mt-2">
                <input
                  name="School Name"
                  value={school}
                  onChange={(e)=>setSchool(e.target.value)}
                  type="text"
                  required
                  className="block bg-white px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Quiz Title
              </label>
              <div className="mt-2">
                <input
                  name="Title"
                  type="text"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                  className="block bg-white px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Coordinator
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  value={cordinator}
                  onChange={(e)=>setCordinator(e.target.value)}
                  name='cordinator'
                  required
                  autoComplete="current-password"
                  className="block bg-white px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {error && <p className="py-3">{error}</p>}
              <button
                type="submit"
                onClick={createquiz}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? <LoadingOutlined/> : 'Next'}
              </button>
            </div>
          </form>

          
        </div>
      </div>
        )}  
       
    </>
  )
}

export default Dashboard