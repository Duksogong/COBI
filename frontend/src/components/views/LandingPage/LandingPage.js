import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {

  useEffect(() => {
    // client는 3000에서 보내는데 server는 5000이기 때문
    axios.get('/api/axios')
    .then(response => {console.log(response.data)})
  }, [])
  
  
  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
      }}>
      <h2>시작 페이지</h2>
    </div>
  )
}

export default LandingPage