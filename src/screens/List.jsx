import React, { useState, useEffect, Fragment } from 'react';
import authSvg from '../assets/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { useId } from "react-id-generator";
var validator = require('validator');


const List = ({history}) => {


      var email = isAuth().email
      var id = isAuth()._id
      const [urls, setUrls] = useState([])

      //fetching all urls based on user
      const getData = async() => {
        let url = `${process.env.REACT_APP_API_URL}/user/${id}/allurl?email=${email}`
        const resp = await axios.get(url)
        //console.log('response', resp)
        setUrls(resp.data)
      }

      useEffect(()=> {
        getData()
      }, [])

      //header rendering
      const renderHeader = () => {
        let headerElement = ['id', 'Name', 'Shortify URL', 'Action']

        return headerElement.map((elem,index)=> {
          return <th class="w-1/2 px-4 py-2" key={index}>{elem}</th>
        })
      }

      //rendering the table body
      const renderBody = () => {
        return urls && urls.map(({id,name,short_link},index) => {
          return (
            <tr key={id}>
                <td  class="border px-4 py-2">{index+1}</td>
                <td  class="border px-4 py-2">{name}</td>
                <td  class="border px-4 py-2"><a href={short_link} target="#"><u>{short_link}</u></a></td>
                <td  class="border px-4 py-2"><button 
                    class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" 
                    type="button"
                    onClick={()=> removeData(id)}>Delete
                    </button>
                </td>

            </tr>
          )
        })
      }

      //deleting data
      const removeData = (id2) => {
          let url =  `${process.env.REACT_APP_API_URL}/user/${id}/url?id1=${id2}`

          axios.delete(url).then(res => {
            const del = urls.filter(url => id2 !== url.id)
            toast.success(res.data.message)
            setUrls(del)
            // console.log('deletion',res)
          }).catch((err)=> {
            toast.error('Something gone wrong')
          })
      }

      const style = {
        "margin-left": "10px"
      }

    return(
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
      <a href="/private" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Generate
      </a>
    </div>
    <div>
    <a href="/Private/Profile" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" 
    style={style}>
        Profile
    </a>
      <a href="https://rupam0912.github.io" target='#' class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      style={style}>
        Visit Me
      </a>
    </div>
  </div>
</nav>

{/* <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'> */}
  <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <h1 id='title'><u>List of Generated URLS</u> </h1>
    <br></br>
  <table class = "table-fixed">
  <thead>
    <tr>{renderHeader()}</tr>
  </thead>
  <tbody>
      {renderBody()}
  </tbody>
</table>
  </div>
{/* </div> */}

</Fragment>
    )
}

export default List