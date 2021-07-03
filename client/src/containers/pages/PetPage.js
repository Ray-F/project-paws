import React, { useEffect, useState } from 'react';


import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';

import petVideo from '../../resources/pet.mp4';

import LogoImage from '../../components/LogoImage';
import LogOut from '../../components/LogOut';
import styled from 'styled-components';
import { getColorForPercentage } from '../../util/Colour';
import Tokens from '../../components/Tokens';
import Strip from '../../components/Strip';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'red',
  },
  appBar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  marketButton: {
    marginRight: theme.spacing(2),
  },
  strip: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '20px',
    borderStyle: 'solid',
    borderColor: '#7289DA',
    backgroundColor: '#7289DA',
  },

  petVideo: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  bottomOptions: {
    color: 'white',
    textAlign: 'center',
    margin: '0 auto',
    position: 'fixed',
    width: 1000,
    maxWidth: '100%',
    bottom: 100,
    left: '50%',
    transform: 'translateX(-50%)',
  },

  optionButton: {
    color: '#FFFFFF',
    border: '4px solid #7289DA',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    margin: 40,
    marginTop: 40,

    width: 140,
  },

  batteryPct: {
    position: 'relative',
    top: -10,
    left: -85,
    marginBottom: 10,
  },
}));

const StyledBattery = styled(LinearProgress)`
  border-radius: 10px;
  height: 40px;
  width: 200px;
  margin-bottom: 20px;

  position: relative;
  left: 50%;
  transform: translateX(-50%);

  &.MuiLinearProgress-root {
    overflow: hidden;
    background-color: #ffffff;
  }

  .MuiLinearProgress-bar {
    background-color: ${(props) => getColorForPercentage(props.level / 100)};
  }
`;

const TopBox = styled(Box)`
  position: absolute;
  left: 50%;
  top: 150px;
  transform: translateX(-50%);
  color: white;
`;

export default function IndexPage() {
  const [pet, setPet] = useState({});

  const mockPet = {
    name: 'Ollie',
    energyLevel: 10,
  };

  useEffect(() => {
    setPet(mockPet);

    // fetch("/api/pet", { method: "GET" })
    // .then(async (res) => {
    //   let resObject = await res.json();
    //
    // });
  }, []);

  const classes = useStyles();

  const openMarket = () => {
    window.location = '/market';
  };

  const clickFeed = () => {
    setPet({ ...pet, energyLevel: Math.min(pet.energyLevel + 10, 100) });
  };

  return (
    <div className={classes.bg}>
      <Tokens nTokens={56} />
      <div className={classes.appBar}>
        <AppBar position="static" style={{ backgroundColor: '#2C2F33' }}>
          <LogoImage />
        </AppBar>
      </div>

      <div>
        <LogOut></LogOut>
      </div>

      <TopBox>
        <Typography variant={'h4'}>{pet.name}</Typography>
      </TopBox>

      <video
        className={classes.petVideo}
        autoPlay={true}
        muted={true}
        width={350}
        height={350}
        loop={true}
      >
        <source src={petVideo} type={'video/mp4'} />
      </video>

      <Box className={classes.bottomOptions}>
        {pet.name ? (
          <Grid container>
            <Grid item xs={4}>
              <Button className={classes.optionButton} onClick={clickFeed}>
                <b>Feed Me</b>
              </Button>
            </Grid>

            <Grid item xs={4}>
              <StyledBattery
                level={pet.energyLevel}
                className={classes.battery}
                variant="determinate"
                value={pet.energyLevel}
              />
              <Typography variant={'body2'} className={classes.batteryPct}>
                {pet.energyLevel}%
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Button
                className={classes.optionButton}
                onClick={() => (window.location = '/market')}
              >
                <b>Market</b>
              </Button>
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Box>

      <Strip />
    </div>
  );
}
