import React from 'react'

import { ImStatsDots } from "react-icons/im";
import { LuPencilLine } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import { BiFoodMenu } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";

const links = [
    {
        text:'User Stats', 
        path: '.', 
        icon:<ImStatsDots/>,
    },
    {
        text:'Daily Log', 
        path: 'daily-log', 
        icon:<LuPencilLine/>
    },
    {
        text:'Routine List', 
        path: 'routine-list', 
        icon:<FaList/>
    },
    {
        text:'Workout List', 
        path: 'workout-list', 
        icon:<LiaDumbbellSolid/>
    },
    {
        text:'Recipe List', 
        path: 'recipe-list', 
        icon:<BiFoodMenu/>
    },
    {
        text: 'Food List',
        path: 'food-list',
        icon: <IoFastFood/>

    },
    {
        text: 'Virtual Instructor',
        path: 'virtual-instructor',
        icon:<TbMessageChatbot/>

    },
    {
        text: 'Admin',
        path: 'admin',
        icon:<RiAdminLine/>

    }
]

export default links;