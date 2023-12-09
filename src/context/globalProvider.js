'use client'

import { createContext, useContext, useState } from "react"
import themes from "./themes";

import { getCurrentUser } from "@/utils/getCurrentUser";
export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()



export const GlobalProvider = ({ children }) => {

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState(null);

    const [tasks, setTasks] = useState([]);
    const theme1 = themes[selectedTheme];

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };
    // const allTasks = async () => {
    //     setIsLoading(true);
    //     try {
    //         const res = await axios.get("/api/tasks");

    //         const sorted = res.data.sort((a, b) => {
    //             return (
    //                 new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    //             );
    //         });

    //         setTasks(sorted);

    //         setIsLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const currentUser = async () => {
    //     const session = await getCurrentUser()
    //     if (session) {
    //         setUser(session.user)
    //     }
    // }

    // React.useEffect(() => {
    //     currentUser()
    // }, [])
// React.useEffect(() => {
    //     if (user) allTasks();
    // }, [user]);
    return (
        <GlobalContext.Provider
            value={{
                theme1,
                selectedTheme,
                setSelectedTheme,
                isLoading,
                setIsLoading,
                modal,
                setModal,
                openModal, closeModal,
                collapsed,
                collapseMenu,
                tasks,
                setTasks,
            }}
        >
            <GlobalUpdateContext.Provider
                value={{
                    setSelectedTheme,
                    setIsLoading,
                    setModal,
                    setCollapsed,
                    setTasks,
                }}
            >
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);