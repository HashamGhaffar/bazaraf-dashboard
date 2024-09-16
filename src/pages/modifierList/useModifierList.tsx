import { useState, useEffect, useCallback } from "react";
import { ModifierListFormData, RootState, ModifierList } from "../../type";
import {
  getAllModifierLists,
  deleteModifierList,
} from "../../api/modifierListApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useModifierList = () => {
  const [data, setData] = useState<(ModifierList | ModifierListFormData)[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingModifierList, setEditingModifierList] = useState<{
    modifierListId: string;
    modifierList: ModifierListFormData;
  } | null>(null);

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const fetchData = useCallback(async () => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await getAllModifierLists(
        accessToken,
        restaurant.restaurantId
      );
      setData(response || []);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, restaurant]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearForm = () => {
    setEditingModifierList(null);
  };

  const setModifierListData = (
    modifierList: ModifierListFormData,
    action: "UPDATE" | "ADD" | "DELETE"
  ) => {
    switch (action) {
      case "ADD":
        setData([...data, modifierList]);
        break;
      case "UPDATE": {
        const updatedData = data.map((item: any) =>
          item.modifierListId === modifierList?.modifierListId
            ? modifierList
            : item
        );
        setData(updatedData);
        break;
      }
      case "DELETE": {
        setData((prevData: any) =>
          prevData.filter(
            (item: any) => item.modifierListId !== modifierList?.modifierListId
          )
        );
        toast.success("Modifier list deleted successfully");
        break;
      }
      default:
        break;
    }
  };

  const editModifierList = (
    modifierListId: string,
    modifierList: ModifierListFormData
  ) => {
    setEditingModifierList({ modifierListId, modifierList });
  };

  const deleteModifierListById = async (modifierListId: string) => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await deleteModifierList(
        accessToken,
        restaurant.restaurantId,
        modifierListId
      );
      if (response) {
        setModifierListData({ modifierListId } as any, "DELETE");
      }
    } catch (e) {
      console.log("An error occurred while deleting the modifier list", e);
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    editModifierList,
    clearForm,
    editingModifierList,
    deleteModifierList: deleteModifierListById,
    setModifierListData,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export default useModifierList;
