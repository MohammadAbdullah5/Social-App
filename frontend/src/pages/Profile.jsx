import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { update, remove, signout } from '../app/user/userSlice';
import { reset } from '../app/user/userSlice';
import axios from 'axios';

export default function Profile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: ''
  });
  const { user, loading, error, isSuccess } = useSelector((state) => state.user);

  useEffect (() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        password: user.hashed_password
      });
    } 
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(update({params: {userId: user.user._id}, credentials: {t: user.token}, user: formData}));
      if (update.fulfilled.match(resultAction)) {
        console.log('User updated successfully');
      } else {
        console.error(resultAction.payload);
      }
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formDataToSend = new FormData();
    formDataToSend.append('profilePicture', file);
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${user.user._id}/profile-picture`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`,
        },
      });
      dispatch(update({params: {userId: user.user._id}, credentials: {t: user.token}}, { user: response.data }));
    }
    catch (err) {
      console.error('Failed to upload profile picture:', err);
    }
  }
  
  const handleDeleteAccount = async () => {
    const resultAction = await dispatch(remove({params: {userId: user.user._id}, credentials: {t: user.token}}));
    if (remove.fulfilled.match(resultAction)) {
      console.log('User deleted successfully');
    } else {
      console.error(resultAction.payload);
    }
  };
  const handleSignOut = async () => {
    dispatch(signout());
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          value={formData.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          value={formData.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='file'
          id='profilePicture'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleFileChange}
        />
        <button
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteAccount}
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {isSuccess && 'User is updated successfully!'}
      </p>
    </div>
  );
}
