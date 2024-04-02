import { Container, Grid, Card, CardMedia, CardContent, Box, Typography } from "@mui/material";
import Link from "next/link";

export default function AnimeList({ api }) {
    return (
        <Container>
            <Grid 
                container 
                justifyContent="center" 
                spacing={2}
            >
                {api.data?.map((data, index) => ( 
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                            <Card sx={{ width: 170, ":hover": { opacity: 0.7 } }}>
                        <Link href={`/pages/AnimeInfo/${data.mal_id}`}>
                                <CardMedia
                                    sx={{ height: 260, width: "100%" }}
                                    image={data.images.webp.image_url}
                                    title={data.title}
                                    className="relative"
                                >
                                    <CardContent className="text-xs text-white absolute bottom-0 w-full bg-gradient-to-t from-slate-900 from-20% via-slate-800 via-50%">
                                        <Box>
                                            <Typography sx={{ fontSize: 13 }}>{data.title}</Typography>
                                        </Box>
                                    </CardContent>
                                </CardMedia>
                        </Link>
                            </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
