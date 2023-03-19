import classes from './FilePreview.module.css'   

const FilePreview = ({image, rounded})=>{
    return(
        <img src={image} className={[classes.myImage, rounded && classes.imageRounded ].join(" ")} ></img>
    )
}

export default FilePreview