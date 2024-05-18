/* eslint-disable react/prop-types */
import { useState } from 'react';
import uploadImg from "/images/upload.png";

const DropFile = ({ refe,handleChange }) => {
    const [selectedName, setSelectedName] = useState('');

    const handleFile = (event) => {
        const file = event.target?.files[0];
        setSelectedName(file.name);
        handleChange(event)
    };

    return (
        <div className="parent">
            <div className="file-upload">
            <img src={uploadImg} alt="upload" />
            <h6>{selectedName || 'Click box to upload'}</h6>
            <p>Maximun file size 10mb</p>
            <input id={refe} type="file" onChange={handleFile} />
            </div>
        </div>
    );
}

export default DropFile;
