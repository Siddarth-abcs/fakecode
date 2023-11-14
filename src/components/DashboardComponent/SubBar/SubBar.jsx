import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HomeComponent from '../HomeComponent/HomeComponent';
import FolderComponent from '../FolderComponent/FolderComponent';
import './SubBar.css'

const Subbar = ({
  setIsCreateFolderModelOpen,
  setIsCreateFileModelOpen,
  setIsFileUploadModalOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === state.filefolders.currentFolder
      ),
      userFolders: state.filefolders.userFolders,
    }),
    shallowEqual
  );

  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const handleKeyPress = (event) => {
    if (event.key === 'Backspace') {
      // Check if you are not inside an input field before navigating back
      const focusedElement = document.activeElement;
      const isInputField =
        focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA';

      if (!isInputField) {
        navigate(-1);
      }
    }
  };

  // Add event listener to the document for key press
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array means this effect runs once on mount


return (
//    <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 px-4" style={{height: "40px"}}>
//            <nav aria-label="breadcrumb" className='subbar-nav'>
//            <ol class="breadcrumb d-flex align-items-center">

//            {currentFolder != "root" ? (
//               <>
//             <button onClick={() => handleNavigate("/dashboard", "root")} 
//             className='breadcrumb-item btn btn-link text-decoration-none'
//             >
//               Root
//             </button>
            
//             {currentFolderData?.data.path.map((folder, index) => (
//               <button key={index} className='breadcrumb-tem btn btn-link text-decoration-none'
//               onClick={() => 
//               handleNavigate(
//                 `/dashboard/folder/Root/${
//                   userFolders.find((fldr) => folder === fldr.docId).docId
//                 }`,
//                 userFolders.find((fldr) => folder === fldr.docId).docId
//               )
//             }
//             >
//               {userFolders.find((fldr) => folder === fldr.docId).data.name}
//             </button>
//             ))}
//             <li className='breadcrumb-item active'>
//               {currentFolderData?.data.name}
//             </li>
//             </>
//            ):(
//             <>
//              <li className='breadcrumb-item active'>
//             Root
//           </li>
//             </>
//            ) }
// </ol>


// <ul className='navbar-nav ms-auto'>
// {/* <li className='nav-item '>
//             <button className='btn btn-outline-dark btn-sm'
//             onClick={()=>setIsFileUploadModalOpen(true)}>
//             <i class="fa-regular fa-folder mx-2 "></i>
//             Upload File
//             </button>
//         </li> */}

//  <li className='nav-item mx-2'>
//              <button className='btn btn-outline-primary btn-sm'
//              onClick={()=>navigate(-1)}>
//              {/* <i class="fa-regular fa-folder mx-2 "></i> */}
//              Go Back
//              </button>
//          </li>

//         {/* <li className='nav-item '>
//             <button className='btn btn-outline-dark btn-sm'
//             onClick={()=>setIsCreateFolderModelOpen(true)}>
//             <i class="fa-regular fa-folder mx-2 "></i>
//             Create Folder
//             </button>
//         </li> */}
//        </ul>
//     </nav>
//     </nav>
    <div className="subbar">
      <div className="sub-navbar">
      <div className="path">
      Hello! {user.displayName}
      </div>
      <div className="backbtn">
         <li className='nav-item mx-2'>
             <button className='btn btn-outline-primary btn-sm'
             onClick={()=>navigate(-1)}>
             {/* <i class="fa-regular fa-folder mx-2 "></i> */}
             Go Back
             </button>
         </li>
      </div>
    </div>

    <div className="file-folder">
    <Routes>
          <Route path="" element={<HomeComponent/>}/> 
          <Route path='folder/:folderId' element={<FolderComponent/>}/>
        </Routes>
    </div>
    </div>
    
)


}
export default Subbar;
