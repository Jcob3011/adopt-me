import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useTheme} from "@mui/material/styles";
import classes from "./AddHealthButton.module.css";

interface AddAnimalButtonProps {
    handleClick: () => void
}

export const AddAnimalButton = ({handleClick}: AddAnimalButtonProps) => {
    const theme = useTheme()
    // return <Button
    //     className={classes.AddHealthButton}
    //     sx={{
    //         backgroundColor: `${theme.palette.createAnimal.button.background} !important`,
    //         border: `1px solid ${theme.palette.createAnimal.button.border} !important`
    //     }}
    //     onClick={handleClick}>
    //     <AddIcon className={classes.AddAnswerIcon}/>
    // </Button>
}