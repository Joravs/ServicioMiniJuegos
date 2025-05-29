import { useEffect, useState } from "react";
import {Button,Snackbar,Alert} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';
import apiFetch from '@/hooks/apiFetch';

export default function GamesTable(){
    const [games,setGames] = useState([])
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleRowUpdate = async (nRow) => {
        const { id, nombre, info, tipo } = nRow;
        const result = await apiFetch(`${APP__URL}/api/updateGame`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({ id, nombre, info, tipo }),
        });

        if (result?.success) {
            setSnackbar({ open: true, message: 'Juego actualizado.', severity: 'success' });
            return result.game;
        } else {
            setSnackbar({ open: true, message: result.message, severity: 'error' });
            throw new Error(result.message);
        }
    };    

    const handleDelete = async (id) => {
        const result = await apiFetch(`${APP__URL}/api/deleteGame/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
            },
        });

        if (result?.success) {
            setGames((prevGames) => prevGames.filter(game => game.id !== id));
            setSnackbar({ open: true, message: 'Juego eliminado.', severity: 'success' });
        } else {
            console.error(result?.message || 'Error al eliminar el juego');
        }
    };
    
    const columnTable=[
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'nombre', headerName: 'Nombre', width: 150, editable: true},
        {field: 'info', headerName: 'Info', width: 150, editable: true},
        {
            field: 'tipo',
            headerName: 'Tipo',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Tiempo', 'Puntos'],
        },
        {field: 'eliminar', headerName: 'Eliminar', width: 150, 
            renderCell: (params)=>(
                <Button
                    variant="contained"
                    onClick={()=>handleDelete(params.row.id)}
                >
                    Eliminar
                </Button>
            )
        },
    ]
    const getData = async () => {
        const json = await apiFetch(`${APP__URL}/api/index`);

        setGames(json?.games || []);
    };    
    useEffect(()=>{
        getData()
    },[])

    return (
        <>
        <DataGrid rows={games} columns={columnTable} pageSize={10}
            processRowUpdate={handleRowUpdate}
            onProcessRowUpdateError={(error) => {
                setSnackbar({ open: true, message: error.message, severity: 'error' });
            }}
            experimentalFeatures={{ newEditingApi: true }}
            autoHeight
            sx={{
                backgroundColor: '#514559', 
                '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#514559',
                color: '#21BFAF',
                fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                color: '#21BFAF',
                },
                '& .MuiDataGrid-row:hover': {
                backgroundColor: '#55495F',
                },
            }} />
        <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
            </Alert>
        </Snackbar>
        </>
    )
}