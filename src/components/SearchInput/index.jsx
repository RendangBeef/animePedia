'use client'
import { FormControl, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import { useState,useEffect } from 'react';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function SearchInput() {
    const [searchData,setSearchData] = useState('')
    const widthSearch = '25ch';
    const router = useRouter();

    const handleSearch = (event) => {
      const keyword = searchData.trim()? searchData.trim() : "sfw"
      if(event.key === "Enter" || event.type === "click"){
        event.preventDefault()   
        if(keyword !== '' && keyword !== null && keyword !== undefined){
          setSearchData('')
          router.push(`/pages/AnimeSearch/${keyword}`);
        }else {
          setSearchData('')
            router.push("/pages/Search/sfw");
            }
      }
    }
  return (
    <>
      <FormControl sx={{ m: 1, width: widthSearch, display: "flex" }} size="small" >
        <OutlinedInput
          className='bg-purple-900 text-white'
          autoComplete="off"
          placeholder='Search'
          onChange={(e)=> setSearchData(e.target.value)}
          value={searchData}
          onKeyDown={handleSearch}
          id="outlined-adornment-search"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}
