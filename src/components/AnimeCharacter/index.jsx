'use client'
import React, { useState } from 'react';
import { 
    Card,
    Box,
    CardContent,
    Typography,
    CardMedia,
    Grid,
    Divider,
    Container,
    Stack,
    Button,
    CardActions,
    Link
} from "@mui/material";

import { ArrowDropDownCircle } from '@mui/icons-material';

import { useRouter } from 'next/navigation';

export default function AnimeCharacter({ data, idAnime }) {
    const router = useRouter();
    const [trailerUrl, setTrailerUrl] = useState(null);

    const handleViewMore = () => {
        router.push(`/pages/AnimeCharacterMore/${idAnime}`);
    };

    const handleClick = (event, embedUrl) => {
        setTrailerUrl(embedUrl);
    };

    return (
        <Container>
            <Typography variant="h6">Character</Typography>
            <Divider />
            <Container>
                <Grid container justifyContent="flex-start" spacing={3} className="my-5">
                    {data.data.slice(0, 6).map((data) => (
                        <Grid item xs={12} sm={6} md={4} key={data.character.id}>
                            <Card sx={{ display: 'flex', minHeight: '100%' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151, height: "100%"}}
                                    image={data.character.images.webp.image_url}
                                    alt="Live from space album cover"
                                    className="my-auto"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                                    <CardContent sx={{ width: "100%", flexGrow: 1 }}>
                                        <Box id="Character_information">
                                            <Divider textAlign="left" className="my-1">Character</Divider>
                                            <Stack>
                                                <Typography sx={{ fontWeight: 'medium' }}>Name :</Typography>
                                                <Typography>{data.character.name}</Typography>
                                            </Stack>
                                            <Divider className="my-1" />
                                            <Stack>
                                                <Typography sx={{ fontWeight: 'medium' }}>Role :</Typography>
                                                <Typography>{data.role}</Typography>
                                            </Stack>
                                        </Box>
                                        <Box id="voice_actors">
                                            <Divider textAlign="left" className="my-1">Voice Actors</Divider>
                                            {data.voice_actors.filter(data => data.language === "Japanese").map((data) => (
                                                <React.Fragment key={data.person.id}>
                                                    <Stack spacing={1}>
                                                        <Typography sx={{ fontWeight: 'medium' }}>{data.language}:</Typography>
                                                        <Typography>{data.person.name}</Typography>
                                                    </Stack>
                                                    <Divider className="my-1" />
                                                </React.Fragment>
                                            ))}
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Link href={data.character.url} target="_blank"><Button>MORE INFO</Button></Link>
                                    </CardActions>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {data.data.length !== 0 &&
                <Button variant="outlined" endIcon={<ArrowDropDownCircle />} className='border-slate-500 h-10' size="small" onClick={handleViewMore}>
                    <Typography className="text-black">View More</Typography>
                </Button>
            }
        </Container>
    );
}
``