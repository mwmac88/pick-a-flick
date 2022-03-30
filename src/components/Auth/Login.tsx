import React  from 'react';
import { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {
  path: string;
}

export interface FlickList {
  title: string;
  movies: Array<Movie>;
}

export interface Movie {
  movieId: number;
  moviePoster: string;
  movieTitle: string;
}

const Login: React.FC<Props> = () => {
  const handleSubmit = (e: React.FormEvent) => e.preventDefault();
  const handleInputChange = () => null;

  const user = {
    email: '',
    password: '',
    login: () => null
  }

  return (
    <div className='flex h-full w-1/2 m-auto'>
      <form className='w-full p-8' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='email'
            name='email'
            onChange={handleInputChange}
            value={user.email}
            placeholder='Email address'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            type='password'
            name='password'
            value={user.password}
            placeholder='****'
            required
            onChange={handleInputChange}
          />
          <p className='text-red-500 text-xs italic'>
            Please choose a password.
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            onClick={user.login}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
