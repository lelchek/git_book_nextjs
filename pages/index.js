import { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import UsersListItem from "../components/UsersListItem";
// import classes from "../styles/Users.module.css";

import { getUsersList } from "../services/api";
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "70vw",
  },
}));

export default function Users({ users: serverUsers }) {
  const classes = useStyles();
  const [usersList, setUsersList] = useState(serverUsers);

  useEffect(() => {
    async function load() {
      const response = await getUsersList();
      setUsersList(response);
    }

    if (!serverUsers) {
      load();
    }
  }, []);

  return (
    <List className={classes.container}>
      {usersList.map((item, index) => (
        <UsersListItem
          key={item.id}
          login={item.login}
          avatarUrl={item.avatar_url}
          htmlUrl={item.html_url}
          index={index}
        />
      ))}
    </List>
  );
}

export async function getStaticProps() {
  const users = await getUsersList();

  if (!users) {
    return {
      notFound: true,
    };
  }

  return {
    props: { users },
  };
}
