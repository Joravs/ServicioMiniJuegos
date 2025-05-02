import { useEffect, useState } from "react";
import {Button,Snackbar,Alert} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';

export default function UserTable(){
    const [users,setUsers] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleRowUpdate = async (nRow) => {
        const { id, nombre, nivel, xp, avatar } = nRow;
        const result = await apiFetch(`${APP__URL}/api/updateUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({ id, nombre, nivel, xp, avatar }),
        });
        if (result?.success) {
            setSnackbar({ open: true, message: 'Usuario actualizado.', severity: 'success' });
            return result.user;
        } else {
            setSnackbar({ open: true, message: result.message, severity: 'error' });
            throw new Error(result.message);
        }
    };
    
    const handleDelete = async (id) => {
        const result = await apiFetch(`${APP__URL}/api/deleteUser/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
            },
        });

        if (result?.success) {
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
            setSnackbar({ open: true, message: 'Usuario eliminado.', severity: 'success' });
        } else {
            console.error(result?.message || 'Error al eliminar el usuario');
        }
    };    

    const columnTable=[
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'nombre', headerName: 'Nombre Completo', width: 150, editable: true},
        {field: 'username', headerName: 'Username', width: 150},
        {field: 'nivel', headerName: 'Nivel', width: 150, editable: true},
        {field: 'xp', headerName: 'Experiencia', width: 150, editable: true},
        {field: 'avatar', headerName: 'Avatar', width: 150, editable: true},
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
        const json = await apiFetch(`${APP__URL}/api/allUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
        });
        setUsers(json?.games || []);
    };
    
    useEffect(()=>{
        getData()
    },[])

    return (
        <>
        <DataGrid rows={users} columns={columnTable}
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