// ** MUI Imports
import ProtectedRoute from '../../components/ProtectedRoute';
import { Grid, Card, CardHeader, CardContent, IconButton, Typography, Box, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import LinearProgress from '@mui/material/LinearProgress'
import { useDropzone } from 'react-dropzone';
import { useCallback,useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {fasescapImageUpload} from 'src/context/api/apiService';

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

interface DataType {
  title: string
  imgSrc: string
  amount: string
  subtitle: string
  progress: number
  color: ThemeColor
  imgHeight: number
}

const data: DataType[] = [
  {
    progress: 75,
    imgHeight: 20,
    title: 'Zipcar',
    color: 'primary',
    amount: '$24,895.65',
    subtitle: 'Vuejs, React & HTML',
    imgSrc: '/images/cards/logo-zipcar.png'
  },
  {
    progress: 50,
    color: 'info',
    imgHeight: 27,
    title: 'Bitbank',
    amount: '$8,650.20',
    subtitle: 'Sketch, Figma & XD',
    imgSrc: '/images/cards/logo-bitbank.png'
  },
  {
    progress: 20,
    imgHeight: 20,
    title: 'Aviato',
    color: 'secondary',
    amount: '$1,245.80',
    subtitle: 'HTML & Angular',
    imgSrc: '/images/cards/logo-aviato.png'
  }
]

const Dashboard = () => {
    
    const [quality, setQuality] = useState(80);
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [batchSize, setBatchSize] = useState(1);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const onDrop = useCallback((acceptedFiles) => {
        // Handle the uploaded files here
        console.log(acceptedFiles,"Both type");

        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('file', file);
          });
          formData.append('quality', quality);
          formData.append('aspectRatio', aspectRatio);
          formData.append('batchSize', batchSize);

        fasescapImageUpload(formData)
        .then(response => {
          console.log(response,"User Image Upload");
          setImagePreview(URL.createObjectURL(acceptedFiles[0]));
         
        })
        .catch(error => {
          console.error('Error updating user status:', error);
          // Handle error state or notify user about the error
        });

      }, []);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });
      

      
  return (
    <ProtectedRoute>
    <Grid container spacing={12}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            title='Product Image'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
            action={
              <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                Add Media From Url
              </IconButton>
            }
          />
          <CardContent sx={{ pt: 2.25 }}>
            <Box {...getRootProps()} sx={{mb: 1.5, display: 'flex',alignItems: 'center',justifyContent: 'center',borderRadius: '4px',padding: '20px',cursor: 'pointer',}}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '1.125rem !important', textAlign: 'center' }}>
                  Drop the image here...
                </Typography>
              ) : (
                <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '1.125rem !important', textAlign: 'center' }}>
                  Drag and drop your image here.
                </Typography>
              )}
            </Box>
            <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center' }}>
              or
            </Typography>
            <Button variant="contained" component="label"  sx={{ mt: 2, display: 'block', mx: 'auto' }}>
              Browse Image
              <input type="file" hidden accept="image/*" onChange={(e) => {const files = e.target.files;
                  if (files.length > 0) 
                  {
                    onDrop(Array.from(files));
                  }
                }}
              />
            </Button>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader>

          </CardHeader>

          <CardContent>
          
          <Box sx={{ display: 'flex', gap: 2}}>
          <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="quality-label">Quality</InputLabel>
              <Select
                labelId="quality-label"
                id="quality"
                value={quality}
                label="Quality"
                onChange={(e) => setQuality(e.target.value)}
              >
                <MenuItem value={50}>50%</MenuItem>
                <MenuItem value={60}>60%</MenuItem>
                <MenuItem value={70}>70%</MenuItem>
                <MenuItem value={80}>80%</MenuItem>
                <MenuItem value={90}>90%</MenuItem>
                <MenuItem value={100}>100%</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="aspect-ratio-label">Aspect Ratio</InputLabel>
              <Select
                labelId="aspect-ratio-label"
                id="aspect-ratio"
                value={aspectRatio}
                label="Aspect Ratio"
                onChange={(e) => setAspectRatio(e.target.value)}
              >
                <MenuItem value={'16:9'}>16:9</MenuItem>
                <MenuItem value={'4:3'}>4:3</MenuItem>
                <MenuItem value={'1:1'}>1:1</MenuItem>
                <MenuItem value={'2:3'}>2:3</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="batch-size-label">Batch Size</InputLabel>
              <Select
                labelId="batch-size-label"
                id="batch-size"
                value={batchSize}
                label="Batch Size"
                onChange={(e) => setBatchSize(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            </Box>

          {imagePreview && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <img src={imagePreview} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </Box>
           )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
        <CardHeader title='Select Item Location'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important', fontSize: '1.125rem !important' } }}
          />
        </Card>
      </Grid>
    </Grid>
   
    </ProtectedRoute> 
  )
}

export default Dashboard
