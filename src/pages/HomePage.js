import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import classes from "./HomePage.module.css"
import vid1 from "./videos/ocn.jpg"
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'
import Calistatistics from '../components/Calistatistics'
import EndBar from '../components/EndBar'

const HomePage = () => {
  const handleChangeLanguage=()=>{

  }

  return (
    <div className={classes.main}>
        <div className={classes.content}>
          <img alt='img6547' className={classes.video} src={vid1} /> 
            <Box sx={{ display:"flex", textShadow:"rgba(43, 43, 43, 0.301) 2px 2px", flexDirection:"row", fontSize:"29px", alignItems:"center", justifyContent:"space-around", padding:"20px 15px", position:"relative" }}>
              <Link style={{textDecoration: 'none', color:"white"}} to={"/"}> Homepage </Link>
              <Link style={{textDecoration: 'none', color:"white"}} to={"/hot-offers"}> Hot Offers </Link>
              <Link style={{textDecoration: 'none', color:"white"}} to={"/contact-us"}> Contact Us </Link>
              <div> </div>
              <div />
              <div onClick={handleChangeLanguage} className={classes.language} />
            </Box>

            <Box sx={{display: "flex", flexDirection:"row", alignItems:"center",justifyContent:"space-around", position:"relative"}}>
              <Button className={classes.mod1} sx={{width:"500px", marginRight:"-300px" ,height:"100px", border:"3px solid white", borderRadius:"16px", fontSize:"24px"}} > <Link style={{textDecoration: 'none', color:"white"}} to={"/search-destination"}> Search your holiday </Link> </Button>
              <p className={classes.give} style={{fontSize:"24px", color:"white", marginLeft:"-750px"}} > Don't be shy. Give it a try</p>
            </Box>
            
            <Box className={classes.mod4} sx={{ display:"grid", height:"700px", width:"100%", backgroundColor:"white", alignItems:"center", justifyContent:"center"}}>
              <AboutUs />
            </Box>

            <Box className={classes.mod5} sx={{ display:"grid", height:"700px", width:"100%", alignItems:"center", justifyContent:"center", zIndex:"10", position:"relative"}}>
              <ContactUs />
              <div className={classes.laugh} />
            </Box>
              <Box className={classes.mod2} sx={{ display:"grid", height:"700px", width:"100%", backgroundColor:"white", alignItems:"center", justifyContent:"center"}}>
                <Calistatistics />
              </Box>
              <Box className={classes.mod3} sx={{ display:"grid", height:"200px", width:"100%", justifyContent:"center", alignItems:"center",  backgroundColor:"rgba(192, 192, 192, 0.39)"}}>
                <EndBar />
              </Box>
        </div>
    </div>
  )
}

export default HomePage