import { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const useStyles = makeStyles({
    root: {
        margin: "0 auto",
        marginTop: "150px",
        width: "80%", 
        height:"500px", 
        background:"white",
        
    },
    
  });
  
function ImageLoadDialog({open, onClose, image, onPath, ratio}){
    const classes = useStyles();
    const [cropData, setCropData] = useState("");
    const [ formData, setFormData ] = useState();
    const [ fileName, setFileName ] = useState("")
    const cropperRef = useRef()

    const handleCrop= (e)=>{
      const imageData = cropperRef.current.cropper.getCroppedCanvas({imageSmoothingQuality:"high", minWidth: 250, maxWidth: 1980}).toDataURL("image/jpeg", 1)
      setTimeout(() => {
         setCropData(imageData)
      }, 100);
     
    }

    const handleImage = async () =>{
      formData.append("fileName", fileName)
      formData.append("folder", "ionut")
      formData.append("httpLink", "http://localhost:4000/external-images")
      const formProps = Object.fromEntries(formData)
      let data =  await fetch("http://localhost:4000/upload-service/api/images/upload", {
        method: "POST",
        body: formData
      }).then((res)=>{
        return res.json()
      })
      if(data.path){
        onPath(data)
      }
      
    }

    const handleName = (e) =>{
      setFileName(e.target.value)
    }


    useEffect(()=>{
      fetch(cropData)
      .then(res => res.blob())
      .then(blob => {
        const fd = new FormData();
        const file = new File([blob], "filename.jpeg");
        fd.append('image', file)
        setFormData(fd);
      })
    }, [cropData])
    return(
    <Dialog PaperProps={{
        style: {
          maxWidth: '700px',
          height: "500px",
          boxSizing: "border-box"
        },
      }} open={open}>
        <DialogTitle>Enter your image <Button onClick={onClose} sx={{position: "absolute", right:"16px" }}> <div className={classes.add} /> </Button> </DialogTitle>
        <DialogContent> 
          <TextField sx={{m:"24px 0"}} label="Introdu numele fisierului" onBlur={handleName} ></TextField>
          <div style={{display:"grid", gridTemplateColumns:"4fr 3fr", gap:"16px"}}>
            <div>
              <Cropper
            style={{ height: "auto", width: "400px" }}
            aspectRatio={ratio?ratio:16/9}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            ref = {cropperRef}
            cropend={handleCrop}
            ready={handleCrop}
            guides={true}
          />
            </div>
            <div>
                <img style={{width:"250px", height:"auto"}} src={cropData}></img> 
              </div>
          </div>
        </DialogContent>
        <DialogActions> <Button onClick={handleImage} >Load Image</Button> </DialogActions>
    </Dialog>

    )
}

export default ImageLoadDialog