import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(() => ({
  cursor: {
    cursor: "pointer",
  },
}));

const UsersListItem = ({ login, avatarUrl, htmlUrl, index }) => {
  const classes = useStyles();

  const handleOpenUser = () => {
    // history.push(`/user/${login}`);
    console.log("click");
  };

  return (
    <>
      <ListItem>
        <Link href={`/user/[login]`} as={`/user/${login}`}>
          <ListItemAvatar className={classes.cursor}>
            <Avatar alt={`Avatar ${login}`} src={avatarUrl} />
          </ListItemAvatar>
        </Link>
        <Link href={`/user/[login]`} as={`/user/${login}`}>
          <ListItemText
            className={classes.cursor}
            primary={login}
            onClick={handleOpenUser}
          />
        </Link>

        <ListItemSecondaryAction>
          <Button variant="outlined" href={htmlUrl} target="_bank">
            Profile
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {index !== process.env.PAGE_LIMIT - 1 && (
        <Divider variant="inset" component="li" />
      )}
    </>
  );
};

export default UsersListItem;
