import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import { TiPen } from "react-icons/ti";
import RecipeDetails from "../components/RecipeDetails";
import RecipeDescription from "../components/RecipeDescription";
import RecipeEditModal from "../components/RecipeEditModal";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SingleRecipeCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="3%"
    >
      <Card sx={{ maxWidth: "sm", bgcolor: "darkgrey" }}>
        <CardHeader title="Shrimp and Chorizo Paella" />
        <CardMedia
          component="img"
          image={require("../assets/no-image.jpg")}
          alt="no image"
          sx={{ width: "100%", height: "50%" }}
        />
        <RecipeDescription />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <RecipeEditModal />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <RecipeDetails />
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
