import { getAnimeById } from "@/libs/api-libs";
import Image from "next/image";
import { Grid, Container, Box,Button,Typography} from "@mui/material";
import AnimeListDescriptions from "@/components/AnimeListDescriptions";
import AnimeSubDescriptions from "@/components/AnimeSubDescriptions";
import AnimeTrailer from "@/components/AnimeTrailer";
import { ArrowDropDownCircle } from '@mui/icons-material';

export default async function Animeinfo({ params:{id} }) {
    const animeData = await getAnimeById(`${id}`, "full");
    const animeTrailer = await getAnimeById(`${id}`,"videos");
    const AnimeCharacter = await getAnimeById(`${id}`,"characters");

    return (
        <>
            <Container maxWidth="xl" className="bg-violet-200 my-8 m-auto">
                <Grid container={true} spacing={3}>
                    <Grid item xs={3} key={animeData.data.mal_id}>
                        <Grid container={true} >
                            <Grid item id="image" m="auto">
                                <Box>
                                    <Image width={300} height={300} src={animeData.data.images.webp.large_image_url} alt={animeData.data.title}  />
                                </Box>
                            </Grid>
                            <Grid item id="information" width="100%">
                               <AnimeListDescriptions data={animeData}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={9}>
                       <AnimeSubDescriptions data={animeData} dataTrailer={animeTrailer} idAnime={id} dataCharacter={AnimeCharacter}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
