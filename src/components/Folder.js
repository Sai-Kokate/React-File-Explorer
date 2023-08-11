import React, { useState } from "react";

const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleEditNode,
  explorer,
}) => {
  console.log("Main explorer: ", explorer);

  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [editClicked, setEditClicked] = useState(false);

  const handleItemAddition = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddItem = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // handle folder/file addition
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleItemDeletion = (e) => {
    e.stopPropagation();

    handleDeleteNode(explorer.id);
  };

  const handleItemEdit = (e) => {
    e.stopPropagation();

    setEditClicked(true);
  };

  const handleNameChange = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      const updatedName = e.target.value;
      handleEditNode(explorer.id, updatedName);
      setEditClicked(false);
    }
  };

  if (explorer === null) {
    return (
      <div>
        <div>You have No Folders</div>
      </div>
    );
  }
  if (explorer.isFolder) {
    return (
      <div>
        <div
          onClick={() => (editClicked ? "" : setExpand(!expand))}
          className="folder"
        >
          <span style={{ display: editClicked ? "none" : "inline-block" }}>
            📁 {explorer.name}
          </span>
          <span style={{ display: !editClicked ? "none" : "inline-block" }}>
            <input
              type="text"
              defaultValue={explorer.name}
              onKeyDown={handleNameChange}
              onBlur={() => setEditClicked(false)}
              autoFocus
            />
          </span>

          <div>
            <button onClick={(e) => handleItemAddition(e, true)}>📂 +</button>
            <button onClick={(e) => handleItemAddition(e, false)}>📃 +</button>

            <button onClick={(e) => handleItemEdit(e)}>🖋️</button>
            <button onClick={(e) => handleItemDeletion(e)}>❌</button>
          </div>
        </div>

        {/*  when clicked add */}
        {
          <div
            style={{
              display: showInput.visible ? "block" : "none",
              paddingLeft: "20px",
            }}
            className="inputContainer"
          >
            <span>{showInput.isFolder ? `📁` : `📄`}</span>
            <input
              type="text"
              onKeyDown={onAddItem}
              onBlur={() => {
                setShowInput({ ...showInput, visible: false });
              }}
              className="inputContainer__input"
              autoFocus
            />
          </div>
        }

        {/* When clicked to expand */}
        {
          <div
            style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
          >
            {explorer.items.map((exp) => {
              return (
                <Folder
                  handleInsertNode={handleInsertNode}
                  handleDeleteNode={handleDeleteNode}
                  handleEditNode={handleEditNode}
                  explorer={exp}
                  key={exp.id}
                />
              );
            })}
          </div>
        }
      </div>
    );
  } else {
    return (
      <div className="file">
        <span style={{ display: editClicked ? "none" : "inline-block" }}>
          📄 {explorer.name}
        </span>
        <span style={{ display: !editClicked ? "none" : "inline-block" }}>
          <input
            type="text"
            defaultValue={explorer.name}
            onKeyDown={handleNameChange}
            onBlur={() => setEditClicked(false)}
            autoFocus
          />
        </span>
        <div>
          <button onClick={(e) => handleItemEdit(e)}>🖋️</button>
          <button onClick={(e) => handleItemDeletion(e)}>❌</button>
        </div>
      </div>
    );
  }
};

export default Folder;
