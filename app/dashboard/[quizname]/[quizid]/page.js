'use client'

import Navbar from '@/components/navbar'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import Card from '@/components/Teams'


function Quiz() {
  const [teams, setTeams] = useState([])
  const { data: session } = useSession()
  let { quizname, quizid } = useParams()
  quizname = decodeURIComponent(quizname)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState(1);

  useEffect(() => {
    const getTeams = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/add?name=${quizname}&user=${session.username}`, {
            cache: 'no-store',
            method: 'GET',
          })
          const data = await response.json()
          if (data?.message === 'ok') {
            const { quiz } = data;
            const { teams } = quiz;
            setTeams(teams || [])
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    getTeams()
  }, [session, quizname])

  const scoreChange = async (teamname, action, selectedValue)=> {
    console.log(`Changing score for ${teamname} by ${action}`)
    try {
      const response = await fetch('/api/score', {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'applications/json',
        },
        body: JSON.stringify({username: session?.username, quizname, teamname, action, points: selectedValue})
      })
        const data = await response.json()
        const ok = data?.message === 'ok'
        if(ok){
          const { quiz } = data;
            const { teams } = quiz;
            setTeams(teams || [])
            if(action === 'increase'){
              toast(`${selectedValue} Point for ${teamname}`, { icon: '😊', duration: '500'})
            }else if(action === 'decrease'){
              toast(`${selectedValue} Minus Point for ${teamname}`, { icon: '😢', duration: '500'})
            }
        }
    } catch (error) {
      console.log(error)
    }
  
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      
      if ((key >= '1' && key <= '9') || key === '0') {
        const index = key === '0' ? 9 : parseInt(key) - 1; // '0' maps to 9, '1'-'9' map to 0-8
        if (teams[index]) {
          if (event.altKey) {
            console.log(`Decreasing score for team ${teams[index].name}`);
            scoreChange(teams[index].name, 'decrease', selectedValue);
          } else {
            console.log(`Increasing score for team ${teams[index].name}`);
            scoreChange(teams[index].name, 'increase', selectedValue);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [teams, scoreChange]);


  const handleChange = (event) => {
    setSelectedValue(parseInt(event.target.value));
  };

  const finishQuiz = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/winner', {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: session?.username, quizname }),
      });
      const data = await response.json();
      if (data?.message === 'ok') {
        router.push(`/dashboard/${quizname}/${quizid}/winner`)
        
      }else{
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container relative mx-auto p-4  text-black ">
        <h2 className="text-3xl font-bold pb-4 dark:text-white mb-4 font-score justify-center items-center flex text-red"> SCOREBOARD</h2>
        <div className='grid lg:flex gap-3'>
        <p className='dark:text-white'>Custom points: </p>
        <select className='outline-none border dark:bg-white border-red rounded-md' id="number-select" value={selectedValue} onChange={handleChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
        </div>
        
          {teams.length > 0 ?
          <>
            <div>
            <div className="grid lg:grid-cols-3 gap-4">
              {teams.map((team, index) => (
                <Card key={index} index={index} team={team}/>
              ))}
            </div>
          </div>
          </>
         : (
            <p></p>
          )}
        <div className='flex justify-center items-center pb-4'>
        <button disabled={loading} onClick={finishQuiz} className='bg-teal-500  px-4 text-white py-2 rounded-md'>{loading ? <LoadingOutlined/> : 'Finish quiz'}</button>
        </div>
      </div>
    </>
  )
}

export default Quiz
