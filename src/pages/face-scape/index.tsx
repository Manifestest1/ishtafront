// ** MUI Imports
import ProtectedRoute from '../../components/ProtectedRoute';
import MultipleSelectLocationFilter from 'src/views/facescap/MultipleSelectLocationFilter';
import MultipleSelectActivityFilter from 'src/views/facescap/MultipleSelectActivityFilter';
import MultipleSelectOutfitFilter from 'src/views/facescap/MultipleSelectOutfitFilter';
import MultipleSelectPoseFilter from 'src/views/facescap/MultipleSelectPoseFilter';
import MultipleSelectHsFilter from 'src/views/facescap/MultipleSelectHsFilter';
import MultipleSelectAccessoriesFilter from 'src/views/facescap/MultipleSelectAccessoriesFilter';
import MultipleSelectMoodThemeFilter from 'src/views/facescap/MultipleSelectMoodThemeFilter';
import MultipleSelectSkinExposureFilter from 'src/views/facescap/MultipleSelectSkinExposureFilter';
import MultipleFieldSelectFilter from 'src/views/facescap/MultipleFieldSelectFilter';

import { TextField,Grid, Card, CardHeader, CardContent, IconButton, Typography, Box, Button, MenuItem, FormControl, InputLabel, Select,Avatar,LinearProgress } from '@mui/material';
// ** MUI Imports
import { useDropzone } from 'react-dropzone';
import { useCallback,useState,useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';

import {fasescapImageUpload,getAllFiltersData} from 'src/context/api/apiService';

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

const options = ['Beach', 'City skyline', 'Mountain top', 'Coze cafe', 'Park', 'Home office', 'Fashion runway','Art gallery','Gym or fitness studio','Exotic marketplace','Forest or nature trai','Luxury hotel','Rooftop bar','Historical landmark','Street art mural'];
const options1 = ['Reading a book','Drinking coffee','Working on a laptop','Exercising or doing yoga','Shopping','Dancing','Cooking or baking','Hiking or exploring nature','Attending a social event or party','Painting or creating art','Playing a musical instrument','Meditating','Traveling or exploring new places','Dining at a restaurant','Playing with a pet'];
const options2 = ['Casual jeans and t-shirt','Evening gown or tuxedo','Workout gear','Summer dress or shorts and tank top','Winter coat and scarf','Swimsuit or beachwear','Business suit or office attire','Bohemian chic outfit','Streetwear or urban style','Festival or concert outfit','Loungewear or pajamas','Cocktail dress or party outfit','Sporty athleisure','Vintage or retro clothing','Cultural or traditional attire'];
const options3 = ['Sitting casually','Leaning against a wall','Jumping in the air','Lying down','Standing with one hand onthe hip','Walking towards the camera','Looking over the shoulder','Crossed arms','Hands in pockets','Blowing a kiss','Peace sign','Laughing or smiling','Gazing into the distance','Balancing on one leg','Holding an object (e.g.,coffee cup, book)'];
const options4 = ['Loose waves','Sleek and straight','High ponytail','Messy bun','Braids or plaits','Curly hair','Short bob','Half-up, half-down','Top knot','Beachy waves','Side braid','Elegant updo','Pixie cut','Natural curls','Faux hawk'];
const options5 = ['Sunglasses','Hats','Scarves','Watches','Statement jewelry','Handbags','Belts','Gloves','Hair accessories (e.g.,headbands, clips)','Footwear (e.g., sneakers,heels, boots)','Umbrella','Phone','Backpack','Layered necklaces','Rings'];
const options6 = ['Romantic','Adventurous','Relaxed','Energetic','Professional','Playful','Artistic','Mystical','Festive','Empowered','Dreamy','Bold','Nostalgic','Minimalistic','Vibrant'];
const options7 = ['Fully covered (long sleeves,pants)','Modestly exposed (short sleeves, knee-length skirt)','Casual exposure (tank top,shorts)','Beachwear (swimsuit, bikini)','Backless dress or top','Off-the-shoulder top','Crop top or midriff-baring','Deep V-neck','Strapless outfit','High-slit dress or skirt','Bare arms','Bare legs','Showing tattoos','Shoulder-baring','Minimal exposure (tasteful cutouts)'];

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
    
    const [quality, setQuality] = useState('low');
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [batchSize, setBatchSize] = useState(1);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Filter Field Defined
    const [selectedValuesLocation, setSelectedValuesLocation] = useState([]);
    const [selectedValuesActivity, setSelectedValuesActivity] = useState([]);
    const [selectedValuesOutfit, setSelectedValuesOutfit] = useState([]);
    const [selectedValuesPose, setSelectedValuesPose] = useState([]);
    const [selectedValuesHs, setSelectedValuesHs] = useState([]);
    const [selectedValuesAccessories, setSelectedValuesAccessories] = useState([]);
    const [selectedValuesMoodTheme, setSelectedValuesMoodTheme] = useState([]);
    const [selectedValuesSkinExposure, setSelectedValuesSkinExposure] = useState([]);

    const [selectedFilterOptions, setFilterOptions] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token');  
      if (token) 
      {
        getAllFiltersData()
              .then(response => {
                  console.log(response.data.filters,"Get All Filters");
                  setFilterOptions(response.data.filters);
              
              })
              .catch((error) => {
                  if (error.response.status === 401) 
                  {
                    // Handle unauthorized access
                  }
              });
      } 
     
  }, []);

    const onDrop = useCallback((acceptedFiles) => {
      console.log(quality,"Quality Check");
        // Handle the uploaded files here
        console.log(acceptedFiles,"Both type");

        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('file', file);
          });
          
          formData.append('quality', quality);
          formData.append('aspectRatio', aspectRatio);
          formData.append('batchSize', batchSize);

          if (acceptedFiles.length > 0) 
          {
            setImagePreview(URL.createObjectURL(acceptedFiles[0]));
          }

        // fasescapImageUpload(formData)
        // .then(response => {
        //   console.log(response,"User Image Upload");
        //   setImagePreview(URL.createObjectURL(acceptedFiles[0]));
         
        // })
        // .catch(error => {
        //   console.error('Error updating user status:', error);
        //   // Handle error state or notify user about the error
        // });

      }, [quality, aspectRatio, batchSize]);
    
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
            <Button variant="contained" component="label"  sx={{ mt: 2, display: 'block', mx: 'auto', width:'160px' }}>Browse Image
              <input type="file" hidden accept="image/*" onChange={(e) => {const files = e.target.files;
                  if (files.length > 0) 
                  {
                    onDrop(Array.from(files));
                  }
                }}/>
            </Button>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader></CardHeader>

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
                  <MenuItem value={'low'}>Low</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'high'}>High</MenuItem>
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

           
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
        {/* <CardHeader title='Select Item Location' 
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important', fontSize: '1.125rem !important' } }}
          /> */}

        <CardContent>

          {/* <Typography variant='body2' sx={{ fontWeight: 600 }}>Select Item <b>Location</b></Typography>
          <FormControl fullWidth>
             <Select label="Status"  defaultValue="Select Category" >
                <MenuItem value='Select Category'>Select Category</MenuItem>
                  {selectedFilterOptions && selectedFilterOptions.map(selectfilter => (
                    // <MenuItem key={selectfilter.id} value={selectfilter.sub_category}>
                    //   {selectfilter.sub_category}
                    // </MenuItem>
                ))}
              </Select>
          </FormControl> */}

        {selectedFilterOptions && selectedFilterOptions.map(selectfilter => (
              <div key={selectfilter.category_id}> {/* Make sure to include a unique key for each mapped item */}
                <Typography variant='body2' sx={{ fontWeight: 600 }}>Select Item <b>{selectfilter.category_name}</b></Typography>
                <FormControl fullWidth>
                  <Select label="Status" defaultValue="Select Category">
                    <MenuItem value='Select Category'>Select Category</MenuItem>
                    {selectfilter.sub_categories.map((subCategory, index) => (
                      <MenuItem key={index} value={subCategory.id}>
                        {subCategory.sub_category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ))}
          {/* <MultipleFieldSelectFilter options={selectedFilterOptions}/> */}
          {/* <Typography variant='body2' sx={{ fontWeight: 600 }}>Select Item <b>Location</b></Typography>
          <MultipleSelectLocationFilter options={options} label="Select Options" selectedValues={selectedValuesLocation} setSelectedValues={setSelectedValuesLocation}/> */}

          {/* <Typography variant='body2' sx={{ mt: 4, fontWeight: 600 }}>Select Item <b>Activity</b></Typography>
          <MultipleSelectActivityFilter options={options1} label="Select Options" selectedValues={selectedValuesActivity} setSelectedValues={setSelectedValuesActivity}/>

          <Typography variant='body2' sx={{ mt: 4, fontWeight: 600 }}>Select Item <b>Outfit</b></Typography>
          <MultipleSelectOutfitFilter options={options2} label="Select Options" selectedValues={selectedValuesOutfit} setSelectedValues={setSelectedValuesOutfit}/>

          <Typography variant='body2' sx={{ mt: 4, fontWeight: 600 }}>Select Item <b>Pose</b></Typography>
          <MultipleSelectPoseFilter options={options3} label="Select Options" selectedValues={selectedValuesPose} setSelectedValues={setSelectedValuesPose}/>

          <Typography variant='body2' sx={{ mt: 4, fontWeight: 600 }}>Select Item <b>HairStyle</b></Typography>
          <MultipleSelectHsFilter options={options4} label="Select Options" selectedValues={selectedValuesHs} setSelectedValues={setSelectedValuesHs}/>

          <Typography variant='body2' sx={{ mt: 4, fontWeight: 600 }}>Select Item <b>Accessories</b></Typography>
          <MultipleSelectAccessoriesFilter options={options5} label="Select Options" selectedValues={selectedValuesAccessories} setSelectedValues={setSelectedValuesAccessories}/>

          <Typography variant='body2' sx={{ mt: 4, fontWeight: 600 }}>Select Item <b>Mood/Theme</b></Typography>
          <MultipleSelectMoodThemeFilter options={options6} label="Select Options" selectedValues={selectedValuesMoodTheme} setSelectedValues={setSelectedValuesMoodTheme}/>

          <Typography variant='body2' sx={{ mt: 4, fontWeight: 600 }}>Select Item <b>Skin Exposure</b></Typography>
          <MultipleSelectSkinExposureFilter options={options7} label="Select Options" selectedValues={selectedValuesSkinExposure} setSelectedValues={setSelectedValuesSkinExposure}/> */}
        </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        
               
        <Box sx={{ mt: 2, display: 'flex',mb: 120 }}>
          {imagePreview ? (
          <img src={imagePreview} alt="Uploaded Preview"  width={400} height={100}  // Fixed width
          height={Math.floor(500 / parseFloat(aspectRatio.split(':')[0]) * parseFloat(aspectRatio.split(':')[1]))} 
          quality={quality === 'high' ? 100 : quality === 'medium' ? 75 : 50} />) : (
          <img src="https://dummyimage.com/400x400/000/fff" alt="Dummy Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          )}
        </Box>
        

        <Box>
          <TextField fullWidth placeholder='Optional Custom Prompt' />
          <Button variant="contained" component="label"  sx={{ mx: 'auto', width:'160px',position:'absolute',right:'7%',marginTop:'8px' }}>Generate <SendIcon sx={{ ml: 4 }}/></Button>
        </Box>
      </Grid>
    </Grid>
   
    </ProtectedRoute> 
  )
}

export default Dashboard
