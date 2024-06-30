import React from 'react'
import Styled from 'styled-components'
import Profile from '../../images/profile.png'
import { Menu_items } from '../../util/Menu_item'
import { signout } from '../../util/icons'
import { Use_Global_Context } from "../../context/globalContext";
function Navigation_bar ({active,setActive}){
    const { user } = Use_Global_Context();
    return (
        <Navigation_styled>
            <div className='profile'>
                <img className='image' src={Profile} alt=""/>
                <div className='title'>
                    <h2>
                    {user.data.userName}
                    </h2>
                    <p>
                        Your Profile
                    </p>
                </div>
            </div>
            <ul className='Menu_items'>
                {Menu_items.map((item)=>{
                    return(
                        <li key = {item.id} 
                        onClick = { () => setActive(item.id)}
                        className= {active === item.id ? 'active' : ''}>
                            {item.icon}
                            <span><b>{item.title}</b></span>
                        </li>
                    )
                })}
            </ul>
            <div className='Footer'>
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </Navigation_styled>
    )
}
const Navigation_styled = Styled.div`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    border: 3px solid white;
    border-radius: 32px;
    background: #71C9CE;
    backdrop-filter: blur(10px);
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    gap:2rem;
    .profile{
        height:100px;
        display:flex;
        align-item:center;
        gap: 1rem;
        .image{
            height:80px;
            width:80px;
            object-fit:cover;
            background: #fcf6f9;
            border: 2px solid white;
            padding:.2 rem;
            box-shadow: 0px 1px 17px rgba(0,0,0,0.06);
            border-radius: 50%;
        }
    }
    .Menu_items{
        flex:1;
        display:flex;
        flex-direction: column;
        li{
            display:grid;
            grid-template-columns:40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight:500;
            cursor:pointer;
            transition: all .4s ease-in-out;
            padding-left: 1rem;
            postion:relative;    
        }
    }
    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        
    }
`;
export default Navigation_bar