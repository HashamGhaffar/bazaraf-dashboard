import { useState, useEffect, useCallback } from "react";
import { ModifierFormData, RootState } from "../../type";
import { getAllModifiers, deleteModifier } from "../../api/ModifierApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useModifier = () => {
  const [data, setData] = useState<ModifierFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingModifier, setEditingModifier] = useState<{
    modifierId: string;
    modifier: ModifierFormData;
  } | null>(null);

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const fetchData = useCallback(async () => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await getAllModifiers(
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
    setEditingModifier(null);
  };

  const setModifierData = (
    modifier: ModifierFormData,
    action: "UPDATE" | "ADD" | "DELETE"
  ) => {
    switch (action) {
      case "ADD":
        setData([...data, modifier]);
        break;
      case "UPDATE": {
        const updatedData = data.map((item: ModifierFormData) =>
          item.modifierId === modifier.modifierId ? modifier : item
        );
        setData(updatedData);
        break;
      }
      case "DELETE": {
        setData((prevData) =>
          prevData.filter((item) => item.modifierId !== modifier.modifierId)
        );
        toast.success("Modifier deleted successfully");
        break;
      }
      default:
        break;
    }
  };

  const editModifier = (modifierId: string, modifier: ModifierFormData) => {
    setEditingModifier({ modifierId, modifier });
  };

  const deleteModifierById = async (modifierId: string) => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await deleteModifier(
        accessToken,
        restaurant.restaurantId,
        modifierId
      );
      if (response) {
        setModifierData({ modifierId } as ModifierFormData, "DELETE");
      }
    } catch (e) {
      console.error("An error occurred while deleting the modifier", e);
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    editModifier,
    clearForm,
    editingModifier,
    deleteModifier: deleteModifierById,
    setModifierData,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export default useModifier;
