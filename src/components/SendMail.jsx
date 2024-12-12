import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRegWindowMinimize  } from "react-icons/fa";
import { MdOpenInFull } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/apiSlice";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SendMail = () => {
  const [formData, setFormData] = useState({
    recipients: "",
    subject: "",
    message: "",
  });
  const { open } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser?.uid;
    await addDoc(collection(db, "emails"), {
      to: formData.recipients,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
      userId
    });
    dispatch(setOpen(false));
    setFormData({
      recipients: "",
      subject: "",
      message: "",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-0 right-12 w-[40rem] max-w-full bg-white rounded-t-lg shadow-2xl border border-gray-300 flex flex-col">
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between rounded-t-lg">
        <h1 className="text-sm font-medium">New Message</h1>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <FaRegWindowMinimize size={16} />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded">
            <MdOpenInFull size={16} />
          </button>
          <button
            onClick={() => dispatch(setOpen(false))}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <RxCross2 size={16} />
          </button>
        </div>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col flex-grow">
        <input
          onChange={changeEventHandler}
          name="recipients"
          value={formData.recipients}
          type="text"
          placeholder="Recipients"
          className="px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          onChange={changeEventHandler}
          name="subject"
          value={formData.subject}
          type="text"
          placeholder="Subject"
          className="px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <textarea
          onChange={changeEventHandler}
          name="message"
          value={formData.message}
          placeholder="Your Message:"
          className="flex-grow px-4 py-2 focus:outline-none resize-none"
          rows="15"
        ></textarea>
        <div className="px-4 py-2 flex items-center justify-between border-t border-gray-300">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => dispatch(setOpen(false))}
            className="text-gray-600 hover:text-gray-800"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;

