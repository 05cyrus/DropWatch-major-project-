import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import './styles.css'; 



export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);


  return (
    <div className="drawer-component">
          <IconButton onClick={()=>setOpen(true)}><MenuIcon className="link"/></IconButton>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={()=>setOpen(false)}
          >
            <div className="drawer-links">
                    <a href="/">
                    <p className="link">Home</p>
                    </a>
                    <a href="/compare">
                    <p className="link">Compare</p>
                    </a>
                    <a href="/watchlist">
                    <p className="link">Watchlist</p>
                    </a>
                    <a href="/dashboard">
                    <p className="link">Dashboard</p>
                    </a>
              </div>
          </Drawer>
    </div>
  );
}
