import React from 'react'
import EditIcon from '@material-ui/icons/Edit';

const LoggedIn = () => {
  // TODO: useUser(), useSignout()
  const signOut = () => null;
  const handleSubmit = (e: React.FormEvent) => e.preventDefault();
  const handleInputChange = () => null;

  const user = {
    displayName: '',
    updateUsername: () => null
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center'>
        <h2 className='text-center mr-4'>
          Welcome back{' '}
          {user.displayName ? user.displayName : 'Movie Lover'}!
        </h2>
        <button
          className='flex-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
      <form className='mb-8' onSubmit={handleSubmit}>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Username
        </label>
        {user.displayName ? (
          <div className='flex flex-row justify-center items-center'>
            <span className='mr-2'>{user.displayName}</span>
            <EditIcon className='cursor-pointer' />
          </div>
        ) : (
          <div>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 mb-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              name='displayName'
              placeholder='Username'
              value={user.displayName}
              onChange={handleInputChange}
            />
            <button
              onClick={user.updateUsername}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Update
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default LoggedIn