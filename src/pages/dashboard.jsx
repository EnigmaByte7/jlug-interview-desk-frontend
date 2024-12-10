import { useState, useEffect } from 'react';
import logo from '../assets/logo.png'
import approve from '../assets/Approval.png';
import people from '../assets/People.png';
import book from '../assets/Bookmark.png';
import time from '../assets/Time.png';
import star from '../assets/Star.png';
import { Link } from 'react-router-dom';
import avatar1 from '../assets/3d_avatar_1.png';
import Ripple from '../components/Ripple';
import { useAdminContext } from '../contexts/Admin';

function Dashboard() {
  
 const {    stats,
  leaderboard,
  pendingApplicants,
  load,
  fetchDashboardData,
  fetchLeaderboardData,
  fetchPendingApplicants} = useAdminContext();
  const image = [people, approve, time, book];

  console.log(pendingApplicants)

  return (
    <>
    {load ? 
    ( <Ripple />) : 
    ( <div className="bg-zinc-100 pb-10 w-100 h-full">
        <h1 className="font-semibold p-10 text-4xl">Dashboard</h1>
        <div className="flex justify-between ml-14 mb-14 mr-14 pl-8 pr-8">
          {[
            { count: stats.totalApplicants, text: 'Total Applicants' },
            { count: stats.applicationsReviewed, text: 'Applications Reviewed' },
            { count: stats.pendingApplications, text: 'Pending Applications' },
            { count: stats.applicationsBookmarked, text: 'Applications Bookmarked' },
          ].map((pop, i) => (
            <div
              key={i}
              className="w-64 h-32 flex justify-center items-center rounded-lg bg-white shadow-md shadow-zinc-400"
            >
              <div className="flex items-center">
                <img className="w-16 h-16" src={image[i]} alt="" />
              </div>
              <div className="flex-col w-32 text-center items-center justify-center">
                <h1 className="text-2xl">{pop.count}</h1>
                <h3 className="text-zinc-500">{pop.text}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-full flex gap-3">
          
        <div className="w-3/5 h-auto ml-12 p-10 bg-white shadow-md shadow-zinc-400 rounded-lg">
          <h1 className="w-full border-b-2 pb-2 border-black font-semibold text-xl">Leader Board</h1>
          {leaderboard.slice(0,3).map((student, i) => (
            <div
              key={i}
              className="mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center"
            >
              <div className="flex items-center gap-6">
                <img
                  className="w-16 h-16  rounded-full"
                  src={student.dp} 
                  alt=""
                />
                <h1>{student.name}</h1>
              </div>
              <div className="flex gap-3 items-center">
                <img className="w-7 h-7" src={star} alt="" />
                <h1>{student.net}</h1>
              </div>
            </div>
          ))}
          <Link to={`/leader`}>
            <div className="font-semibold border-2 w-[50%] text-center h-[10%] border-[#23B0FF] text-[#23B0FF] px-4  rounded-lg m-auto mt-3">
              View Leaderboard
            </div>
          </Link>
        </div>


        <div className="w-2/5 h-auto mr-10 p-10 bg-white shadow-md shadow-zinc-400 rounded-lg">
          <h1 className="border-b-2 pb-2 border-black font-semibold text-xl">Pending Applicants</h1>
          {pendingApplicants.length === 0 && <div className='text-lg text-center p-3 text-blue-500'>No Pending Applicants</div> }
          {pendingApplicants.length > 0 && pendingApplicants.slice(0,3).map((applicant, i) => (
            <div
              key={i}
              className="mt-5 flex justify-between hover:bg-purple-100 p-5 rounded-lg items-center"
            >
              <div className="flex items-center gap-6">
                <img
                  className="w-16 h-16  rounded-full"
                  src={applicant.dp} 
                  alt=""
                />
                <h1>{applicant.name}</h1>
              </div>
            </div>
          ))}
          {pendingApplicants.length != 0 && <Link to={`/review`}>
            <div className="font-semibold border-2 mt-2 text-center  w-[50%]  h-[10%] border-[#23B0FF] text-[#23B0FF] px-4 py-2 rounded-lg m-auto">
              View Pending Applicants
            </div>
          </Link>}
        </div>
      </div>

      </div>)}
    </>
  );
}

export default Dashboard;
