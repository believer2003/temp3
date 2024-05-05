import { useState } from 'react';
import './App.css';


export default function App(){

  const [url,setUrl]=useState('');

  async function handleSubmit(e){
    e.preventDefault();
    const target = document.getElementById('url');
    const formData={
      'url':target.value
    }
    await fetch("https://pcproject2.onrender.com/shorten", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setUrl(data.shorten);
      })
      .catch(error => {
        console.error('There was a problem with the server request:', error);
      });
  }

  return (
    <div className="main">
      <div className='navbar'>
        <ul>
          <li><button>Home</button></li>
          <li><button>Contact Us</button></li>
          <li><button>About Us</button></li>
        </ul>
      </div>
      <div className='content'>
        <h1>Welcome To URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input id='url' placeholder='Enter URL...'></input><br/>
          <button type='submit'>SUBMIT</button><br/>
          {url && <label>Here's Your Shorten Url : <a href={url}>{url}</a></label>}
        </form>
      </div>
    </div>
  );
}