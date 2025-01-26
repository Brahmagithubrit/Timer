import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useState, useRef } from "react";

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [sec, setSec] = useState(0);
  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); 

  const handleStart = () => {
    setStart(true);
    setPaused(false); // Reset paused state when starting
    intervalRef.current = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec + 1 === 60) {
          setMinute((prevMinute) => {
            if (prevMinute + 1 === 60) {
              setHour((prevHour) => prevHour + 1);
              return 0;
            }
            return prevMinute + 1;
          });
          return 0;
        }
        return prevSec + 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setPaused(true);
  };

  const handleResume = () => {
    if (paused) {
      handleStart();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      {!start ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              fullWidth
              label="Hours"
              variant="outlined"
              size="small"
              onChange={(e) => setHour(parseInt(e.target.value) || 0)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              fullWidth
              label="Minutes"
              variant="outlined"
              size="small"
              onChange={(e) => setMinute(parseInt(e.target.value) || 0)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              fullWidth
              label="Seconds"
              variant="outlined"
              size="small"
              onChange={(e) => setSec(parseInt(e.target.value) || 0)}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              size="large"
              sx={{ minWidth: "100%" }}
            >
              Start
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              color: "#1976d2",
              fontWeight: "bold",
              marginBottom: 3,
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            Every hour you invest today brings you one step closer to the future you dream of—keep pushing, the effort will pay off.
          </Typography>
          <Typography
            variant="h2"
            component="div"
            sx={{
              fontSize: { xs: "3rem", sm: "5rem" },
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}:
            {String(sec).padStart(2, "0")}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handlePause}
              sx={{ marginRight: 2 }}
            >
              Pause
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleResume}
            >
              Resume
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default App;
