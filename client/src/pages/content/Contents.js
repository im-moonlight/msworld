import "./Content.scss";
import { RightOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Image, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSubjects,
    fetchTopics,
    fetchContents,
} from "../../store/slices/SubjectSlice";
import { Divider, Typography } from "antd";
import Card from "antd/es/card/Card";
import SuggestMenu from "./SuggestMenu";
import { useParams } from "react-router-dom";
// import {toast} from 'react-toastify';
import Spinner from "../../crucial/Spinner";

// const { Title, Paragraph, Text, Link } = Typography;
const Contents = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { subject_id } = useParams();
    const dispatch = useDispatch();
    const topicData = useSelector((state) => state.subjectReducer.topics);
    const subjectData = useSelector((state) => state.subjectReducer.subjects);
    const contentData = useSelector((state) => state.subjectReducer.contents);
    const status = useSelector((state) => state.subjectReducer.contentStatus);
    const [topicId, setTopicId] = useState(1);
    const [subId, setSubId] = useState(subject_id);
    // let topicId = 1;
    // let subId = 1000;



    useEffect(() => {
        dispatch(fetchContents({ topic_id: topicId }));
        dispatch(fetchTopics({ subject_id: subId }));
        dispatch(fetchSubjects());
    }, [dispatch, topicId, subId]);

    // console.log("topicName is: ", topicData);
    // console.log("subdata is : ", subjectData);
    // console.log("contentdata is : ", contentData);

    const { Content, Sider } = Layout;
    const data = topicData;
    // console.log("this id data: ",data);
    
    //style back and next btn
    if (topicId < 2) {
        document.querySelector(".back-btn").style.display = "none"; 
    }
    else{
        document.querySelector(".back-btn").style.display = "block";
    }

    return (
        <Layout style={{ height: "100%" }}>
            <Layout>
                <SuggestMenu />
            </Layout>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        // console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        // console.log(collapsed, type);
                    }}
                >
                    <Menu
                        className="menu-bar"
                        mode="inline"
                        defaultSelectedKeys={["0"]}
                        style={{
                            height: "100%",
                            borderRight: 0,
                        }}
                        // items={subjectData.map((item, index) => {
                        //     if (item.id === subId) {
                        //         return {
                        //             key: index,
                        //             icon: <RightOutlined />,
                        //             label: item.subject,
                        //             children: data.map((item1, index1) => {
                        //                 return {
                        //                     key: index1,
                        //                     label: item1.name,
                        //                     onClick: (click) => {
                        //                         setTopicId(item1.id);
                        //                         console.log("workig as hell : ", item1.id);
                        //                     }
                        //                 };
                        //             }),
                        //         }

                        //     };
                        // })}

                    items={topicData.map((item, id) => {
                        return {
                            key: id,
                            label: item.name,
                            onClick: (click) => {
                                setTopicId(item.id);
                                console.log("workig as hell : ", item.id);
                            },
                        };
                    })}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: "0 24px 24px",
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {/* started Fetching content here  */}

                        {contentData.map((data, id) => {
                            return (
                                <div key={id}>
                                    {/*--------------- Main Title --------------*/}
                                    {topicData.map((data, id) => {
                                        var temp;
                                        if (topicId === data.id) {
                                            temp = data.name;
                                        }
                                        return (
                                            <div key={id}>
                                                <Typography.Title className="contTitle">
                                                    {temp}
                                                </Typography.Title>
                                            </div>
                                        );
                                    })}
                                    <Divider plain />
                                    {/*------------------ image------------------*/}
                                    <div className="contImg">
                                        <Image width={200} src={data.image.url} />
                                    </div>
                                    {/* // -------------introduction  -----------*/}
                                    <Typography.Paragraph className="contPara">
                                        {data.intro}
                                    </Typography.Paragraph>
                                    {
                                        // _--------adding subtitle and its para--------
                                        data.content.map((subData, id1) => {
                                            return (
                                                <div key={id1}>
                                                    <Typography.Title level={3}>
                                                        {subData.heading}
                                                    </Typography.Title>
                                                    <Typography.Paragraph className="contPara">
                                                        {subData.about}
                                                    </Typography.Paragraph>
                                                </div>
                                            );
                                        })
                                    }
                                    {/*--------------adding Advantages-------------- */}
                                    <Typography.Title level={3}>
                                        Advantages :-
                                    </Typography.Title>
                                    <ul className="contPara">
                                        {data.advantages.map((subData, id1) => {
                                            return (
                                                <div key={id1}>
                                                    <li key={id1}>
                                                        {subData.points}
                                                    </li>
                                                </div>
                                            );
                                        })}
                                    </ul>
                                    {/* -------------adding Disadvantages------------- */}
                                    <Typography.Title level={3}>
                                        Disadvantages :-
                                    </Typography.Title>
                                    <ul className="contPara">
                                        {data.disadvantages.map(
                                            (subData, id1) => {
                                                return (
                                                    <div key={id1}>
                                                        <li key={id1}>
                                                            {subData.points}
                                                        </li>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            );
                        })}
                        <Button type="primary" className="back-btn" onClick={(click)=>{
                            if (topicId > 1) {
                                setTopicId(topicId-1);
                                document.querySelector(".menu-bar").defaultSelectedKeys = `{["${topicId-1}"]}`;
                            }
                            }}>Back</Button>
                        <Button type="primary" className="next-btn" onClick={(click)=>{
                            setTopicId(topicId+1);
                            document.querySelector(".menu-bar").defaultSelectedKeys = `{["${topicId+1}"]}`;
                            }}>Next</Button>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default Contents;
