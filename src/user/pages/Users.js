import React from "react";
import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Rafael",
      image:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.infinance.com.br%2Fimages%2Fcomofunciona%2Fusuarios.png&imgrefurl=https%3A%2F%2Fwww.infinance.com.br%2Fusuarios.php&tbnid=vVPHtrLdGYDQuM&vet=12ahUKEwie-oyNoKX7AhXoNrkGHZhqAKcQMygJegUIARDQAQ..i&docid=t4CQJmDpyFWOGM&w=200&h=195&q=usu%C3%A1rios&ved=2ahUKEwie-oyNoKX7AhXoNrkGHZhqAKcQMygJegUIARDQAQ",
      places: 3,  
    },
  ];
  return <UserList items={USERS} />;
};

export default Users;
