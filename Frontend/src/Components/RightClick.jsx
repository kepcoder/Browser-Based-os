import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { changeWallpaper, createFolder, renameItem, showApp } from '../store/slice';

const RightClick = () => {
  const {isVisible, position} =  useSelector((state)=> state.mainReducer)
  const dispatch = useDispatch()

 const handleRename = ()=>{
   dispatch(renameItem())
  }
   const handleRefresh = ()=>{
     console.log('refresh')
  }

   const handleChangeWallpaper = ()=>{
     const randomNum = (Math.floor(Math.random()*6)+1)
     dispatch(changeWallpaper(randomNum))
  }

   const handleCreateFolder = (e)=>{
     e.preventDefault()
     dispatch(createFolder("Folder"))
  }
  
  const handleSortBy = (e)=>{
   console.log('referesh')
  }


  
  const handleDisplaySetting = ()=>{
    dispatch(showApp('Settings'))
  }

return(
 <AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="absolute bg-white text-black shadow-lg p-2 rounded w-50 z-50"
      style={{ top: position?.y, left: position?.x }}
    >
      <ul className="space-y-2 w-full">
        <li onClick={handleRename} className='whitespace-nowrap cursor-pointer'>👁 Rename →</li>
        <li onClick={handleRefresh} className='whitespace-nowrap cursor-pointer'>🔄 Refresh</li>
        <li onClick={handleCreateFolder} className='whitespace-nowrap cursor-pointer'>📁 Create Folder</li>
        <li onClick={handleChangeWallpaper} className='whitespace-nowrap cursor-pointer'>🖼 Change Wallpaper</li>
        <li onClick={handleSortBy} className='whitespace-nowrap cursor-pointer'>🗂 Sort By →</li>
        <li onClick={handleDisplaySetting} className='whitespace-nowrap cursor-pointer'>⚙️ Display Setting</li>
      </ul>
    </motion.div>
  )}
</AnimatePresence>
)  

}

export default RightClick
