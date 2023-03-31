import { ButtonGroup, Grid } from "@mui/material";
import Button from "@mui/material/Button";

function App() {
  return (
    <Grid container justifyContent="center">
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>
    </Grid>
  );
}

export default App;
