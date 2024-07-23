'use client'

import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const TeamList = ({teams}) => {
    return (
      <div>
        <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teams.map((team, index) => (
          <div
            key={index}
            class="max-w-sm overflow-hidden rounded-lg border border-blue-800 bg-slate-200 p-6 shadow dark:border-teal-400 dark:bg-slate-400"
          >
            <img
              alt="team"
              src="data:image/jpeg;base64,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"
              className="mx-auto rounded-full h-10 w-auto bg-clip-padding bg-transparent dark:rounded-full"
            />

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              {team.name}
            </h5>

            <ul className="mb-0 list-none flex flex-col items-center justify-center">
              
                <li  className="text-gray-600 dark:text-white list-disc">
                {team.members}
                </li>
              
            </ul>
          </div>
        ))}
      </div>
    </div>
      </div>
    );
  };

const TeamForm = ({error, quizload, teamName,loading, teamMembers, setTeamName, setTeamMembers, Add, teams, route }) => {

const router = useRouter()
 

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <img
          alt="Your Company"
          src="data:image/jpeg;base64,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"
          className="mx-auto h-10 w-auto bg-clip-padding bg-transparent dark:rounded-full"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Add Team
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  method="POST" className="space-y-6" >
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Team Name
            </label>
            <div className="mt-2">
              <input
                name="Team Name"
                value={teamName}
                onChange={(e)=>setTeamName(e.target.value)}
                type="text"
                required
                className="block bg-white px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Team Members(coma separated)
              </label>

            </div>
            <div className="mt-2">
              <input
                name="Team Members"
                value={teamMembers}
                onChange={(e)=>setTeamMembers(e.target.value)}
                type="text"
                required
                className="block bg-white px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={Add}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              
            >
              Add Team
            </button>
          </div>

          <div>
            <button
            onClick={route}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {quizload ? <LoadingOutlined/> : 'Start Quiz'}
            </button>
          </div>
        </form>


      </div>
    </div>
    <TeamList teams={teams} />
    </>
  );
};



export default TeamForm;