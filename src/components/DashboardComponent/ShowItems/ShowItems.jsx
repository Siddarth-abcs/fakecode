import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { changeFolder } from '../../../redux/actionCreators/fileFolderActionCreator';
import {toast} from "react-toastify";
import './ShowItems.css'

const ShowItems = ({title, items, type}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDblClick = (itemId) => {
    if (type==="folder") {
      dispatch(changeFolder(itemId))
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      toast.error("File clicked")
    }
  }
  return (
    <div className='w-100'>
        {/* <h4 className='text-center border-bottom'>{title}</h4> */}
        <div className=' gap-2 py-4 '>
            {items.map((item,index) => {
                return( 
                <a href={item.data.url} target="_blank">
                  <p key={index * 55} className='file-folder-show' style={{marginLeft: "10px"}}
                onDoubleClick={()=> handleDblClick(item.docId)} 
                >
                  {type === "folder" ? (
                    <i class="fa-solid fa-folder" style={{marginRight: "10px"}}></i>
                  ):(
                    <i class="fa-solid fa-file" style={{margin: "10px"}}></i>
                  )}
                  {item.data && item.data.name ? item.data.name : 'No Name'} 
                  </p>
                </a>
                )
            })}
        </div>
    </div>
  )
}

export default ShowItems;
