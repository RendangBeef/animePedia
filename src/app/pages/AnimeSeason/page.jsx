'use client'
import { useState, useEffect } from "react"
import AnimeList from "@/components/AnimeList"
import { getAnimeData } from "@/libs/api-libs"
import SearchInput from "@/components/SearchInput"
import { Typography, Container, Box, Stack, Pagination, CircularProgress,Grid,Button,Modal,Paper,FormControl,InputLabel,Select,MenuItem,Switch,FormControlLabel} from "@mui/material"

import { Tune as TuneIcon, Search } from '@mui/icons-material';


function Page() {
    const [animeData, setAnimeData] = useState([])
    const [safeForWork,setSafeWorWork] = useState(false)
    const [seasons, setSeasons] = useState('')
    const [years, setYears] = useState('')
    const [seasonsAnime, setSeasonAnime] = useState('seasons/now')
    const [yearList,setYearList] = useState([])
    const [seasonsList,setSeasonsList] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage,setLastPage] = useState(1)
    const [limitPerPage,setLimitPerPage] = useState(24)
    const [isLoading, setIsLoading] = useState(false) // State untuk status loading

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchData()
        getSeasons()
    }, [page,seasonsAnime,safeForWork]);

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: 200,
            width: 200,
          },
        },
      };
      
    const changePage = (value) => {
        setPage(value)
        scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }
    
    const fetchData = async () => {
        setIsLoading(true); // Set status loading menjadi true saat memuat data
        try {
            const response = await getAnimeData(seasonsAnime, `page=${page}&limit=${limitPerPage}&sfw=${safeForWork}`);
            setAnimeData(response)
            setLastPage(response.pagination.last_visible_page)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Set status loading menjadi false setelah selesai memuat data
        }
    }

    const getSeasons = async () => {
        try{
            const response = await getAnimeData('seasons','')
            setYearList(response.data.map((data)=> data.year))
            setSeasonsList(response.data.map((data)=> data.seasons))
            // response.data.map((data)=> console.log(data.year,"cek"))
            
        }catch(error) {

        }
    }
    const handleChange = (event) => {
        setYears(event.target.value);
      };

    const handleFilter = () => {
        setSeasonAnime(`seasons/${years}/${seasons}`)
        handleClose()
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
                    <Stack container={true} direction="row"
                            justifyContent="flex-end"
                            alignItems="center"> 
                    <FormControlLabel control={<Switch />} label="sfw" className="text-white" onChange={handleSwitch} />
                    <Button variant="outlined" startIcon={<TuneIcon/>} className='border-slate-500 h-10' size="small" onClick={handleOpen}><Typography className="text-white">Filter</Typography></Button>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Paper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-200 w-1/6 h-2/6 flex justify-center items-center">
                    <Stack container="ture" direction="column" justifyContent="space-evenly" id="seasonsfilter">
                        <Stack container="ture" direction="column" justifyContent="space-around">
                    <FormControl className="my-3" sx={{width:200}} >
                        <InputLabel id="demo-simple-select-label">Years</InputLabel>
                        <Select
                            id="Years"
                            value={years}
                            label="Years"
                            onChange={(handleChange)}
                           MenuProps={MenuProps} 
                        >
                            {yearList.map((data)=><MenuItem value={data}>{data}</MenuItem>)}
                            
                        </Select>
                        </FormControl>
                        {years? 
                         <FormControl className="my-3" sx={{width:200}} >
                         <InputLabel id="demo-simple-select-label">Seasons</InputLabel>
                         <Select
                             id="seasons"
                             value={seasons}
                             label="Seasons"
                             onChange={(event) => setSeasons(event.target.value)}
                            MenuProps={MenuProps} 
                         >
                             <MenuItem value="winter">winter</MenuItem>
                             <MenuItem value="spring">spring</MenuItem>
                             <MenuItem value="summer">summer</MenuItem>
                             <MenuItem value="fall">fall</MenuItem>
                         </Select>
                         </FormControl>:""}
                         </Stack>
                    <Button onClick={handleFilter}>apply</Button>
                    </Stack>
                    </Paper>
                    </Modal>
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
