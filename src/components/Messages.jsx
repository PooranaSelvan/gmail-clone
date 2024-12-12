import React, { useEffect, useState } from 'react';
import Message from './Message';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure you have Firebase Auth initialized
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../redux/apiSlice';

const Messages = () => {
  const { searchText, emails } = useSelector(store => store.app); // Access emails from Redux
  const [filterEmail, setFilterEmail] = useState([]); // Initialize as an empty array
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = auth.currentUser?.uid; // Get the current user's ID
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const q = query(
      collection(db, "emails"),
      where("userId", "==", userId), // Filter by userId
      orderBy("createdAt", "desc")  // Order by createdAt
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log("Filtered Emails (onSnapshot):", allEmails);
      dispatch(setEmails(allEmails));
    });

    return () => unsubscribe(); // Cleanup Firestore listener
  }, [dispatch]);

  useEffect(() => {
    if (emails) {
      const search = searchText.toLowerCase();
      const filteredEmail = emails.filter((email) => {
        return (
          email.subject?.toLowerCase().includes(search) ||
          email.to?.toLowerCase().includes(search) ||
          email.message?.toLowerCase().includes(search)
        );
      });
      setFilterEmail(filteredEmail);
    }
  }, [searchText, emails]);

  return (
    <div>
      {filterEmail?.length > 0 ? (
        filterEmail.map((email) => <Message key={email.id} email={email} />)
      ) : (
        <p>No emails found</p>
      )}
    </div>
  );
};

export default Messages;
