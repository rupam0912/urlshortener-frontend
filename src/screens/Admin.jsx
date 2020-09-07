import React, { useState, useEffect, Fragment } from 'react';
import authSvg from '../assets/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';

const Admin = ({ history }) => {

  const [TotalUser, setTotalUser] = useState(0)
  const [TotalUrl, setTotalUrl] = useState(0)


  const fetchMasterData = async() => {

    const id = isAuth()._id
    let url = `${process.env.REACT_APP_API_URL}/user/${id}/master`
    const resp = await axios.get(url)
    setTotalUser( resp.data['Total Users'])
    setTotalUrl( resp.data['Total Urls'])
  }

  useEffect(()=> {
    fetchMasterData()
  }, [])
  

  const style = {
    "text-align": "center"
  }

  return (
   
    <Fragment>
  <ul class="flex justify-between">
  <li class="mr-3">
    <a class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="/">Home</a>
  </li>

  <li class="mr-3">
    <a class="inline-block py-2 px-4 text-gray-400 cursor-not-allowed" href="#">Developer Screen</a>
  </li>
</ul>

<div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="https://cdn.hipwallpaper.com/m/44/40/HJDdh1.jpg" alt="Sunset in the mountains"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2" style={style}>App Data</div>
    <br></br>
    <br></br>
    <p class="text-gray-700 text-base">
      <strong> Total Users: </strong> {TotalUser}
      <br></br>
      <strong> Total saved Shortify Urls: </strong> {TotalUrl}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#React Js</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Guvi Geeks</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#MERN Stack</span>
    <br></br>
    <br></br>
  
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">@Developed By Rupam Sinha #FullStackJourneyContinues</span>
  </div>
</div>
</div>

    </Fragment>
  )
}

export default Admin;