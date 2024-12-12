import React, { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth'; // Use signInWithPopup for simplicity
import { auth, provider } from '../firebase'; // Make sure to import auth and provider from firebase.js
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/apiSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      // Use popup for authentication instead of redirect
      const result = await signInWithPopup(auth, provider);
      console.log('Signed in with popup:', result);

      if (result.user) {
        // Dispatch the user information to Redux store
        dispatch(setAuthUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }));
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  useEffect(() => {
    // We no longer need to call getRedirectResult when using signInWithPopup
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
      <div className="p-8 bg-white flex flex-col gap-3 rounded-md">
        <h1 className="text-center text-xl font-medium mb-5">LOGIN</h1>
        <GoogleButton onClick={signInWithGoogle} />
      </div>
    </div>
  );
};

export default LoginPage;
