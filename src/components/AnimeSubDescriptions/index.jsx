import { Box, Typography, Container, Divider, Grid } from "@mui/material";
import AnimeTrailer from "@/components/AnimeTrailer";
import AnimeCharacter from "@/components/AnimeCharacter";

export default function AnimeSubDescriptions({ data, dataTrailer, idAnime, dataCharacter }) {
    return (
        <Container>
            <Grid
                container={true}
                direction="column"
                spacing={2} // Spacing between Grid items
            >
                <Grid item xs={4}>
                    <Box sx={{ margin: '0 auto 2rem auto' }}> {/* Added margin */}
                        <Typography variant="h6">{data.data.title}</Typography>
                        <Divider />
                        <Box id="synopsis" className="my-5">
                            <Typography>{data.data.synopsis}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ margin: '0 auto 2rem auto' }}> {/* Added margin */}
                        <AnimeTrailer data={dataTrailer} idAnime={idAnime} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ margin: '0 auto 2rem auto' }}> {/* Added margin */}
                        <AnimeCharacter data={dataCharacter} idAnime={idAnime} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
