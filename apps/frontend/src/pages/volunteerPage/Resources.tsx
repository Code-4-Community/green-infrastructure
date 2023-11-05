import { Box, Grid, ThemeProvider } from '@mui/material';
import { VolunteerResource, VOLUNTEER_RESOURCES } from './volunteerResources';
import CircleIcon from '@mui/icons-material/Circle';

export default function Resources() {
  const title = {
    color: 'var(--Text-Primary, #091F2F)',
    fontFamily: 'Helvetica',
    fontSize: '27px',
    fontStyle: 'bold',
    fontWeight: 'bold',
    lineHeight: 'normal',
    textDecorationLine: 'underline',
    margin: '0',
  };

  const headings = {
    color: 'var(--Text-Second, #288BE4)',
    fontFamily: 'Lora',
    fontSize: '25px',
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 'normal',
    margin: '0',
  };

  const content = {
    color: 'var(--text-primary-2, #58585B)',
    fontFamily: 'Lora',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: '34px 45px 49px 45px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '15px',
        flexShrink: '0',
        background: 'white',
      }}
    >
      <p style={title}>
        <u>FEATURED RESOURCES &rarr;</u>
      </p>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {VOLUNTEER_RESOURCES.map((resource: VolunteerResource) => {
          return (
            <Grid xs={4} item>
              <BoxPanel textContent={resource.resourceName} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

interface PanelProps {
  textContent: string;
}
function BoxPanel(props: PanelProps) {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#F2F2F2',
            dark: '#B1F1F1',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '330px',
          height: '253px',
          marginTop: '28px',
          marginBottom: '49px',
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircleIcon
          sx={{
            width: '100px',
            height: '100px',
            marginTop: '48px',
            marginBottom: '24px',
            color: '#FFFDFD',
          }}
        />
        <span
          style={{
            color: '#288BE4',
            fontSize: '20px',
            fontStyle: 'italic',
            marginBottom: '50px',
          }}
        >
          {props.textContent}
        </span>
      </Box>
    </ThemeProvider>
  );
}
