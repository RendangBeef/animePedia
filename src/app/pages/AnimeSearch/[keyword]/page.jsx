'use client'
import { useState, useEffect } from "react"
import AnimeList from "@/components/AnimeList"
import { getAnimeData } from "@/libs/api-libs"
import { Typography, Container, Box, Stack, Pagination, CircularProgress } from "@mui/material"


function AnimeSearch({ params }) {
    const [animeData, setAnimeData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage,setLastPage] = useState(1)
    const [limitPerPage,setLimitPerPage] = useState(24)
    const [isLoading, setIsLoading] = useState(false) // State untuk status loading
    const { keyword } = params
    
   

    useEffect(() => {
        fetchData()
    }, [page])

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
            const response = await getAnimeData("anime",`q=${ keyword === "sfw" ? "" : keyword}&page=${page}&limit=${limitPerPage}`)
            setAnimeData(response)
            setLastPage(response.pagination.last_visible_page)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Set status loading menjadi false setelah selesai memuat data
        }
    }

    return (
        <> 
            <Container className="my-5"> 
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
export default AnimeSearch
