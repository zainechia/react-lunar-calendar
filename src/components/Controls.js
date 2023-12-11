import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'
import { Stack, IconButton, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'

function Controls(prop) {
  return (
    <Stack 
      direction='row' 
      alignItems='center'
      justifyContent='space-between'
      padding='0.5em 1em'
      borderBottom='1px solid rgba(0,0,0,0.12)'
    >
      
      <Stack direction='row'>
        <IconButton 
          size='small' 
          color='primary' 
          onClick={() => prop.changeMonth('subtract')}>
          <ArrowBackIos />
        </IconButton>

        <IconButton 
          size='small' 
          color='primary'
          onClick={() => prop.changeMonth('add')}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      
      <Typography>{prop.date.format('MMMM, YYYY')}</Typography>
    
    </Stack>
  )
}

export default Controls