// import * as React from 'react';
// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";

export default function ProductImageCreate(){

    return(
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="imageid"
                    label={"Image ID"}
                />
                <TextField
                    id="productid"
                    label={"Product ID"}
                />
                <TextField
                    id="image"
                    label={"Image"}
                />
                <div>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{ width: 250, height: 56, margin: 2}}
                        >
                            Create product image
                        </Button>
                    </Box>
                </div>
            </div>
        </Box>
    );
}