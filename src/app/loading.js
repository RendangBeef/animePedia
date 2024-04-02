import { Typography, Box, Stack } from "@mui/material"
import Image from 'next/image';
import LoadingIcon from '../../public/icons/loading.png';
function page() {
    return (
        <>
            <Stack container
                direction="column"
                justifyContent="center"
                alignItems="center"
                margin="auto"
                className="flex justify-center item-center min-h-screen"
            >
                <Image
                    src={LoadingIcon} // Lokasi gambar di dalam direktori public
                    alt="Deskripsi Gambar"
                    width={250} // Lebar gambar dalam piksel
                    height={150} // Tinggi gambar dalam piksel
                />
                <Box><Typography className="text-4xl my-8 text-white">LOADING...</Typography></Box>
            </Stack >
        </>
    )
}
export default page