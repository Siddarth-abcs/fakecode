import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ShowItems from '../ShowItems/ShowItems';

const HomeComponent = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders,
      userFiles: state.filefolders.userFiles,
    }),
    shallowEqual
  );

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading...</h1>
      ) : (
        <>
          <ShowItems
            title="Created Folders"
            type="folder"
            items={userFolders.filter((folder) => folder.data.parent === 'root')}
          />
          <ShowItems
            title="Created files"
            type="file"
            items={userFiles.filter((file) => file.data.parent === 'root' && file.data.url === null)}
          />
          <ShowItems
            title="Uploaded File"
            type="file"
            items={userFiles.filter((file) => file.data.parent === 'root' && file.data.data === null)}
          />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
