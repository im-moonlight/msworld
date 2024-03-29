import React from "react";
// import "antd/dist/antd.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import store from "./store";
import store from "./shared/store";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        // fontSizeHeading1: "rem",
                        //  fontSizeLG
                        // fontSizeSM
                        // fontSizeLG:'5rem'
                        // fontSizeHeading5:'5rem'
                        // fontSize:'2rem'
                        // colorBorderSecondary:"black"
                        // colorText:'black'
                        
                      
                    },
                }}
            >
                <App />
            </ConfigProvider>
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
