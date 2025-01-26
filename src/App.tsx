import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [sec, setSec] = useState(0);
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
    setInterval(() => {
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
          }}
        >
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
        </Box>
      )}
    </Container>
  );
}

export default App;
