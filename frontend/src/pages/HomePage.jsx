import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';
import { Link } from 'react-router-dom';
import { UserIcon } from 'lucide-react';

const HomePage = () => {
  const queryClient = useQueryClient();

  const [outGoingRequestIds, setOutGoingRequestIds] = useState(new Set());

  const {data:friends=[],isLoading:loadingFriends}= useQuery({
    queryKey: ["friends"],
    queryFn:getUserFriends,
  })
   const {data:recommendedUsers=[],isLoading:loadingUsers}= useQuery({
    queryKey: ["friends"],
    queryFn:getRecommendedUsers,
  })
   const {data:outgoingFriendRequests}= useQuery({
    queryKey: ["outgoingFriendRequests"],
    queryFn:getOutgoingFriendReqs,
  })

  const {mutate:sendRequestMutation,isPending,isLoading}= useMutation({
    mutationFn:sendFriendRequest,
     onSuccess:()=>queryClient.invalidateQueries({queryKey:["outgoingFriendRequests"]})
  })

  useEffect(()=>{
    const outgoingIds= new Set();
    if(outgoingFriendRequests && outgoingFriendRequests.length>0){
      outgoingFriendRequests.forEach((request)=>{
        outgoingIds.add(request.id)
      })
      setOutGoingRequestIds(outgoingIds)
    }
  },[outgoingFriendRequests])
  return (
    <div className='p-4 sm:p-6 md:p-8'>
        <div className='container mx-auto space-y-10'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
            <Link to='/notifications' className='btn btn-outline btn-sm'>
              <UserIcon className='mr-2 size-4'/>
              Friend Requests
            </Link>
          </div>
          {loadingFriends ? (
            <div className='flex justify-center items-center py-12'>
              <span className='loading loading-spinner loading-lg text-primary'/>
            </div>
          ):friends.length === 0 ?(
            <p>You have no friends yet</p>
          ):(
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

            </div>
          )}
         
        </div>
    </div>
  )
} 

export default HomePage