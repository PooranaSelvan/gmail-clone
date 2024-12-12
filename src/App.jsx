import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/HomePage';
import Inbox from './pages/Inbox';
import Mail from './pages/Mail';
import LoginPage from './pages/LoginPage';
import SendMail from './components/SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase';
import { setAuthUser } from './redux/apiSlice';
import Navbar from "./components/Navbar"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    children: [
      { path: '/', element: <Inbox /> },
      { path: '/mail/:id', element: <Mail /> },
    ],
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.app);
  // console.log(authUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuthUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }));
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [dispatch]);

  return (
    <div className="bg-[#F6F8FC] h-screen w-screen overflow-hidden">
      {!authUser ? (
        <LoginPage />
      ) : (
        <>
          <Navbar />
          <RouterProvider router={router} />
          
          <div className="absolute w-[30%] bottom-0 right-20 z-10">
            <SendMail />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
