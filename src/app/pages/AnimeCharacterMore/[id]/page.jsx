'use client'
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
import { getAnimeById } from "@/libs/api-libs";
import { useState, useEffect } from "react";

export default async function AnimeCharacterMore({ params: { id } }) {
    const animeData = await getAnimeById(id,"characters");
    return (
        <>
            <Container className="my-10">
            <Container spacing={3} className="my-5">
                <Grid container justifyContent="flex-start" spacing={1}>
                    {animeData.data?.map((data) => (
                        <Grid item xs={12} sm={6} md={4} key={data.character.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'row', height: '100%' }} className="min-h-full">
                                <CardMedia
                                    component="img"
                                    sx={{ flex: 1, objectFit: 'cover' }}
                                    image={data.character.images.webp.image_url}
                                    alt="Character Image"
                                />
                                <CardContent>
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
                                            <React.Fragment key={data.person.name}>
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
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
        </>
    );
}
