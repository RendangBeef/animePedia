'use client'
import { Typography, Container, Box, Grid, Divider, Card, CardMedia, Popover } from "@mui/material";
import { getAnimeById } from "@/libs/api-libs";
import { useState, useEffect } from "react";

export default function AnimeTrailerMore({ params: { id } }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [animeData, setAnimeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAnimeById(id, "videos");
                setAnimeData(data);
            } catch (error) {
                console.error("Error fetching anime data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleClick = (event, embedUrl) => {
        setTrailerUrl(embedUrl);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setTrailerUrl('');
    };

    const open = Boolean(anchorEl);
    const idPopover = open ? 'simple-popover' : undefined;

    return (
        <>
            <Container className="my-10">
                <Box className="mb-3">
                    <Typography variant="h6" className="text-white">Trailer</Typography>
                </Box>
                <Grid 
                    container={true}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    {animeData?.data?.promo.map((data, index) => (
                        <Grid item xs={6} sm={4} md={4} key={index}>
                            <Card
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    ':hover': { opacity: 0.7, boxShadow: 5 }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={data.trailer.images.medium_image_url}
                                    title={data.title}
                                    onClick={(event) => handleClick(event,data.trailer.embed_url)}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Popover
                    id={idPopover}
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
                            src={trailerUrl}  
                            title="YouTube video player"  
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </Box>
                </Popover>
            </Container>
        </>
    );
}
