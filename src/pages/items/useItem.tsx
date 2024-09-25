import { useState, useEffect, useCallback } from "react";
import { Item, RootState, ItemFormData } from "../../type";
import { getAllItems, deleteItem } from "../../api/itemApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useItem = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<{
    itemId: string;
    item: Item;
  } | null>(null);

  const notify = (text?: string) => {
    toast(text, {
      position: "top-right",
    });
  };

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const fetchData = useCallback(async () => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await getAllItems(accessToken, restaurant.restaurantId);
      response && setData(response || []);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      notify("Error fetching restaurant data");
    } finally {
      setLoading(false);
    }
  }, [accessToken, restaurant]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearForm = () => {
    setEditingItem(null);
  };

  const setItemData = (
    item: ItemFormData,
    action: "UPDATE" | "ADD" | "DELETE"
  ) => {
    switch (action) {
      case "ADD":
        fetchData();
        // setData((prevData) => [...prevData, item]);
        break;
      case "UPDATE":
        fetchData();

        // setData((prevData) =>
        //   prevData.map((dataItem) =>
        //     dataItem.itemId === item.itemId ? item : dataItem
        //   )
        // );
        break;
      case "DELETE":
        setData((prevData) =>
          prevData.filter((dataItem) => dataItem.itemId !== item.itemId)
        );
        break;
      default:
        break;
    }
  };

  const editItem = (itemId: string, item: Item) => {
    setEditingItem({ itemId, item });
  };

  const deleteItemById = async (itemId: string) => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await deleteItem(
        accessToken,
        restaurant.restaurantId,
        itemId
      );
      if (response) {
        setItemData({ itemId } as ItemFormData, "DELETE");
        notify("Item Deleted Successfully");
      }
    } catch (error) {
      console.error("An error occurred while deleting the item", error);
      notify("An error occurred while deleting the item");
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    editItem,
    clearForm,
    editingItem,
    deleteItem: deleteItemById,
    setItemData,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export default useItem;
