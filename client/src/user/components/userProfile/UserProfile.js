import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import { Button, Form, Image, Input, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../shared/store/slices/userSlice";
// import { axiosClient } from "../../../utils/axiosClient";
import { axiosClient } from "../../../shared/utils/axiosClient.js";
import { toast } from "react-toastify";
import Spinner from "../../../shared/templates/Spinner";

function UserProfile() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.userReducer.profile);
    const status = useSelector((state) => state.userReducer.profileStatus);
    const [count , setCount]= useState(1);

    const [Name, setName] = useState(data?.name);
    const [sem, setSem] = useState(data?.semester);
    const [clgName, setClgName] = useState(data?.clgName);
    const [image, setImage] = useState(data?.avatar?.url);

    // console.log("user data : ", data);

    useEffect(() => {
        dispatch(userProfile());
        setName(data.name);
        setClgName(data.clgName);
        setImage(data.avatar?.url);
        setSem(data.semester);
    }, [data.name]);

    if (status === "loading") {
        return <Spinner></Spinner>;
    }

    async function handleSubmit(key) {
        try {
            console.log(key);

            const response = await axiosClient.put("/user/updateUserProfile", {
                name: key.name,
                semester: key.semester,
                clgName: key.clgName,
                avatar: image,
            });

            toast.success("Profile Update SuccessFully", {
                position: "top-right",
            });
            setCount(count+1);
        } catch (e) {}
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setImage(fileReader.result);
                console.log("img data", fileReader.result);
            }
        };
    };

    return (
        <div className="userProfile-container">
            <div className="userProfile-subContainer">
                <div className="user-image">
                    <div className="profile-img">
                        {!image ? (
                            <input
                                className="inputImg"
                                id="inputImg"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        ) : (
                            <div className="user-profile-image-div">
                                <div className="user-profile-img">
                                    <Image
                                        width={200}
                                        height={200}
                                        className="image"
                                        // width={200}
                                        src={image}
                                    ></Image>
                                </div>
                                <label htmlFor="inputImg" className="input-label">Change</label>

                                <input
                                    className="inputImg"
                                    id="inputImg"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="user-details">
                    <Form name="userDetails" onFinish={handleSubmit} className="user-detail-form">
                        <Form.Item
                            className="input-wrapper"
                            label={
                                <Typography.Title level={3}>
                                    User Name 
                                </Typography.Title>
                            }
                            name="name"
                            initialValue={Name}
                        >
                            <Input
                                className="input"
                                placeholder={
                                    data.name
                                        ? data.name
                                        : "please input your userName"
                                }
                            ></Input>
                        </Form.Item>

                        <Form.Item
                            className="input-wrapper"
                            label={
                                <Typography.Title level={3}>
                                    Collage Name :
                                </Typography.Title>
                            }
                            name="clgName"
                            initialValue={clgName}
                        >
                            <Input
                                className="input"
                                placeholder={
                                    data.clgName
                                        ? data.clgName
                                        : "please input your collage Name"
                                }
                            ></Input>
                        </Form.Item>

                        <Form.Item
                            // className="input"
                            name="clgYear"
                            className="input-wrapper"
                            label={
                                <Typography.Title level={3}>
                                    Collage year :
                                </Typography.Title>
                            }
                            initialValue={sem}
                        >
                            <Input
                                className="input"
                                placeholder={
                                    data.semester
                                        ? data.semester
                                        : "please input your semester"
                                }
                            ></Input>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="sumit">
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
