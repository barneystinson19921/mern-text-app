import React ,{useState}from 'react';

function Login({setPage,setToken}){
    const [formData,setFormData]=useState({
       
        email:'',
        password:''
    });
    
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch ('http://localhost:5000/api/auth/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'},
                
                body:JSON.stringify(formData),

            });

            const data=await response.json();
            if (response.ok) {
                localStorage.setItem('token',data.token);
                setToken(data.token);
                alert('Logged in successfully!');
                setPage('home');
            

            }else{
                alert(data.message);
            }
        }catch(error){
            console.error('Network error:',error);
        }
    };


    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              
                <input type="email" 
                placeholder='Email' 
                name='email'
                value={formData.email}
                onChange={handleChange}
                required />
                <br />

                <input type="password"
                 placeholder='Password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required/>
                  <br />

                <button type='submit'>Login</button>
            </form>
            <button onClick={()=>setPage('register')}>Aint owning an account mate? Register</button>
        </div>
    );
}

export default Login;