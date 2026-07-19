import {
    Grid,
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  
  const cards = [
    {
      title: "Opening Balance",
      value: 1200,
    },
    {
      title: "Closing Balance",
      value: 1085,
    },
    {
      title: "Net Movement",
      value: 240,
    },
    {
      title: "Purchases",
      value: 18,
    },
    {
      title: "Transfers",
      value: 7,
    },
    {
      title: "Assignments",
      value: 42,
    },
  ];
  
  export default function Dashboard() {
    return (
      <>
        <Typography
          variant="h4"
          gutterBottom
        >
          Dashboard
        </Typography>
  
        <Grid container spacing={3}>
  
          {cards.map((card) => (
  
            <Grid
              item
              xs={12}
              md={4}
              key={card.title}
            >
  
              <Card>
  
                <CardContent>
  
                  <Typography color="text.secondary">
                    {card.title}
                  </Typography>
  
                  <Typography variant="h4">
                    {card.value}
                  </Typography>
  
                </CardContent>
  
              </Card>
  
            </Grid>
  
          ))}
  
        </Grid>
      </>
    );
  }