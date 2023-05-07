import { IconButton, Paper, TableCell } from "@mui/material";
import { useState } from "react";
import renderVacationType from "./vacationType";
import DeleteIcon from "@mui/icons-material/Delete";

const ApplyForVacation = () => {
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [newComment, setNewComment] = useState('');

    const apply = () => {
        console.log(newStartDate);
    }
    const deleteRequest = () => {
        console.log('poistetaan');
    }
    return (
        <Paper>
            <form onSubmit={apply}>
                Start date:  
                <input
                    type="date"
                    value={newStartDate}
                    onChange={(event) => setNewStartDate(event.target.value)} 
                />
                End date:  
                <input
                    type="date"
                    value={newEndDate}
                    onChange={(event) => setNewEndDate(event.target.value)} 
                />
                Leave a Comment:  
                <input
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)} 
                />
                { renderVacationType() }
                <br/>
                <button type='submit'>Apply</button>
                <TableCell>
                    <IconButton
                    onClick={ deleteRequest }
                    aria-label="delete"
                    size="large"
                    >
                    <DeleteIcon fontSize="medium"/>
                    </IconButton>
                </TableCell>
            </form>
        </Paper>
    )
};

export default ApplyForVacation;