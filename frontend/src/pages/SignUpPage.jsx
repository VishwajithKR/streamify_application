import React from 'react'
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Signup from '../assets/signup.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api';
import useSignup from '../hooks/useSignup';

const SignUpPage = () => {

  const [signUpData, setSignUpData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signUpMutation } = useSignup();

  const handleSignUp =  (e) => {
    e.preventDefault();
    signUpMutation(signUpData);
  }
  return (
    <div className='h-screen w-full select-none flex justify-center items-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          <div className='mb-4 flex  items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamify</span>
          </div>
          {error && <div className='alert alert-error mb-4'>
            <span>{error?.response?.data?.message}</span>
          </div>}
          <div className='w-full'>
            <form onSubmit={handleSignUp}>
              <div className='space-y-4'>
                <div className='text-xl font-semibold'>
                  <h2>Create an Account</h2>
                  <p className='text-sm opacity-70'>Join Streamify and start your langauge learning advanture!</p>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='form-control w-full'>
                  <label className='label'>
                       <span className='label-text'>Full Name</span>
                  </label>
                  <input value={signUpData.fullName} onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})} required
                   type="text" placeholder='Full Name' className='input input-bordered' />
                </div>
                 <div className='form-control w-full'>
                  <label className='label'>
                       <span className='label-text'>Email</span>
                  </label>
                  <input value={signUpData.email} onChange={(e) => setSignUpData({...signUpData, email: e.target.value})} required
                   type="email" placeholder='email' className='input input-bordered' />
                </div>
                 <div className='form-control w-full'>
                  <label className='label'>
                       <span className='label-text'>Password</span>
                  </label>
                  <input value={signUpData.password} onChange={(e) => setSignUpData({...signUpData, password: e.target.value})} required
                   type="password" placeholder='************' className='input input-bordered' />
                   <p className='text-sm opacity-70 mt-1'>Password must be at least 6 characters</p>
                </div>
                 <div className='form-control w-full'>
                  <label className='label cursor-pointer justify-start gap-2'>
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className='text-xs leading-tight'>I agree to the </span> 
                      <span className='text-primary hover:underline'>terms of service</span>and {" "}
                      <span className='text-primary hover:underline'>privacy policy</span>
                 </label>
                </div>
              </div>
              <button className='btn btn-primary w-full mt-4' type='submit'> {isPending ? <> <span className='loading loading-spinner loading-xs'/> Loading...</> : "Create Account"}</button>
              <div className='text-center mt-4'>
                <p className='text-sm'>
                  Already have an account? <Link to="/login" className='text-primary hover:underline'>Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={Signup} alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage