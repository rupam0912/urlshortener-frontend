import React, { useState, useEffect, Fragment } from 'react';
import authSvg from '../assets/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { useId } from "react-id-generator";
var validator = require('validator');


const Private = ({ history }) => {

  const [original,setOriginal] = useState('')
  const [short, setShort] = useState('')

  const onOriginalChange = e => {
    setOriginal(e.target.value)
   
  }
  
  let id = Math.random().toString(36).substring(7)

  // hitting the api & fetching short url details
  const showShortUrl = (id) => {
    if(original.length == 0 || !validator.isURL(original)){
      toast.error('please enter a valid url')
      return
    }
    const email = isAuth().email
    const user_id = isAuth()._id
    console.log(user_id)
    
    axios
    .get(`${process.env.REACT_APP_API_URL}/user/${user_id}/url?email=${email}&url_id=${id}&url=${original}`)
    .then( res => {
      setShort(res.data['short_link'])
      console.log(res.data)
      toast.success('short url created!')
    })
    .catch( err => console.log(err))

  }

  //clearing all input fields
  const deleteShort = () => {
    setShort('')
    setOriginal('')
  }

  // clipboard copy
  const clipCopy = () =>{
    var copyText = document.getElementById("testShort")
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  toast.success('Copied')

  }

  //sending the form data to api

  const onFormSubmit = e => {

    e.preventDefault();

    const name = prompt("Enter a name for your URL")
    if(name != null) {
    const id1 = isAuth()._id;
    const mail1 = isAuth().email;


    axios.post(`${process.env.REACT_APP_API_URL}/user/${id1}/url`, {
        "user": mail1,
        "url_id": id,
         "name":name,
         "original_link": original,
         "short_link": short
    }).then((res)=> {
      toast.success('URL Saved')
      console.log(res)
    })
      .catch((err)=> {
        toast.error('Something gone wrong')
        console.log(err)
      })
  } else {
    toast.error("Please Enter a name");
  }
  }
 
  //console.log(short)

  const style = {
    "margin-left": "10px"
  }

  return (
    <Fragment>
    <ToastContainer />
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-xl tracking-tight">Shortly</span>
  </div>
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </a>
      <a href="/Private/List" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        URL List
      </a>
    </div>
    <div>
      <a href="/Private/Profile" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" style={style}>
        Profile
      </a>
      <a href="https://rupam0912.github.io" target='#' class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" style={style}>
        Visit Me
      </a>
      
    </div>
  </div>
</nav>
<div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Short your URL
            </h1>
            <br></br>
            <br></br>
  <form class="w-full max-w-sm" onSubmit={onFormSubmit}>
  <div class="flex items-center border-b border-teal-500 py-2">
    <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
    type="text" 
    placeholder="paste your url" 
    aria-label="Full name"
    onChange={onOriginalChange}
    value={original} 
    />
      
    {/* <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      Sign Up
    </button> */}

  <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" 
    type="button"
    onClick={() => deleteShort()}>
      Clear
    </button>
    <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" 
    type="button"
    onClick={() => showShortUrl(id)}>
      Generate
    </button>
    
    </div>
    <div class="flex items-center border-b border-teal-500 py-2">
      <br></br>
      <br></br>

    <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
    type="text" 
    placeholder="output" 
    aria-label="Full name" 
    id = "testShort"
    value={short}/>

      <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
      type= 'button'
      id="close-image"
      onClick={()=>clipCopy()}
      >
      <img src="https://img.icons8.com/material-sharp/24/000000/copy.png"/>
      </button>

     <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
     type="submit">
      Save
    </button>
      
      
   </div>
 
</form>
           
          </div>
        </div>
       
      </div>
    </div>

    </Fragment>
  );
};
export default Private