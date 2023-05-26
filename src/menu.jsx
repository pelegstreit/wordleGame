import {useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiHelpCircle } from "react-icons/fi";
import { TbChartBar } from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";

import './App.css';
function Menu() {

    return (
      <div className='menu'>
        <GrPowerReset className= "reset"/>
          <div className='row-menu' id="name">
        <div className="square-menu" >W</div>
        <div className="square-menu" >O</div>
        <div className="square-menu" >R</div>
        <div className="square-menu" >D</div>
        <div className="square-menu" >L</div>
        <div className="square-menu" >E</div>
        </div>
        <FiHelpCircle className= "howto"/>
        <TbChartBar className= "score"/>
        {/* <hr className="menu-border"/>  */}
        </div>
    )


}
export default Menu;
