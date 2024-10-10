import { useState } from 'react';
import axios from 'axios';

export default function ContactsPage () {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:7000/api/v1/users/contact', {
              email,
              subject,
              message,
            });
      
            console.log(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        };



    return (
        <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <form onSubmit={handleSubmit} className="space-y-8">
          <div className='border-2'>            
              <input type="email"  className='w-[45.5rem]'  placeholder="name@flowbite.com" required value={email}  onChange={(event) => setEmail(event.target.value)}></input>
          </div>
          <div className='border-2'>           
              <input type="text" className='w-[45.5rem]' placeholder="Let us know how we can help you" required value={subject}  onChange={(event) => setSubject(event.target.value)}></input>
          </div>
          <div className='border-2'>            
              <textarea className='w-[45.5rem]' placeholder="Leave a comment..." required  value={message}  onChange={(event) => setMessage(event.target.value)}></textarea>
          </div>
          <button type="submit" className='border-2 '>Send message</button>
      </form>
  </div>
</section>
    )
}