import React ,{useState}from 'react';

function Register({setPage}){
    const [formData,setFormData]=useState({
        name:'',
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
            const response=await fetch ('http://localhost:5000/api/auth/register',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'},
                
                body:JSON.stringify(formData),

            });

            const data=await response.json();
            if (response.ok) {
                alert('registration successfull');
                setPage('login');

            }else{
                alert(data.message);
            }
        }catch(error){
            console.error('Network error:',error);
        }
    };


    return(
        <div>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder='Name' 
                name='name'
                value={formData.name} 
                onChange={handleChange}
                required/>
                <br />

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

                <button type='submit'>Register</button>
            </form>
            <button onClick={()=>setPage('login')}>Already Have an Account,Do we?Login</button>
        </div>
    );
}

export default Register;