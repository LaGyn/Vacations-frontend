import { useState } from "react"
import { VacationRequest } from "../types"
import requestService from "../services/vacRequests";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface RemoveRequestProps {
    request: VacationRequest;
}

const RemoveRequest = ({ request }: RemoveRequestProps) => {
    const [ requests, setRequests ] = useState<VacationRequest[]>([])

    const remove = (id: number) => {
        console.log(`this is to be deleted: ${request.id}`);
        requestService
            .remove(request.id)
            .then(() => {
                setRequests(requests.filter(request => request.id !== id));
                location.reload()
            })
    }
    return (
        <>
        <IconButton
            onClick={()=>remove(request.id)}
            aria-label="delete"
            size="large"
            >
            <DeleteIcon fontSize="medium"/>
        </IconButton>
        </>
    )
};

export default RemoveRequest;