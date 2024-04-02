'use client';
import Image from "next/image";
import { Box, Typography, Container, Divider, Grid, Popover, Card, CardMedia, Button } from "@mui/material";
import { useState } from "react";
import { ArrowDropDownCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function AnimeTrailer({ data, idAnime }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState('');

    const handleClick = (event,embedUrl) => {
        setAnchorEl(event.currentTarget);
        setTrailerUrl(embedUrl);
      };

    const handleClose = () => {
        setAnchorEl(null);
        setTrailerUrl('');
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleViewMore = () => {
        router.push(`/pages/AnimeTrailerMore/${idAnime}`);
    };

    return (
        <Container>
            <Grid
                container={true}
                direction="column"
                justifyContent="space-around"
            >
                <Grid item xs={4}>
                    <Box id="trailer anime">
                        <Typography variant="h6">Trailer</Typography>
                        <Divider />
                        <Container spacing={3} className="my-5">
                            <Grid
                                container={true}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                {data.data?.promo.slice(0, 4).map((data, index) => (
                                    <Grid item xs={5} key={index} className="mx-7">
                                        <Card sx={{ width: 450, height: 252, ':hover': { opacity: 0.7, boxShadow: 5 } }}>
                                            <CardMedia
                                                sx={{ height: "100%", width: "100%" }}
                                                image={data.trailer.images.small_image_url}
                                                title={data.title}
                                                onClick={(event) => handleClick(event,data.trailer.embed_url)}
                                            />
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
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
                                    src={trailerUrl}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </Box>
                        </Popover>
                    </Box>
                    {data.data.promo.length !== 0 &&
                        <Button variant="outlined" endIcon={<ArrowDropDownCircle />} className='border-slate-500 h-10' size="small" onClick={handleViewMore}><Typography className="text-black">View More</Typography></Button>}
                </Grid>
            </Grid>

        </Container>
    );
}
