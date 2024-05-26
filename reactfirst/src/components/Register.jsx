// import React, { useState } from 'react';
// import axios from 'axios';

// const Registration = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validate form data (you can add more validation as needed)
//         if (formData.password !== formData.confirmPassword) {
//             setMessage('Passwords do not match');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:5118/api/Item/register', {
//                 username: formData.username,
//                 email: formData.email,
//                 password: formData.password,
//             });

//             if (response.status === 200) {
//                 setMessage('Registration successful!');
//                 // Clear the form
//                 setFormData({
//                     username: '',
//                     email: '',
//                     password: '',
//                     confirmPassword: '',
//                 });
//             }
//         } catch (error) {
//             setMessage('Error during registration');
//             console.error('Error registering user:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Confirm Password:
//                     <input
//                         type="password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Register</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default Registration;
