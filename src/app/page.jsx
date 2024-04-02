import { Container, Grid, Box, Typography } from "@mui/material";
import { getAnimeData } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Link from "next/link";

export default async function Home() {
  const topAnimeData = await getAnimeData("top/anime", "limit=12");
  const AnimeSeasonNowData = await getAnimeData("seasons/now", "limit=12");

  return (
    <>
      <Container className="my-12 item-center justify-center">
        <Grid
          container={true}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <Box className="pl-6 pb-6"><Typography className="text-white">TOP ANIME</Typography></Box>
            <AnimeList api={topAnimeData} />
            <Box className="pl-6 pt-6"><Link href="/pages/AnimeTop"><Typography className="text-white">VIEW MORE</Typography></Link></Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box className="pl-6 pb-6"><Typography className="text-white">ANIME SEASON NOW</Typography></Box>
            <AnimeList api={AnimeSeasonNowData} />
            <Box className="pl-6 pt-6"><Link href="/pages/AnimeSeason"><Typography className="text-white">VIEW MORE</Typography></Link></Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
