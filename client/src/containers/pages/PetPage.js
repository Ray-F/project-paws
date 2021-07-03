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
  const [coins, setCoins] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch("/api/pet", { method: "GET" })
      .then(async (res) => {
        let resObject = await res.json();
        
        setCoins(resObject.coins);
        setHealth(resObject.hp);
        console.log(resObject);

      });
  }, []);

  const classes = useStyles();

  const openMarket = () => {
    window.location = '/market';
  };

  const clickFeed = () => {
    if (health === 100) {
      return;
    }

    if (coins < 5) {
      alert("lmao broke boi");
      return;
    }

    const newHealth = Math.min(health + 10, 100);
    const newCoins = coins - 5;

    setHealth(newHealth)
    setCoins(newCoins);

    // TODO: Post request to adjust coin

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coin: newCoins,
        hp: newHealth
      }),
    }

    fetch('/api/pet', options)
      .then((res) => {
        console.log(res)
      });
  };

  return (
    <div className={classes.bg}>
      <Tokens nTokens={coins === null ? "-" : coins} />
      <div className={classes.appBar}>
        <AppBar position="static" style={{ backgroundColor: '#2C2F33' }}>
          <LogoImage />
        </AppBar>
      </div>

      <div>
        <LogOut></LogOut>
      </div>

      <TopBox>
        <Typography variant={'h4'}>Einstein</Typography>
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
        {coins !== null ? (
          <Grid container>
            <Grid item xs={4}>
              <Button className={classes.optionButton} onClick={clickFeed}>
                <b>Feed Me</b>
              </Button>
            </Grid>

            <Grid item xs={4}>
              <StyledBattery
                level={health}
                className={classes.battery}
                variant="determinate"
                value={health}
              />
              <Typography variant={'body2'} className={classes.batteryPct}>
                {health} HP
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
