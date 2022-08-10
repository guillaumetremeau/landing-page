import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={3}
      >
        <Avatar
          alt="Guillaume Tremeau"
          src="/guillaume.jpg"
          sx={{ width: 76, height: 76 }}
          mb={2}
        />
        <Typography variant="h5" align="center" mb={2}>
          Code with Guillaume
        </Typography>
        <Typography align="center" mb={2}>
          Hi! I'm Guillaume Tremeau, a freelance web developer and passionate
          photographer.
        </Typography>
        <Box
          sx={{
            typography: "body1",
            "& > :not(style) + :not(style)": {
              ml: 2,
            },
          }}
          mb={2}
        >
          <Link
            href="https://www.linkedin.com/in/guillaumetremeau/"
            underline="none"
          >
            <LinkedInIcon />
          </Link>
          <Link href="https://github.com/guillaumetremeau" underline="none">
            <GitHubIcon />
          </Link>
        </Box>
        <Button
          variant="outlined"
          href="https://guillaumetremeau.com"
          fullWidth
        >
          Check my photos!
        </Button>
        <Typography variant="h6" mt={3}>
          What I recently worked on?
        </Typography>
        <Button
          variant="outlined"
          href="https://camilleetflorent.guillaumetremeau.me"
          fullWidth
          sx={{
            mb: 1,
          }}
        >
          Mariage Camille & Florent
        </Button>
        <Button
          variant="outlined"
          href="https://black-jack.guillaumetremeau.me"
          fullWidth
          sx={{
            mb: 1,
          }}
        >
          Black Jack game
        </Button>
        <Box mt={3} typography="subtitle2">
          <Link underline="none" href="tel:+330770818649">
            +33 (0) 7 70 81 86 49
          </Link>
        </Box>
        <Box mt={1} typography="subtitle2">
          <Link underline="none" href="mailto:tremeauguillaume@gmail.com">
            tremeauguillaume@gmail.com
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
