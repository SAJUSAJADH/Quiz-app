import React from 'react';



const Card = ({key, index, team}) => {

    const colors = ['bg-teal-500', 'bg-purple', 'bg-orange-500', 'bg-red', 'bg-gray-400', 'bg-amber-400', 'bg-yellow-400', 'bg-emerald-500', 'bg-lime-400', 'bg-rose-300'] 

  return (
    <div className={`flex-shrink-0 m-6 relative overflow-hidden ${colors[index]} rounded-lg max-w-xs shadow-lg`}>
      <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
      </svg>
      <div className="relative pt-5 px-10 flex items-center justify-center">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: 'radial-gradient(black, transparent 60%)',
            transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
            opacity: 0.2,
          }}
        />
        
      </div>
      <div className="relative text-white px-6 pb-5 ">
        <div className="flex flex-col justify-center items-center">
        <span className="block font-bold text-xl mb-1">{team?.name}</span>
          <span className="block opacity-75 font-normal text-base">Members: {team?.members}</span>
          <span className="block font-semibold text-xl mt-3">SCORE: {team?.score}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;