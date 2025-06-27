import { createSlice } from "@reduxjs/toolkit";

let query = "Sheryians Coding School";
const results = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
const initialState = {
  brightnessLevel : 80,
  isVisible: false,
  position: { x: 0, y: 0 },

  filesystem:[
{    id:"47984214",
    name:'Owner image',
    type: 'image',
    dataURL:`/owner.webp`,
    created: "23947032"
},
{    id: "72394324",
    name:'My Owner image',
    type: 'image',
    dataURL:`/sheryians.webp`,
    created:"874944"
},
  
],
  dockItems: [
    { name: "Finder", icon: "/Finder.webp" },
    { name: "Safari", icon: "/Safari.webp" },
    { name: "Notes", icon: "/Notes.webp" },
    { name: "Settings", icon: "/setting.webp" },
    { name: "AppStore", icon: "/AppStore.webp" },
    { name: "Folder", icon: "/folder-icon.webp" },
  ],
  openApps: {
    Folder: { visible: false, minimized: false, maximized: false },
    AppStore: { visible: false, minimized: false, maximized: false },
    Settings: { visible: false, minimized: false, maximized: false },
    Notes: { visible: false, minimized: false, maximized: false },
    Safari: {
      visible: false,
      minimized: false,
      maximized: false,
      query: query,
      results: results,
    },
    Finder: { visible: false, minimized: false, maximized: false },
    Spotify: { visible: false, minimized: false, maximized: false },
  },
  wallpapers: {
    url: "/wallpaper6.webp",
  },
  desktopIcons: [
    {
      name: "Folder",
      label: "Folder1",
      icon: "/folder-icon.webp",
      edit: false,
    },
    {
      name: "Spotify",
      label: "Spotify",
      icon: "Spotify_macos.webp",
      edit: false,
    },
    {
      name: "Terminal",
      label: "Terminal",
      icon: "/Terminal_macos.webp",
      edit: false,
    },
    {
      name: "Vscode",
      label: "VS Code",
      icon: "Vscode_macos.webp",
      edit: false,
    },
    {
      name: "Chatbot",
      label: "Chatbot",
      icon: "Chatbot_macos.webp",
      edit: false,
    },    
    {
      name: "Camera",
      label: "Camera",
      icon: "Camera_macos.webp",
      edit: false,
    },
    {
      name: "Binance",
      label: "Binance",
      icon: "Binance_macos.webp",
      edit: false,
    },
  ],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    showMenu: (state, action) => {
      const { x, y } = action.payload;
      state.isVisible = true;
      state.position = { x, y };
    },
    hideMenu: (state, action) => {
      state.isVisible = false;
    },

    showApp: (state, action) => {
      const appName = action.payload;

      if (!state.dockItems.find((d) => d.name === appName)) {
        state.dockItems.push({ name: appName, icon: `/${appName}_macos.webp` });
      }

      if (!state.openApps[appName]) {
        state.openApps[appName] = {
          visible: true,
          minimized: false,
          maximized: false,
        };
      } else if (state.openApps[appName].minimized) {
        state.openApps[appName].minimized = false;
      } else {
        state.openApps[appName].visible = true;
      }
    },
    closeApp: (state, action) => {
      const appName = action.payload;
      if (
        state.dockItems.some((d) => d.name === appName) && state.desktopIcons.find((d) => d.name === appName)
      ) {
        state.dockItems = state.dockItems.filter((d) => d.name !== appName);
      }

      state.openApps[appName].visible = false;
    },
    toggleMaximized: (state, action) => {
      const appName = action.payload;
      state.openApps[appName].maximized = !state.openApps[appName].maximized;
    },
    toggleMinimize: (state, action) => {
      const appName = action.payload;
      state.openApps[appName].minimized = true;
    },
    safariQuery: (state, action) => {
      state.openApps.Safari.query = action.payload;
    },
    safariResults: (state, action) => {
      state.openApps.Safari.results = `https://www.bing.com/search?q=${encodeURIComponent(
        action.payload
      )}`;
    },
    changeWallpaper: (state, action) => {
      const number = action.payload;
      state.wallpapers.url = `/wallpaper${number}.webp`;
    },
    createFolder: (state, action) => {
      const appName = action.payload;
      state.desktopIcons.push({
        name: appName,
        label: "Folder1",
        icon: "/folder-icon.webp",
      });
    },
    showEdit: (state, action) => {
      const appName = action.payload;
      console.log(appName);
      state.desktopIcons[appName].edit = true;
    },
    renameItem: (state, action) => {
      const { id, label } = action.payload || {};
      if (id === null || id === undefined) return;
      if (state.desktopIcons[id]) {
        state.desktopIcons[id].label =
          label?.trim() || state.desktopIcons[id].label;
      }
    },
    adjustBrightness:(state,action)=>{
      const val = action.payload;
      state.brightnessLevel = val
    },

    savePhoto: (state, {payload}) => {
     state.filesystem.push({
     id: Date.now(),
     name: payload.name,
     type: "image",
     dataURL: payload.dataURL,
     created: Date.now(),
   });
   },

   deleteImage:(state,action)=>{
     const imgId = action.payload
     state.filesystem = state.filesystem.filter((img) => img.id !== imgId )
   }

  },
});

export const {
  showMenu,
  hideMenu,
  showApp,
  closeApp,
  toggleMaximized,
  toggleMinimize,
  safariQuery,
  safariResults,
  changeWallpaper,
  createFolder,
  showEdit,
  renameItem,
  adjustBrightness,
  savePhoto,
   deleteImage
} = mainSlice.actions;
export default mainSlice.reducer;
