import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const CONTACTS_PER_PAGE = 3

export default function Pagination({page, setPage, totalPages}) {
  const pages = Array.from(Array(totalPages).keys())

  return (
    <div>
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          mx: 2,
          my: 1,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
      <Box
        className="Pagination-laptopUp"
        sx={{
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
          mx: 4,
          my: 2,
        }}
      >
        <Box sx={{ flex: 1 }} />
        {pages.map((index) => (
          <IconButton
            key={index}
            size="sm"
            variant={index + 1 === page ? 'soft' : 'plain'}
            color="neutral"
            onClick={() => { setPage(index + 1) }}
          >
            {index + 1}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
      </Box>
    </div>
  );
}
