import React, { useState } from "react";

function AddUser(props) {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [manager, setManager] = useState("");
    const [employee, setEmployee] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState(false);
    function handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Name
        if (!username) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }

        //Name
        if (!first_name) {
            formIsValid = false;
            errors["first_name"] = "Cannot be empty";
        }
        //Name
        if (!last_name) {
            formIsValid = false;
            errors["last_name"] = "Cannot be empty";
        }
        //Name
        if (!password) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        //Email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }else {
            if (typeof email !== "undefined") {
                let lastAtPos = email.lastIndexOf("@");
                let lastDotPos = email.lastIndexOf(".");

                if (
                    !(
                        lastAtPos < lastDotPos &&
                        lastAtPos > 0 &&
                        email.indexOf("@@") == -1 &&
                        lastDotPos > 2 &&
                        email.length - lastDotPos > 2
                    )
                ) {
                    formIsValid = false;
                    errors["email"] = "Email is not valid";
                }
            }

        }


        setErrors(errors);
        return formIsValid;
    }
    function Submit(e) {
        e.preventDefault();
        if (handleValidation()) {
            if (!isEdit) {
            let data = {
                isEdit: isEdit,
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                avatar: avatar,
            };
            props.myData(data);
            props.toggle();
            console.log("create from submit");
            console.log(data);
        } else {
            let data = {
                id:id,
                isEdit: isEdit,
                username: username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                avatar: avatar,
            };
            props.myData(data);
            props.toggle();
            console.log("edit from submit");
            console.log(data);
        }
        }

    }

    React.useEffect(() => {
        console.log('setForm')
        console.log(props.setForm)
        if (props.setForm.id != null) {
            setIsEdit(true);
            setId(props.setForm.id);
            setUsername(props.setForm.username);
            setFirstName(props.setForm.first_name);
            setLastName(props.setForm.last_name);
            setEmail(props.setForm.email);
            setPassword(props.setForm.password);
            setAvatar(props.setForm.avatar);
        }
    }, [props.setForm]);
    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    };
    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onChangeAvatar = (event) => {
        setAvatar(event.target.value);
    };
    const onChangeManager = (event) => {
        setManager(event.target.value);
    };
    const onChangeEmployee = (event) => {
        setEmployee(event.target.value);
    };
    return (
        <form
            onSubmit={(e) => Submit(e)}
        >

        <div className="detail">
            <div className="form">
                <div className="row">
                    <h1>New User Detail</h1>
                </div>
                <hr className="mb"/>

                    <div className="row mb">
                        <div className="col me">
                            <input type="text" className="form-control" placeholder="Enter UserName" name="username" onChange={onChangeUsername} value={username}/>
                            <span style={{ color: "red" , fontSize:"12px"}}>{errors["username"]}</span>

                        </div>
                        <div className="col">
                            <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={onChangePassword} value={password}/>
                            <span style={{ color: "red" , fontSize:"12px"}}>{errors["password"]}</span>

                        </div>
                    </div>
                    <div className="row mb">
                        <div className="col me">
                            <input type="text" className="form-control" placeholder="Enter First Name" name="firstName" onChange={onChangeFirstName} value={first_name}/>
                            <span style={{ color: "red" , fontSize:"12px"}}>{errors["first_name"]}</span>

                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Enter Last Name" name="lastName" onChange={onChangeLastName} value={last_name}/>
                            <span style={{ color: "red" , fontSize:"12px"}}>{errors["last_name"]}</span>

                        </div>
                    </div>
                    <div className="row mb">
                        <div className="col me">
                            <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={onChangeEmail} value={email}/>
                            <span style={{ color: "red" , fontSize:"12px"}}>{errors["email"]}</span>

                        </div>
                        <div className="col">

                            <input type="radio"  name="manager" className="me-1" id="manager" onChange={onChangeManager} value={manager}/>
                            <label htmlFor="manager" className="me">
                                Manager
                            </label>

                            <input type="radio"  name="employee" className="me-1" id="employee" onChange={onChangeEmployee} value={employee}/>
                            <label htmlFor="employee">
                                Employee
                            </label>
                        </div>

                    </div>
                <hr className="mb"/>
                <div className="row">
                    <button className="btn-user me" type="submit">{isEdit ? "Update" : "Create"}</button>
                    <button className="btn-user" onClick={props.toggle}>Cancel</button>
                </div>
            </div>
            <div className="photo">
                <div className="row">
                    <h1>Profile Picture</h1>
                </div>
                <div>
                    <hr className="mb"/>
                    <div className="row">
                        <input type="image" src="/image-regular.svg" alt="Submit" width="200" height="200" className="mb" onChange={onChangeAvatar}/>

                    </div>
                    <div className="row">
                        <button className="btn-user" type="button">Select Image</button>

                    </div>

                </div>
            </div>


        </div>

</form>
    );
}

export default AddUser;
