import React, { useState } from 'react'


const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");


  return (
    <div className='flex flex-col items-center mx-3'>
      <h1 className='text-2xl md:text-4xl'>Get in touch</h1>
      <div className='flex flex-col gap-4 w-full md:w-[60%]'>
        <label>
          Message Subject:
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className='border-2 border-black rounded-md p-2.5'
        />

        <label>Your message</label>
        <textarea rows="5" value={message}
          onChange={(e) => setMessage(e.target.value)} class="p-2.5 border-2 border-black text-gray-900 bg-gray-50 resize-none rounded-md" placeholder="Write your message here..."></textarea>
        <a href={`mailto:iamhenryokeke@gmail.com?subject=${subject}&body=${message}`}>
          <button className='px-4 py-1 bg-slate-400 border rounded-md'>Click to Send an Email</button>
        </a>
      </div>
    </div>
  )
}

export default Contact
