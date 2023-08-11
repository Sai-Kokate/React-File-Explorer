const useTraverseTree = () => {
  const insertNode = (tree, folderId, name, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: name,
        isFolder,
        items: [],
      });

      return tree;
    }

    let updatedItems = [];

    updatedItems = tree.items.map((obj) => {
      return insertNode(obj, folderId, name, isFolder);
    });

    return { ...tree, items: updatedItems };
  };

  const deleteNode = (tree, itemId) => {
    if (tree.id === itemId) {
      // matched id
      console.log(itemId, tree.id);
      return null; // Return null to indicate that this node should be removed
    }

    const updatedItems = tree.items
      .map((item) => {
        const updatedChild = deleteNode(item, itemId); // recursion
        if (updatedChild === null) {
          return null; // Remove the child node
        }
        return updatedChild;
      })
      .filter(Boolean); // Filter out null items

    return { ...tree, items: updatedItems };
  };

  const editNode = (tree, itemId, updatedName) => {
    if (tree.id === itemId) {
      // matched id
      tree.name = updatedName; // Return null to indicate that this node should be removed
      return tree;
    }

    let updatedItems;

    updatedItems = tree.items.map((item) => {
      return editNode(item, itemId, updatedName);
    });

    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode, editNode };
};

export default useTraverseTree;
