import React, {Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import About from "@/pages/About/About";

const routes = [
    {
        path: '/admin',
        element: <App />,
        children: [
            {
                path: '/admin/about',
                element: <Suspense fallback={'...Loading'}><About /></Suspense>
            }
        ]
    }
]

export const router = createBrowserRouter(routes)

export default routes