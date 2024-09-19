import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function CSSGrid() {
  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ display: 'grid', gap: 1 }}>
        <Box sx={{ gridColumn: 'span 8' }}>
          <Grid container direction="column" sx={{ justifyContent: 'center' }}>
            <Paper
              sx={(theme) => ({
                height: 350,
                width: 450,
                backgroundColor: '#fff',
                marginBottom: theme.spacing(2), // Add margin to create space
                ...theme.applyStyles('light', {
                  backgroundColor: '#1A2027',
                }),
              })}
            />

            <Grid container spacing={1} sx={}>
              {[0, 1, 2].map((value) => (
                <Grid key={value} item>
                  <Paper
                    sx={(theme) => ({
                      height: 150,
                      width: 145,
                      backgroundColor: '#fff',
                      ...theme.applyStyles('light', {
                        backgroundColor: '#1A2027',
                      }),
                    })}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
