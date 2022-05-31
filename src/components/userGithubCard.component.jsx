import React from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid'
import { useEffect } from "react";

export function UserGithubCardComponent(props) {
    const [user, setUser] = React.useState({})
    let username = 'https://github.com' + props.user
    useEffect(() => {
        async function getUserGithub() {
            const result = await axios.get(`https://api.github.com/users/${props.user}`);
            setUser(result.data)
        }
        getUserGithub()
    }, [])
    return (
        <div className="grid  card rounded-box place-items-center mb-2">
            <div className="bg-gray-600 w-full  flex items-center p-2 rounded-xl shadow ">
                <div className="flex items-center space-x-4">
                    <img src="https://avatars.githubusercontent.com/u/66132114?s=400&u=7fa80f451ab04bd93b8277cd46144a39a55601e4&v=4" alt="My profile" className="w-16 h-16 rounded-full" />
                </div>
                <div className="flex-grow p-3">
                    <div className="font-semibold text-gray-200">
                        {user.name || ""}
                    </div>
                    <div className="text-sm text-blue-500">
                        ساخته شده توسط
                    </div>
                </div>
                <div className="p-2">
                    {user && <a href={username} target={"_blank"}>
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>}

                </div>
            </div>
        </div>
    )
}