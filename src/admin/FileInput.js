import { Button, Box } from '@mui/material';
import './FileInput.css';

function FileInput({onFileLoaded}) {

    

    const handleClick = (e)=>{
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.addEventListener("load", function () { 
            onFileLoaded(reader.result)
        }, false);
        reader.readAsDataURL(file);
    }

  return (

        <Box sx={{ position:"relative"}}>
                <Button sx={{    position: "absolute",
    top: "0",
    left: "0",
}} variant="contained" fullWidth>
                    INCARCA FISIERUL
                </Button>
            <input className='file-input' type="file" onChange={(e)=>handleClick(e)}></input>
        </Box>
    );
}

export default FileInput;
