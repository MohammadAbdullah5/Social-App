import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, getPfPic } from '../app/user/userSlice';
import { useEffect } from 'react';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = user?.user?._id;
    if (userId) {
      dispatch(fetchUser({ userId: user.user._id}));
      dispatch(getPfPic({ pic: user.user.profilePicture }));
    }
  }, [dispatch, user?.user?._id, user?.user?.profilePicture]);

  const profilePic = user?.user?.profilePicture;

  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Social App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          {user && (
          <Link to='/feed'>
            <li>Posts</li>
          </Link>)}
          <Link to='/about'>
            <li>About</li>
          </Link>
          {user && (
            <Link to="/create">
              <li>Create Post</li>
            </Link>
          )}
          <Link to='/profile'>
            {user ? (
              <img src={profilePic} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header