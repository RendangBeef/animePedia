import { Typography, Box, Stack } from "@mui/material"
import Image from "next/image";
import NotFoundImage from '../../public/icons/NotFound.png';
import Link from "next/link";


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
                    src={NotFoundImage} // Lokasi gambar di dalam direktori public
                    alt="Deskripsi Gambar"
                    width={300} // Lebar gambar dalam piksel
                    height={200} // Tinggi gambar dalam piksel
                />
                <Box><Typography className="text-4xl my-8 text-white">PAGE NOT FOUND</Typography></Box>
                <Box><Link href="/"><Typography className="text-4xl my-8 text-white">back</Typography></Link></Box>
            </Stack>
        </>
    )
}
export default page