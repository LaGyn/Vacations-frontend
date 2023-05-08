import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { VacationRequest, VacationRequestStatus, VacationType } from "../types";

interface Props {
    createRequest: (values: VacationRequest) => void;
}

const ApplyForVacation = ({ createRequest }: Props) => {
    const [ newStartDate, setNewStartDate ] = useState('');
    const [ newEndDate, setNewEndDate ] = useState('');
    const [ newComment, setNewComment ] = useState('');
    const [ vacationType, setVacationType ] = useState<VacationType>(VacationType.VACATION);

    const handleVacationTypeChange = (value: VacationType) => {
        //const contentValue = event.target.value;
        setVacationType(value);
    };

    const apply = (event: SyntheticEvent) => {
        event.preventDefault()
        createRequest({
            id: Math.floor(Math.random() * 5000),
            startDate: newStartDate,
            endDate: newEndDate,
            message: newComment,
            type: vacationType,
            person: "234354",
            created: "01.05.2023",
            status: VacationRequestStatus.PENDING
        })
        console.log(newStartDate, newEndDate, newComment, vacationType);
    }
   
    return (
        <Box>
            <form onSubmit={apply}>
                Start date:  
                <input
                    type="date"
                    value={newStartDate}
                    onChange={({target}) => setNewStartDate(target.value)} 
                />
                End date:  
                <input
                    type="date"
                    value={newEndDate}
                    onChange={({target}) => setNewEndDate(target.value)} 
                />
                Leave a Comment:  
                <input
                value={newComment}
                onChange={({target}) => setNewComment(target.value)} 
                />
                <FormControl
                    variant="standard"
                    sx={{
                    margin: 1,
                    minWidth: 165,
                    marginBottom: 4
                    }}
                >
                    <InputLabel>Vacation type</InputLabel>
                    <Select
                    value={ vacationType }
                    onChange={() => handleVacationTypeChange }
                    label={ "Vacation type" }
                    >
                    <MenuItem value={ VacationType.VACATION }>Vacation</MenuItem>
                    <MenuItem value={ VacationType.UNPAID_TIME_OFF}>Unpaid time off</MenuItem>
                    <MenuItem value={ VacationType.SICKNESS}>Sickness</MenuItem>
                    <MenuItem value={ VacationType.PERSONAL_DAYS }>Personal days</MenuItem>
                    <MenuItem value={ VacationType.MATERNITY_PATERNITY }>Maternity/paternity</MenuItem>
                    <MenuItem value={ VacationType.CHILD_SICKNESS }>Child sickness</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <button type='submit'>Apply</button>
            </form>
        </Box>
    )
};

export default ApplyForVacation;