"use client"

import { useState } from "react"

interface UserProps {
    id: number,
    name: string
}

const LIST_OF_USERS : Array<UserProps> = [{
    id: 1,
    name: "Rafael"
},
{
    id: 2,
    name: "Lucas"
},
{
    id: 3,
    name: "Tiago"
},
{
    id: 5,
    name: "Thaysa"
},
{
    id: 6,
    name: "Thaysa"
},
{
    id: 7,
    name: "Thaysa"
},
{
    id: 8,
    name: "Thaysa"
},
{
    id: 9,
    name: "Thaysa"
},
{
    id: 10,
    name: "Thaysa"
},
]

export default function UserListComponent() {

    const [listOfUsers, setListOfUsers] = useState<Array<UserProps>>(LIST_OF_USERS)
    const [showMaxList, setShowMaxList] = useState<boolean>(false);
    
    const handleFilter = (filter: string) => {
        if (filter.length > 2) {
            setListOfUsers(LIST_OF_USERS.filter(user => user.name.toLowerCase().includes(filter.toLowerCase())))
            return
        }
        setListOfUsers(LIST_OF_USERS);
    }

    const handleShowAllNames = () => {
        setShowMaxList(prev => !prev);
    }
    
    return (
        <div>
            <div>
                <span>Filter:</span>
                <input type="text" onChange={(e) => handleFilter(e.target.value)}/>
            </div>
            {listOfUsers.length > 0 ? (
                <>
                    <ul>
                        {listOfUsers.map((user, index) => (
                            <div key={user.id}>
                                {(showMaxList || index < 5) && (
                                    <li key={user.id}>{user.name}</li>                        
                                )}
                            </div>
                        ))}
                    </ul>
                    {listOfUsers.length >= 5 && (
                        <button type="button" onClick={handleShowAllNames}>{showMaxList ? "Show less" : "Show more"}</button>
                    )}
                </>
            ) : (
                <span>There is no User to show</span>
            )}
        </div>
    )
}