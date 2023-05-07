import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { VacationType } from "../types";

const renderVacationType = () => {
    const [ vacationType, setVacationType ] = useState<VacationType | string>();

    const handleVacationTypeChange = (event: SelectChangeEvent) => {
        const contentValue = event.target.value;
        setVacationType(contentValue);
      };
    
    return (
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
            onChange={ handleVacationTypeChange }
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
    )
};

export default renderVacationType;