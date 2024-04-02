'use client'
import { useState, useEffect } from "react"
import AnimeList from "@/components/AnimeList"
import { getAnimeData } from "@/libs/api-libs"
import { Typography, Container, Box, Stack, Pagination, CircularProgress,FormControlLabel,Switch,Button,Modal,Paper,FormControl,InputLabel,Select,MenuItem } from "@mui/material"
import { Tune as TuneIcon, Search } from '@mui/icons-material';



function Page() {
    const [animeData, setAnimeData] = useState([])
    const [page, setPage] = useState(1)
    const [type,setType] = useState('')
    const [preference,setPreference] = useState('')
    const [rating,setRating] = useState('')
    const [lastPage,setLastPage] = useState(1)
    const [limitPerPage,setLimitPerPage] = useState(24)
    const [isLoading, setIsLoading] = useState(false) // State untuk status loading
    const [safeForWork,setSafeWorWork] = useState(false)

    const filterSelectStyle = "bg-slate-300 opacity-50"


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchData()
    }, [page,safeForWork,type,preference,rating]);

    const changePage = (value) => {
        setPage(value)
        scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 200,
            width: 200,
          },
        },
      };

    const fetchData = async () => {
        setIsLoading(true); // Set status loading menjadi true saat memuat data
        try {
            const response = await getAnimeData("top/anime", `page=${page}&limit=${limitPerPage}&sfw=${safeForWork}&type=${type}&filter=${preference}&rating=${rating}`);
            setAnimeData(response)
            setLastPage(response.pagination.last_visible_page)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Set status loading menjadi false setelah selesai memuat data
        }
    }

    const handleSwitch = () => {
        if(safeForWork === true) {
            setSafeWorWork(false)
        }if(safeForWork === false) {
            setSafeWorWork(true)
        }
    }

    return (
        <> 
            <Container className="my-5"> 
            <Box className="my-5" id="filter-header">
                    <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="center"> 
                    <FormControlLabel control={<Switch />} label="sfw" className="text-white" onChange={handleSwitch} />
                        <Box width={700}>
                        <Stack direction="row" justifyContent="space-around">
                        <FormControl className="my-3 " sx={{width:200}}  size="small" success="true">
                         <InputLabel id="demo-simple-select-label" className="text-white">Preference</InputLabel>
                         <Select
                         className={filterSelectStyle}
                             id="Preference"
                             value={preference}
                             label="Preference"
                             onChange={(event) => setPreference(event.target.value)}
                            MenuProps={MenuProps} 
                         >
                             <MenuItem value="airing">Airing</MenuItem>
                            <MenuItem value="upcoming">Upcoming</MenuItem>
                            <MenuItem value="bypopularity">Popularity</MenuItem>
                            <MenuItem value="favorite">Favorite</MenuItem>
                         </Select>
                         </FormControl>

                         <FormControl className="my-3" sx={{width:200}} size="small" success="true">
                         <InputLabel id="demo-simple-select-label" className="text-white">Type</InputLabel>
                         <Select
                         className={filterSelectStyle}
                             id="Type"
                             value={type}
                             label="Type"
                             onChange={(event) => setType(event.target.value)}
                            MenuProps={MenuProps} 
                         >
                             <MenuItem value="tv">TV</MenuItem>
                            <MenuItem value="movie">Movie</MenuItem>
                            <MenuItem value="ova">OVA</MenuItem>
                            <MenuItem value="special">Special</MenuItem>
                            <MenuItem value="ona">ONA</MenuItem>
                            <MenuItem value="music">Music</MenuItem>
                            <MenuItem value="cm">CM</MenuItem>
                            <MenuItem value="pv">PV</MenuItem>
                            <MenuItem value="tv_special">TV Special</MenuItem>
                         </Select>
                         </FormControl>

                         <FormControl className="my-3" sx={{width:200}} size="small" success="true">
                         <InputLabel id="demo-simple-select-label" className="text-white">Rating</InputLabel>
                         <Select
                            className={filterSelectStyle}
                             id="Rating"
                             value={rating}
                             label="Rating"
                             onChange={(event) => setRating(event.target.value)}
                            MenuProps={MenuProps} 
                         >
                             <MenuItem value="g">All Ages</MenuItem>
                            <MenuItem value="pg">Children</MenuItem>
                            <MenuItem value="pg13">Teens 13 or older</MenuItem>
                            <MenuItem value="r17">17+</MenuItem>
                            <MenuItem value="r+">Mild Nudity</MenuItem>
                            <MenuItem value="rx">Hentai</MenuItem>
                         </Select>
                         </FormControl>
                         
                         </Stack>
                        </Box>
                    </Stack>
                </Box>
                <Stack justifyContent="center" alignItems="center"  spacing={2}>
                    <AnimeList api={animeData}/>
                    {isLoading ? ( // Tampilkan CircularProgress jika isLoading true
                        <CircularProgress />
                    ) : (
                        <Box justifyContent="center" alignItems="center">
                            <Pagination 
                                count={lastPage} 
                                color="secondary" 
                                page={page} 
                                onChange={(event,value) => changePage(value)} 
                                showFirstButton={true} 
                                showLastButton={true}
                            />
                        </Box>
                    )}
                </Stack>
            </Container>
        </>
    )
}
export default Page
