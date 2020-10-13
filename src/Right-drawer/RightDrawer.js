import React from 'react';
import './RightDrawer.css';

import Backdrop from '../Backdrop/Backdrop.js';

const rightDrawer = (props) =>{
    let Right_Drawer = ['Right-drawer' , 'Right-drawer-close'];
    if(props.isMenuOpen){
        Right_Drawer = ['Right-drawer' , 'Right-drawer-open'];
    }
    return( 
    <div>
    <Backdrop
    isopen={props.isMenuOpen}
    backdropClicked={props.backdropClicked}/>
    <div className={Right_Drawer.join(' ')} >
         <p>Inside Right Drawer</p>
         <p>{props.isMenuOpen}</p>
    </div>
    </div>
    )
   
}

export default  rightDrawer;