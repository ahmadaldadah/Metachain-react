import React, { useState, useEffect } from "react";
import UserList from "./component/UserList";
import AddUser from "./component/AddUser";
import axios from "axios";
import "./App.css"
const App = () => {
  const [user, setUser] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [editData, setEditData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const toggle = () => {
      setIsAdd(!isAdd)
  }
  const toggleEdit = () => {
        setIsEdit(!isEdit)
  }
  const create = (users) => {
    if (!users.isEdit) {
      console.log("create from api");
      console.log(user);
      axios
          .post("https://test.helpmytoken.com/api/users", {
              id: users.id,
              username: users.username,
              first_name: users.first_name,
              last_name: users.first_name,
              email: users.email,
              password: users.password,
              avatar: users.avatar,
          })
          .then((res) => {
            getAll();
          });
    } else {
      console.log("update from api");
      console.log(users.id);
      axios
          .put(
              `https://test.helpmytoken.com/api/users/${users.id}`,
              {
                  id: users.id,
                  username: users.username,
                  first_name: users.first_name,
                  last_name: users.last_name,
                  email: users.email,
                  password: users.password,
                  avatar: users.avatar,
              }
          )
          .then((res) => {
            getAll();
          });
    }
  };
  useEffect(() => {
    getAll();
  });
  const getAll = () => {
    axios
        .get("https://test.helpmytoken.com/api/users")
        .then((res) => {
            setUser(res.data.payload)

        });
  };

  const update = (user) => {
    setEditData(user);
      toggle(user);
  };
  const del = (users) => {
    console.log(users.id);
    const option = window.confirm(`are you want to delete ${user.username}`);
      const headers = {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': "mkTF7lcI4BVl42lJcFzqNbfeVvoVfLSH7e01kznsEQLYFEoWdchL0tuKZ5HeGnOa",
      }
    if (option) {
        console.log(option)

        axios
          .delete( `https://test.helpmytoken.com/api/users/${users.id}`)
          .then((res) => {
            console.log(res);
            getAll();
          });
    }
  };
  return (
      <div className="container">
          <header className="header">
              <div>
                  <img src="/bars-solid.svg" alt=" logo" className="logo ms me"/>

                  <img src="/image-regular.svg" alt=" logo" className="logo"/>

              </div>


              <div className="content">
                  <div>
                    <h4>
                        RENEE
                    </h4>
                      <span>
                          Account
                      </span>
                  </div>
                  <img src="/circle-user-regular.svg" alt=" logo" className="logo"/>
              </div>
          </header>
          <div className="content">
              <nav className="sidebar">
                  <ul className="side-nav">
                      <li className="legal">
                          <img src="/magnifying-glass-solid.svg" alt=" logo" className="logo"/>

                      </li>
                      <li className="legal">
                          <img src="/house-solid.svg" alt=" logo" className="logo"/>

                      </li>
                      <li className="legal">
                          <img src="/gear-solid.svg" alt=" logo" className="logo"/>

                      </li>
                      <li className="legal">
                          <img src="/circle-user-regular.svg" alt=" logo" className="logo"/>

                      </li>
                  </ul>

              </nav>
              {
                  isAdd ?  <div className="hotel-view">
                      <AddUser myData={create} toggle={toggle} setForm={editData}/>
                  </div> :
                      <div className="action">
                          <UserList getData={user} setUser={setUser}  toggle={toggle} setData={update} del={del} />
                      </div>
              }

          </div>
          </div>
  );
};

export default App;