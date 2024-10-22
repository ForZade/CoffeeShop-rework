import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactsForm () {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false)

    async function getEmail() {
        try {
          const response = await axios.get('http://localhost:7000/api/v1/auth/status', {
            withCredentials: true})

            if(response.data.authorized){
              setEmail(response.data.data.email);
              setDisabled(true);
              console.log(response.data.data.email);
            }
        } catch (error) {
          console.error('Error:', error);
        }
    }

    useEffect(() => {
        getEmail()
      }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:7000/api/v1/users/contact', {
              email,
              subject,
              message,
            }, { withCredentials: true });
            
            setEmail('');
            setSubject('');
            setMessage('');
            alert("Message successful");
            getEmail();

          } catch (error) {
            console.error('Error:', error);
          }
        };



    return (
        <section>
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <form onSubmit={handleSubmit} className="space-y-8">
          <div className='border-2'>            
              <input type="email" disabled={disabled}   className='w-[45.5rem] min-w-2/3'  placeholder="name@flowbite.com" required value={email}  onChange={(event) => setEmail(event.target.value)}></input>
          </div>
          <div className='border-2'>           
              <input type="text" className='w-[45.5rem] min-w-2/3' placeholder="Let us know how we can help you" required value={subject}  onChange={(event) => setSubject(event.target.value)}></input>
          </div>
          <div className='border-2'>            
              <textarea className='w-[45.5rem] min-w-2/3' placeholder="Leave a comment..." required  value={message}  onChange={(event) => setMessage(event.target.value)}></textarea>
          </div>
          <button type="submit" className='border-2 '>Send message</button>
      </form>
  </div>
</section>
    )
}