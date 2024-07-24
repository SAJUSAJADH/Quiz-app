'use client'

import Navbar from '@/components/navbar'
import TeamForm from '@/components/teamform'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4} from 'uuid'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { app } from '@/firebase'

function QuizName() {

    const [teamName, setTeamName] = useState('')
    const [teamMembers, setTeamMembers] = useState('')
    let {quizname} = useParams()
    quizname = decodeURIComponent(quizname)
    const {data: session} = useSession()
    const [Teams, setTeams] = useState([])
    const [id, setId] = useState('')
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState('')
    const [quizload, setQuizload] = useState(false)
    const [school, setSchool] = useState('')
    const [fileSelected, setFileSelected] = useState(false);
    const [previewImg, setPreviewImg] = useState('https://w7.pngwing.com/pngs/912/224/png-transparent-computer-icons-institution-funds-miscellaneous-blue-text-thumbnail.png');
    const [url, setUrl] = useState('')


    useEffect(()=>{
      async function getData(){
        if(session){
          try {
            const response = await fetch(`/api/add?name=${quizname}&user=${session.username}`, {
              cache: 'no-store',
              method: 'GET',
            })
              const data = await response.json()
              const ok = data?.message === 'ok'
              if(ok){
                const {quiz} = data;
                const {_id} = quiz;
                const {teams} = quiz;
                setId(_id)
                setTeams(teams)
              }
          } catch (error) {
            console.log(error)
          }
        }
      }
      getData()
    },[session])


    const uploadProfile = async () => {
      const blob = await fetch(previewImg).then((res) => res.blob());
      const uniqueId = uuidv4();
      const fileName = `${uniqueId}`;
      const storage = await getStorage(app);
      const storageRef = await ref(storage, `profile/${fileName}`);
      const metadata = {
        contentType: 'image/jpeg', // Set the content type to image/jpeg
      };
  
      await uploadBytes(storageRef, blob, metadata);
      console.log('uploaded');
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL)
      console.log(downloadURL)
    
  };
    

    const Add = async (e)=> {
      e.preventDefault();
      setLoading(true)
      try {
        
        if(!teamName || !teamMembers || !school ){
          setLoading(false)
          setError('Enter team name and members')
          return
        }

      const blob = await fetch(previewImg).then((res) => res.blob());
      const uniqueId = uuidv4();
      const fileName = `${uniqueId}`;
      const storage = await getStorage(app);
      const storageRef = await ref(storage, `profile/${fileName}`);
      const metadata = {
        contentType: 'image/jpeg', // Set the content type to image/jpeg
      };
  
      await uploadBytes(storageRef, blob, metadata);
      console.log('uploaded');
      const downloadURL = await getDownloadURL(storageRef);
       
        const response = await fetch('/api/add', {
          cache: 'no-store',
          method: 'POST',
          headers: {
            'Content-Type': 'applications/json',
          },
          body: JSON.stringify({teamName, teamMembers, school, quizname, username: session.username, url: downloadURL})
        })
        setUrl('')
          const data = await response.json()
          const ok = data?.message === 'ok'
          if(ok){
            setLoading(false)
            const {quiz} = data;
            const {teams} = quiz;
            setTeams(teams)
            setTeamName('')
            setTeamMembers('')
            setSchool('')
            
          }else{
            setLoading(false)
            setError('Team already exists')
          }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

    const route = (e) => {
      e.preventDefault();
      setQuizload(true)
      router.push(`/dashboard/${quizname}/${id}`)
    }

  return (
    <>
    <Navbar
        themeMode={'light'}
      />
      <TeamForm error={error}  url={url} setUrl={setUrl} school={school} setSchool={setSchool} fileSelected={fileSelected} setFileSelected={setFileSelected} previewImg={previewImg} setPreviewImg={setPreviewImg} quizload={quizload} teamName={teamName} loading={loading} teamMembers={teamMembers} setTeamName={setTeamName} setTeamMembers={setTeamMembers} Add={Add} teams={Teams} route={route} />
    </>
  )
}

export default QuizName