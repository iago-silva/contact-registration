import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Star from '@mui/icons-material/Star';
import { Box } from '@mui/joy';

export default function RentalCard({contact, onClick}) {
  // const [isLiked, setIsLiked] = React.useState(liked);
  const position = {lat: parseFloat(contact.latitude), lng: parseFloat(contact.longitude)}

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      onClick={() => { onClick() }}
      sx={{
        bgcolor: 'neutral.softBg',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        '&:hover': {
          boxShadow: 'lg',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
          mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
          '--AspectRatio-radius': {
            xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
            sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
          },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
          }}
        >
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <img alt="" style={{maxHeight: '100px', maxWidth: '100px'}} src={"https://cdn.icon-icons.com/icons2/1509/PNG/512/contactnew_104150.png"} />
          </Box>
         
        </AspectRatio>
      </CardOverflow>
      <CardContent>
            <Typography textAlign={"start"} level="body-sm">{contact.name}</Typography>
            <Typography textAlign={"start"} level="body-sm">{contact.cpf}</Typography>
            <Typography textAlign={"start"} level="body-sm">{contact.phone}</Typography>
            <Typography  textAlign={"start"}level="title-md">
              <Link
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: 'text.primary' }}
              >
                {`${contact?.address.street}, ${contact?.address.number}, ${contact?.address.neighborhood}, ${contact.address.city}-${contact.address.state}`}
              </Link>
            </Typography>
      </CardContent>
    </Card>
  );
}
