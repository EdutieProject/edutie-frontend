import React from 'react';
import { Box, Card, CardContent, Typography, CardHeader, Container } from '@mui/material';

function ExcerciseView() {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#EFF7FF', height: '100vh', paddingTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Edu.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Card sx={{ flex: 1, backgroundColor: '#EFF7FF' }}>
          <CardHeader
            title="Zadanie x"
            sx={{ backgroundColor: 'black', color: 'white' }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet egestas velit. Vestibulum elementum mi eget metus viverra sagittis. Cras sit amet lorem nec quam malesuada blandit. In vel leo et dolor porttitor interdum. Aenean a urna quis sapien egestas rhoncus. Integer vulputate porta diam, et gravida mi imperdiet vitae. Ut tempus urna finibus sapien aliquet lobortis. Nam sit amet maximus ex eget elementum sed maximus ut est. Integer non tortor nec orci luctus tempus sed eu ligula. Vivamus sed pretium ante, non consectetur urna.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, backgroundColor: '#EFF7FF' }}>
          <CardHeader
            title="Twoje sprawozdanie"
            sx={{ backgroundColor: 'black', color: 'white' }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {/* Content for "Twoje sprawozdanie" */}
            </Typography>
            <Card sx={{ marginTop: 2 }}>
              <CardHeader
                title="Podpowiedzi dla ucznia"
                sx={{ backgroundColor: '#D9EAD3' }}
              />
              <CardContent>
                {/* Content for "Podpowiedzi dla ucznia" */}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ExcerciseView;