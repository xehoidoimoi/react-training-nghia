import React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";

import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Register from './pages/register/Register';
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Article from "./pages/article/Article";
import Favorites from "./components/favorites/Favorites";
import CreateArticle from "./pages/create article/CreateArticle";

export const router = createBrowserRouter([
    {
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            // {
            //     path: "/article",
            //     element: <Article />,
            // },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/profile/:username",
                element: <Profile />,
                children: [
                    {
                        path: "/profile/:username/favorites",
                        element: <Favorites />,
                    },
                ]
            },
            {
                path: "/article/:title",
                element: <Article />,
            },
            {
                path: "/editor",
                element: <CreateArticle />,
            },
            {
                path: "/editor/:slug",
                element: <CreateArticle />,
            },
        ],
    },
]);

