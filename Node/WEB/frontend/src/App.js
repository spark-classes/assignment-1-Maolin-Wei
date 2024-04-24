import React, { useState } from 'react';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
// import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

function resizeImage(base64Str, width, height) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg'));
    };
  });
}

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  // Test for display the images
  const handleUpload = async () => {
    const imageArray = [];
    for (const file of selectedFiles) {
      const reader = new FileReader();
      reader.onload = async () => {
        const resizedImage = await resizeImage(reader.result, 512, 512);
        imageArray.push({
          src: resizedImage,
          alt: file.name,
          description: 'Uploaded Image',
        });
        setImages(imageArray);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleUpload = async () => {
  //   if (selectedFiles.length === 0) {
  //       alert('Please select a file first!');
  //       return;
  //   }

  //   const formData = new FormData();
  //   // Assuming single file upload, adjust accordingly if multiple uploads are supported
  //   formData.append('filename', selectedFiles[0]);

  //   try {
  //       const response = await axios.post('http://localhost:3000/api/upload', formData, {
  //           headers: {
  //               'Content-Type': 'multipart/form-data',
  //           },
  //       });
  //       console.log('File uploaded successfully:', response.data);
  //       alert('File uploaded successfully!');
  //   } catch (error) {
  //       console.error('Error uploading file:', error);
  //       alert('Error uploading file.');
  //   }
  // };


  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Maolin's Photo App
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileSelect} />
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
        <Button variant="contained" color="primary" onClick={handleUpload} sx={{ ml: 2 }}>
          Upload
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 1 }}>
              <img src={image.src} alt={image.alt} style={{ width: '100%', height: 'auto' }} />
              <Typography variant="body2" gutterBottom>
                {image.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
