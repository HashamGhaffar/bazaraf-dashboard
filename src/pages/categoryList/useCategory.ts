import { useState, useEffect, useCallback } from "react";
import { Category, RootState, CategoryFormData } from "../../type";
import {
  getAllCategories,
  categoriesDeleteCategory,
} from "../../api/CategoryApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useCategory = () => {
  const [data, setData] = useState<CategoryFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    categoryId: string;
    category: Category;
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
      const response = await getAllCategories(
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
    setEditingCategory(null);
  };

  const setCategoryData = (
    category: CategoryFormData,
    action: "UPDATE" | "ADD" | "DELETE"
  ) => {
    switch (action) {
      case "ADD":
        setData([...data, category]);
        break;
      case "UPDATE": {
        const updatedData = data.map((item: CategoryFormData) =>
          item.categoryId === category.categoryId ? category : item
        );
        setData(updatedData);
        break;
      }
      case "DELETE": {
        setData((prevData) =>
          prevData.filter((item) => item.categoryId !== category.categoryId)
        );
        break;
      }
      default:
        break;
    }
  };

  const editCategory = (categoryId: string, category: Category) => {
    setEditingCategory({ categoryId, category });
  };

  const deleteCategory = async (categoryId: string) => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await categoriesDeleteCategory(
        accessToken,
        restaurant.restaurantId,
        categoryId
      );
      if (response) {
        setCategoryData({ categoryId } as Category, "DELETE");
        notify("Category Deleted Successfully");
      }
    } catch (e) {
      console.log("An error occurred while deleting the category", e);
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    editCategory,
    clearForm,
    editingCategory,
    deleteCategory,
    setCategoryData,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export default useCategory;
