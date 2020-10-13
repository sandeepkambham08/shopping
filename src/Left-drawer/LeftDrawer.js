import React from 'react';
import './LeftDrawer.css';

import Backdrop from '../Backdrop/Backdrop.js';

const leftDrawer = (props) =>{
    let Left_Drawer = ['Left-drawer' , 'Left-drawer-close'];
    if(props.isMenuOpen){
        Left_Drawer = ['Left-drawer' , 'Left-drawer-open'];
    }
    return( 
    <div>
    <Backdrop
    isopen={props.isMenuOpen}
    backdropClicked={props.backdropClicked}/>
    <div className={Left_Drawer.join(' ')} >
         <p>Inside left Drawer</p>
         <p>{props.isMenuOpen}</p>
    </div>
    </div>
    )
   
}

export default  leftDrawer;