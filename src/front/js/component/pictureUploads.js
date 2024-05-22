import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const PictureUploads = () =>{
    const {actions, store} = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch(`${store.baseURL}/upload_image`,{
                method: 'POST',
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
                body: formData,
            })

            if(response.ok){
                const data = await response.json();
                alert('File uploaded successfully:', data)
            } else {
                alert('Error uploading file')
            }
            
        } catch (error) {
            alert('Error uploading file')
        }
    }

    return(
        <div className="picture-upload-container mt-4">
            <form onSubmit={handleSubmit} className="picture-upload-form">
                <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-3" />
                    {preview && (
                        <div className="preview-container">
                            <img src={preview} alt="Selected" className="preview-image" />
                        </div>
                    )}
                <button type="submit" className="btn btn-primary my-3">Upload</button>
            </form>
        </div>
    )
}