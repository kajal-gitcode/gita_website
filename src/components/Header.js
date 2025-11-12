
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, BookOpen } from "lucide-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer,IconButton,List,ListItem,ListItemText,ListItemIcon,Box,} from "@mui/material";
import ContentMenu from "./ContentMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("main");
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  //  Close desktop menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDesktopMenu(false);
      }
    }
    if (showDesktopMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDesktopMenu]);

  //  Handle verse click
  const handleVerseSelect = (chapterId, verseId) => {
    navigate(`/chapter/${chapterId}/verse/${verseId}`);
    setDrawerOpen(false);
    setActiveMenu("main");
    setShowDesktopMenu(false);
  };

  //  Navigate to home when clicking logo/title
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between gap-6 p-2 bg-white shadow sticky top-0 z-50">
      {/* ===== MOBILE HEADER ===== */}
      <div className="flex md:hidden items-center justify-between w-full">
        {/* Left: Logo + Title */}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/gitasupersite/favicon.ico"
            alt="Bhagavad Gita Logo"
            className="w-8 h-8 "
          />
          <h1 className="text-lg font-semibold text-gray-800">Bhagavad Gita</h1>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 ml-2">
          <SearchBar />
        </div>

        {/* Right: Drawer Button */}
        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>

        {/* ===== MOBILE DRAWER ===== */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setActiveMenu("main");
          }}
          PaperProps={{
            sx: {
              width: "80%",
              maxWidth: 320,
              backgroundColor: "#fff",
              height: "100%",
            },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Drawer Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                borderBottom: "1px solid #eee",
              }}
            >
              {activeMenu === "content" && (
                <IconButton onClick={() => setActiveMenu("main")} size="small">
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Box sx={{ ml: activeMenu === "content" ? 1 : 0, fontWeight: 600 }}>
                {activeMenu === "main" ? "Menu" : "Content"}
              </Box>
            </Box>

            {/* Drawer Content */}
            {activeMenu === "main" ? (
              <List sx={{ flex: 1 }}>
                <ListItem
                  button
                  component={Link}
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                <ListItem button onClick={() => setActiveMenu("content")}>
                  <ListItemIcon>
                    <BookOpen />
                  </ListItemIcon>
                  <ListItemText primary="Content" />
                  <ChevronRightIcon />
                </ListItem>
              </List>
            ) : (
              <Box sx={{ flex:1, overflowY: "auto", p: 1.5 }}>
                <ContentMenu onSelect={handleVerseSelect} />
              </Box>
            )}
          </Box>
        </Drawer>
      </div>


{/* ===== DESKTOP HEADER ===== */}  

     <div className="hidden md:flex items-center justify-between  w-full">
    {/* Left: Logo + Title */}
      <div onClick={handleLogoClick} className="flex items-center cursor-pointer hover:opacity-80 transition" >
       <img src="/gitasupersite/favicon.ico" alt="Bhagavad Gita Logo"        className="w-10h-10mr-2" />
       <h1 className="text-2xl font-semibold text-gray-800">Bhagavad Gita</h1>
       </div> 
      
     {/* Content Dropdown + search bar */}
       <div className="flex items-center flex-1 justify-end gap-3" ref={menuRef}>
     {/* Search Bar */}
         <div className="max-w-md w-full">
          <SearchBar />
         </div>
      {/* content button */}   
          <div className="relative inline-block"></div>
         <button
          onClick={() => setShowDesktopMenu((prev) => !prev)}
                className="flex flex-col items-center px-3 py-2 rounded-lg text-gray-800 hover:bg-orange-50 hover:text-orange-600 transition" > 
            <BookOpen className="w-6 h-5" /> 
            <span>Content</span> 
         </button>
          {showDesktopMenu && ( 
            <div className="fixed top-[80px] right-8 bg-white shadow-lg rounded p-4 z-50 w-[600px] max-h-[80vh] overflow-y-auto transition-all">
            <ContentMenu onSelect={handleVerseSelect} />
             </div> )}
              </div>             
            </div>
         </header>
  );
}
