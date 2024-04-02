'use client'
import { Box,Popover} from "@mui/material";
import { useState,useEffect } from "react";


export default function VideoPlayer({videoUrl,anchor}){
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        setAnchorEl(anchor);
    },[anchor])
    console.log(anchor,"cekk");

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return(
        <>
            <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 430, left: 990 }}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            className="bg-neutral-900/70"
                        >
                        <Box>
                        <iframe 
                                width="640" 
                                height="360" 
                                src={videoUrl}  
                                title="YouTube video player"  
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </Box>
                        </Popover>
        </>
    )
}