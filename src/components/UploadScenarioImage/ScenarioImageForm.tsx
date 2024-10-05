import React, { useState } from 'react';

const ScenarioImageForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const uploadImage = async () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        // サーバーからSigned URLを取得
        const response = await fetch('/generateSignedUrl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName: file.name }),
        });
        const { url } = await response.json();

        // 画像をアップロード
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        alert('Image uploaded successfully!');
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage}>Upload</button>
        </div>
    );
};

export default ScenarioImageForm;
