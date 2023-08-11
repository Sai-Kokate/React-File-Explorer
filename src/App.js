import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";

export default function App() {
  const [fileExplorer, setFileExplorer] = useState(explorer);

  const { insertNode, deleteNode, editNode } = useTraverseTree();

  const handleInsertNode = (folderId, name, isFolder) => {
    const updatedTree = insertNode(fileExplorer, folderId, name, isFolder);
    setFileExplorer(updatedTree);
  };

  const handleDeleteNode = (folderId) => {
    const updatedTree = deleteNode(fileExplorer, folderId);
    setFileExplorer(updatedTree);
  };

  const handleEditNode = (folderId, updatedName) => {
    const updatedTree = editNode(fileExplorer, folderId, updatedName);
    setFileExplorer(updatedTree);
  };

  console.log("fileExplorer:", fileExplorer);

  return (
    <Folder
      handleInsertNode={handleInsertNode}
      handleDeleteNode={handleDeleteNode}
      handleEditNode={handleEditNode}
      explorer={fileExplorer}
    />
  );
}
