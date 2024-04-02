import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function AnimeListDescriptions({ data }) {
    return (
        <Box>
            {/* Title Section */}
            <Typography variant="h6">Title</Typography>
            <Divider />
            {/* Menampilkan judul dalam bahasa Jepang dan bahasa Inggris */}
            <List disablePadding>
                <ListItem>
                    <ListItemText primary="Japanese" secondary={data.data.title_japanese} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="English" secondary={data.data.title_english} />
                </ListItem>
            </List>

            {/* Information Section */}
            <Typography variant="h6">Descriptions</Typography>
            <Divider />
            {/* Menampilkan informasi menggunakan List */}
            <List dense disablePadding>
                <ListItem>
                    <ListItemText primary="Episodes" secondary={data.data.episodes} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Status" secondary={data.data.status} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Aired" secondary={data.data.aired.string} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Duration" secondary={data.data.duration} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Rating" secondary={data.data.rating} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Score" secondary={`${data.data.score}/${data.data.scored_by}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Rank" secondary={data.data.rank} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Popularity" secondary={data.data.popularity} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Genres" secondary={data.data.genres.map((genre) => genre.name).join(", ")} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Demographics" secondary={data.data.demographics.map((demo) => demo.name).join(", ")} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Studios" secondary={data.data.studios.map((studio) => studio.name).join(", ")} />
                </ListItem>
            </List>
        </Box>
    );
}
