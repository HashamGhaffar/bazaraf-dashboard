import { useState, useEffect, useCallback } from "react";
import { Table, RootState } from "../../type";
import { getAllTables, deleteTable } from "./../../api/tabelApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useTable = () => {
  const [data, setData] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTable, setEditingTable] = useState<{
    tableId: string;
    table: Table;
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
      const response = await getAllTables(accessToken, restaurant.restaurantId);
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
    setEditingTable(null);
  };

  const setTableData = (table: any, action: "UPDATE" | "ADD" | "DELETE") => {
    switch (action) {
      case "ADD":
        setData([...data, table]);
        break;
      case "UPDATE": {
        const updatedData = data.map((item: Table) =>
          item.tableId === table.tableId ? table : item
        );
        setData(updatedData);
        break;
      }
      case "DELETE": {
        setData((prevData) =>
          prevData.filter((item) => item.tableId !== table.tableId)
        );
        break;
      }
      default:
        break;
    }
  };

  const editTable = (tableId: string, table: Table) => {
    setEditingTable({ tableId, table });
  };

  const deleteTables = async (tableId: string) => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await deleteTable(
        accessToken,
        restaurant?.restaurantId,
        tableId
      );
      if (response) {
        setTableData({ tableId } as Table, "DELETE");
        notify("Table Deleted Successfully");
      }
    } catch (e) {
      console.log("An error occurred while deleting the table", e);
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    editTable,
    clearForm,
    editingTable,
    deleteTables,
    setTableData,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export default useTable;
