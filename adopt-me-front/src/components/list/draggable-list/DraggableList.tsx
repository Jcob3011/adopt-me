import Paper from "@mui/material/Paper";
import {DragDropContext, Droppable, DropResult, ResponderProvided} from "react-beautiful-dnd";
import {Box, Divider, Typography} from "@mui/material";
import {ReactNode} from "react";
import classes from "./DraggableList.module.css"
import {useTheme} from "@mui/material/styles";

type Props = {
    children: ReactNode
    onDragEnd: (result: DropResult, provided: ResponderProvided) => void
    droppableId: string
    title: string
}

export const DraggableList = <T,>({children, onDragEnd, droppableId, title}: Props) => {
    const theme = useTheme()
    return (
        <Paper className={classes.paper} sx={{
            backgroundColor: `${theme.palette.paper.secondary} !important`
        }}>
            <Box className={classes.textBox}>
                <Typography className={classes.titleText}>
                    {title}
                </Typography>
            </Box>
            <Divider/>
            <DragDropContext onDragEnd={(result, provided) => onDragEnd(result, provided)}>
                <Droppable droppableId={droppableId} >
                    {provided => (
                        <Box className={classes.droppableBox}
                             ref={provided.innerRef}
                             {...provided.droppableProps}>
                            {children}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Paper>
    )
}