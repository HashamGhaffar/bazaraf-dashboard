import { useState, useEffect, useCallback } from "react";
import { Theme, RootState } from "../../type";
import { getAllThemes, deleteTheme } from "../../api/ThemeApi";
import { useSelector } from "react-redux";

const useThemeApi = () => {
  const [data, setData] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTheme, setEditingTheme] = useState<{
    themeId: string;
    theme: Theme;
  } | null>(null);

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const fetchData = useCallback(async () => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await getAllThemes(accessToken, restaurant.restaurantId);
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
    setEditingTheme(null);
  };

  const setThemeData = (theme: any, action: "UPDATE" | "ADD" | "DELETE") => {
    switch (action) {
      case "ADD":
        setData([...data, theme]);
        break;
      case "UPDATE": {
        const updatedData = data.map((item: any) =>
          item.themeId === theme.themeId ? theme : item
        );
        setData(updatedData);
        break;
      }
      case "DELETE": {
        setData((prevData) =>
          prevData.filter((item) => item.themeId !== theme.themeId)
        );
        break;
      }
      default:
        break;
    }
  };

  const editTheme = (themeId: string, theme: Theme) => {
    setEditingTheme({ themeId, theme });
  };

  const deleteThemeById = async (themeId: string) => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await deleteTheme(
        accessToken,
        restaurant.restaurantId,
        themeId
      );
      if (response) {
        setThemeData({ themeId } as Theme, "DELETE");
      }
    } catch (e) {
      console.error("An error occurred while deleting the theme", e);
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    editTheme,
    clearForm,
    editingTheme,
    deleteTheme: deleteThemeById,
    setThemeData,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export default useThemeApi;
