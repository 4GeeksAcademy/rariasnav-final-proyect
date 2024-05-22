// import React, { useState, useContext } from 'react';
// import { Context } from '../store/appContext';
// import "../../styles/home.css";

// export const ImageUpload = () => {
//     const {actions, store} = useContext(Context)
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [preview, setPreview] = useState(null);

//     const handleFileChange = (event) => {

//       const file = event.target.files[0];
//       setSelectedFile(file);
//       if(file){
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreview(null);
//     }
//     };

//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       if (!selectedFile) {
//         alert('Please select a file first.');
//         return;
//       }

//     const formData = new FormData();
//     formData.append('image', selectedFile);

//     try {
//       const response = await fetch(`${store.baseURL}/upload_image`, {
//         method: 'POST',
//         headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('File uploaded successfully:', data);
//         // Handle success - show a message or update UI
//       } else {
//         console.error('File upload failed:', response.statusText);
//         // Handle error - show a message or update UI
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       // Handle error - show a message or update UI
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         {preview && <img src={preview} alt="Selected" style={{ width: '200px', height: 'auto' }} />}
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// };