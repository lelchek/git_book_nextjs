import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import classes from "../../styles/UserInfo.module.css";

import { getUserInfo } from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    display: "flex",
    width: "60vw",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  descr: {
    marginBottom: theme.spacing(1),
  },
  largeAvatar: {
    width: theme.spacing(24),
    height: theme.spacing(24),
  },
}));

export default function UserInfo({ userInfo: serverUserInfo }) {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState(serverUserInfo);
  const router = useRouter();
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Avatar
            className={classes.largeAvatar}
            alt={`Avatar ${userInfo.login}`}
            src={userInfo.avatar_url}
          />
        </CardContent>
        <CardContent>
          <Typography className={classes.title} component="h3" variant="h3">
            {userInfo.name ? userInfo.name : userInfo.login}
          </Typography>
          {userInfo?.company && (
            <Typography className={classes.descr} component="h5" variant="h5">
              {userInfo.company}
            </Typography>
          )}
          <Typography
            className={classes.descr}
            variant="subtitle1"
            color="textSecondary"
          >
            <span>From </span>
            {userInfo.created_at}
            {/* <Moment format="DD/MM/YYYY">{userInfo.created_at}</Moment> */}
          </Typography>
          <Typography
            className={classes.descr}
            variant="subtitle1"
          >{`Public Repositories: ${userInfo.public_repos}`}</Typography>
          <Button variant="outlined" href={userInfo.html_url} target="_bank">
            Profile
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const userInfo = await getUserInfo(query.login);
  if (!userInfo) {
    return { notFound: true };
  }

  return { props: { userInfo } };
}
