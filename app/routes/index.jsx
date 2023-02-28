import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Typography,
  SvgIcon,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import stylesUrl from "~/styles/index.css";

export const links = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

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
          <Link
            href="https://profile.codersrank.io/user/guillaumetremeau/"
            underline="none"
          >
            <SvgIcon inheritViewBox>
              <path
                d="M23.134 8.64l-5.973-3.62a.286.286 0 0 0-.412.125l-1.4 3.286 2.842 1.696a.53.53 0 0 1 0 .921l-5.335 3.14-2.267 5.274a.127.127 0 0 0 .052.203.122.122 0 0 0 .134-.035l3.914-2.365 1.545 2.219a.373.373 0 0 0 .309.167h3.708a.367.367 0 0 0 .327-.2.382.382 0 0 0-.018-.386l-2.513-3.852 5.088-3.077c.577-.349.865-.74.865-1.172V9.813c0-.433-.288-.823-.866-1.172zM13.082 4.35L.845 12.052c-.577.348-.858.739-.845 1.171v1.173c.014.432.303.816.866 1.15l6.056 3.496a.286.286 0 0 0 .412-.146l1.36-3.286-2.884-1.633a.518.518 0 0 1-.275-.384.529.529 0 0 1 .254-.537l5.295-3.245 2.183-5.316a.128.128 0 0 0-.04-.142.122.122 0 0 0-.146-.005z"
                fill="#2576d2"
              ></path>
            </SvgIcon>
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
        <Typography variant="h6" mt={3}>
          My Coding Activity & Stats
        </Typography>
        <codersrank-summary
          username="guillaumetremeau"
          show-header="false"
          branding="false"
        ></codersrank-summary>
        <codersrank-skills-chart username="guillaumetremeau"></codersrank-skills-chart>
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
