import { useState, useEffect, useCallback } from "react";
import { DeliveryLocationInterface, RootState } from "../../type";
import {
  getAllDeliveryLocations,
  deleteDeliveryLocation,
} from "../../api/DeliveryLocationApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useDeliveryLocation = () => {
  const [data, setData] = useState<DeliveryLocationInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDeliveryLocation, setEditingDeliveryLocation] = useState<{
    deliveryLocationId: string;
    deliveryLocation: DeliveryLocationInterface;
  } | null>(null);

  const { restaurant, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const fetchData = useCallback(async () => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await getAllDeliveryLocations(
        accessToken,
        restaurant.restaurantId
      );
      setData(response || []);
    } catch (error) {
      console.error("Error fetching delivery locations:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, restaurant]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearForm = () => {
    setEditingDeliveryLocation(null);
  };

  const setDeliveryLocationData = (
    deliveryLocation: DeliveryLocationInterface,
    action: "UPDATE" | "ADD" | "DELETE"
  ) => {
    switch (action) {
      case "ADD":
        setData([...data, deliveryLocation]);
        break;
      case "UPDATE": {
        const updatedData = data.map((item: DeliveryLocationInterface) =>
          item.deliveryLocationId === deliveryLocation.deliveryLocationId
            ? deliveryLocation
            : item
        );
        setData(updatedData);
        break;
      }
      case "DELETE": {
        setData((prevData) =>
          prevData.filter(
            (item) =>
              item.deliveryLocationId !== deliveryLocation.deliveryLocationId
          )
        );
        toast.success("Delivery location Delete successfully");
        break;
      }
      default:
        break;
    }
  };

  const editDeliveryLocation = (
    deliveryLocationId: string,
    deliveryLocation: DeliveryLocationInterface
  ) => {
    setEditingDeliveryLocation({ deliveryLocationId, deliveryLocation });
  };

  const deleteDeliveryLocationById = async (deliveryLocationId: string) => {
    if (!accessToken || !restaurant?.restaurantId) return;

    try {
      setLoading(true);
      const response = await deleteDeliveryLocation(
        accessToken,
        restaurant.restaurantId,
        deliveryLocationId
      );
      if (response) {
        setDeliveryLocationData(
          { deliveryLocationId } as DeliveryLocationInterface,
          "DELETE"
        );
      }
    } catch (e) {
      console.error(
        "An error occurred while deleting the delivery location",
        e
      );
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    editDeliveryLocation,
    clearForm,
    editingDeliveryLocation,
    deleteDeliveryLocation: deleteDeliveryLocationById,
    setDeliveryLocationData,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export default useDeliveryLocation;
