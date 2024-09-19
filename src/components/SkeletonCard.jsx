import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const SkeletonCard = () => (
  <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
    <CardMedia>
      <Skeleton variant="rectangular" width={345} height={140} />
    </CardMedia>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        <Skeleton variant="text" width="80%" />
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        <Skeleton variant="text" width="100%" />
      </Typography>
    </CardContent>
    <Stack direction="row" spacing={1} sx={{ padding: 1 }}>
      <Skeleton variant="text" width={80} height={30} />
      <Skeleton variant="text" width={80} height={30} />
      <Skeleton variant="text" width={80} height={30} />
    </Stack>
  </Card>
);

export default SkeletonCard;
