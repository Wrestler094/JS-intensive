import React from "react";
import {useSelector} from "react-redux";
import Main from "./screens/Main";
import './App.css';

export default function App() {
    const isLight = useSelector((state) => !(state.theme.isLight));

    return (
        <div className={isLight ? "App" : "App App--light"}>
            <Main/>
        </div>
    );
}