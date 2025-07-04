import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { use } from 'react'
import { acceptFriendRequest, getFriendRequest } from '../lib/api';

const Notification = () => {

  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequest,
  });
  const {mutate:acceptRequestMutation,isPending}= useMutation({
    mutationFn:acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  })

  const incomingRequests = friendRequests?.incomingRequests || [];
  const acceptedRequests = friendRequests?.acceptedRequests || [];
  return (
    <div className='p-4 sm:p-6 md:p-8'>
      <div className='container mx-auto max-w-4xl space-y-8'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>Notifications</h1>
        {isLoading ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg text-primary'/>
          </div>
        ):(
          <>
          {incomingRequests?.length > 0 && (
            <section className='space-y-4'>

            </section>
          )}
          </>
        )}
      </div>
    </div>
  )
}

export default Notification