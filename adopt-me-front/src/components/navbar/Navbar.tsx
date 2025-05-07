import {AppBar, Stack, Toolbar, Typography} from "@mui/material";
import {Error, Home, Person, Quiz} from "@mui/icons-material";
import {Link} from "react-router-dom";

export const Navbar = () => {

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                    AdoptMe
                </Typography>
                <Stack spacing={2} direction="row">
                    <Link color="inherit" to="/">
                        <Home />
                    </Link>
                    <Link color="inherit" to="/profile">
                        <Person />
                    </Link>
                    <Link color="inherit" to="/quiz">
                        <Quiz />
                    </Link>
                    <Link color="inherit" to="/notification-errors">
                        <Error />
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}