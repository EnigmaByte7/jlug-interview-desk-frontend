import approve from '../../assets/Approval.png'
import list from '../../assets/List.png'
import book from '../../assets/Bookmark.png'
import time from '../../assets/Time.png'
import {Link} from 'react-router-dom'
import Page from '../../assets/Page.png'; 
import Application from '../../assets/Application.png';
import Eye from '../../assets/Eye.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ripple from '../../components/Ripple';


function Dashboard() {
  const navigate = useNavigate();
  const image=[list,approve,time,book]


  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [pageload, setPageLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      
      const storedUser = localStorage.getItem('user');
      const userObj = JSON.parse(storedUser)
      setUser(userObj)
      const domainTasks = await fetchDomainTasks();
      console.log(domainTasks)
      setTasks(domainTasks);

      const submissions = userObj.submissions
      setUserSubmissions(submissions);
    };

    fetchData();
  }, []);


  const fetchDomainTasks = async () => {
    setPageLoad(true)
    const storedUser = localStorage.getItem('user');
    const userObj = JSON.parse(storedUser)
    const domain  = userObj.domain
    console.log(domain)

    try {
      const response = await fetch('http://127.0.0.1:5001/fir-api-5316a/us-central1/app/get-tasks-by-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });
  
      if (!response.ok) {
        throw new Error('Error fetching tasks');
      }
  
      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }finally{
      setPageLoad(false)
    }
  };

  
  const totalTasks = tasks.length;
  const submittedTasks = userSubmissions.length;
  const pendingTasks = totalTasks - submittedTasks;

  const pop=[{'count':totalTasks, 'text':'Total Tasks'},{'count':submittedTasks , 'text':'Tasks Submitted'},{'count':pendingTasks, 'text':'Pending Tasks'},{'count':100, 'text':'ISpe kya likhe ?'}]


  console.log({"tasks" : tasks, "usersubmisssion" : userSubmissions, "user" : user})

  return (
    <>
    {pageload && <Ripple/>}
      { !pageload && 
      (<div className=' bg-zinc-100 pb-10 w-100 h-full'>
        <h1 className='font-semibold p-10 text-4xl'>Dashboard</h1>
        <div className='flex justify-between ml-14 mb-14 mr-14 pl-8 pr-8'>

         {pop.map((pop,i)=>(<div key={i} className='w-64 h-32 flex justify-center items-center rounded-lg  bg-white shadow-md shadow-zinc-400'>
          <div className='flex items-center'> <img className='w-16 h-16' src={image[i]} alt="" /></div>
          <div className='flex-col w-32 text-center items-center justify-center'>
            <h1 className='text-2xl'>{pop.count}</h1>
            <h3 className='text-zinc-500'>{pop.text}</h3>
          </div></div> ))}
        </div>
        
        <div className='w-full h-full flex gap-3'>
          <div className='w-3/5 h-[65vh] ml-12  p-10 flex flex-col justify-between  bg-white shadow-md shadow-zinc-400  rounded-lg'>
            <div>
            <h1 className='w-full border-b-2 pb-2 border-black font-semibold text-xl'>All Tasks</h1>
            {tasks.slice(0,3).map((task, i) => (
                    <div key={task.tname} className="flex justify-between items-center mt-3 gap-x-6 py-2 w-full min-h-[10px]">
                        <div className="flex w-full gap-x-4 items-center">
                            <img
                                src={task.tcatg === 'App' || task.tcatg === 'Web' ? Application : Page}
                                alt={`Avatar of ${task.name}`}
                                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            />
                            <div className="w-[25%] flex flex-auto items-center">
                                <p className="text-4 font-medium leading-6 text-center text-gray-900">{task.tname}</p>
                            </div>
                            <div className="min-w-[15%] flex flex-auto items-center">
                                <p className="text-4 font-bold leading-6 text-center text-gray-900">{task.tcatg}</p>
                            </div> 
                            <div className='flex flex-row w-[45%] items-center  text-center justify-end gap-12'>       
                                <div className='font-semibold border-2 text-center h-[50%] border-[#01ED01] text-[#01ED01] px-4  rounded-lg '>
                                    {task.tstat}
                                </div>                          
                                <Link to='/add'>
                                    <div className='font-semibold border-2 text-center h-[50%] border-[#23B0FF] text-[#23B0FF] px-4  rounded-lg '>
                                        View
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
                </div>
                <Link to='/userd/tasks'>
                <div className='flex flex-row gap-5 font-semibold border-2 text-center w-fit items-center ml-auto mr-auto  justify-end border-primary text-primary px-4  rounded-lg '>
                    <img src={Eye} className='w-7 h-7' alt='i'></img>
                    <div>View All Tasks</div>
                </div>
                </Link>
          </div>
         
          <div className='w-2/5 h-auto mr-10 p-10  bg-white shadow-md shadow-zinc-400  rounded-lg'>

            <h1 className=' border-b-2 pb-2 border-black font-semibold text-xl'>Application Status</h1>
            
            <div className='flex flex-row gap-5 font-semibold border-2 text-center w-[90%] p-1 mt-4 m-auto items-center justify-center border-[#FF8C23] text-[#FF8C23] rounded-lg '>
                    <div>
                      {
                        user['approvedby'] && user['approvedby'].length > 0 ? 'In Review' : 'In Queue'
                      }
                    </div>
            </div>
          </div>
              
          
        </div>
        
      </div> )}
    </>
  )
}

export default Dashboard
