import { useState, useEffect, useCallback } from "react";
import { Discount, RootState } from "../../type";
import { getAllDiscount, deleteDiscount} from "../../api/discountApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useDiscount = () => {
    const [data, setData] = useState<Discount[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingDiscount, setEditingDiscount] = useState<{
        discountId: string;
        discount: Discount;
    } | null>(null);

    const { restaurant, accessToken } = useSelector(
        (state: RootState) => state.auth
    );

    const fetchData = useCallback(async () => {
        if (!accessToken || !restaurant?.restaurantId) return;

        try {
            setLoading(true);
            const response = await getAllDiscount(accessToken, restaurant.restaurantId);
            setData(response || []);
        } catch (error) {
            console.error("Error fetching discounts:", error);
        } finally {
            setLoading(false);
        }
    }, [accessToken, restaurant]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const clearForm = () => {
        setEditingDiscount(null);
    };

    const setDiscountData = (
        discount: Discount,
        action: "UPDATE" | "ADD" | "DELETE"
    ) => {
        switch (action) {
            case "ADD":
                setData([...data, discount]);
                break;
            case "UPDATE": {
                const updatedData = data.map((item: Discount) =>
                    item.discountId === discount.discountId
                        ? discount
                        : item
                );
                setData(updatedData);
                break;
            }
            case "DELETE": {
                setData((prevData) =>
                    prevData.filter(
                        (item) =>
                            item.discountId !== discount.discountId
                    )
                );
                toast.success("Discount deleted successfully");
                break;
            }
            default:
                break;
        }
    };

    const editDiscount = (
        discountId: string,
        discount: Discount
      ) => {
        setEditingDiscount({ discountId, discount });
      };
    
      const deleteDiscountById = async (discountId: string) => {
        if (!accessToken || !restaurant?.restaurantId) return;
    
        try {
          setLoading(true);
          const response = await deleteDiscount(
            accessToken,
            restaurant.restaurantId,
            discountId
          );
          if (response) {
            setDiscountData(
              { discountId } as Discount,
              "DELETE"
            );
          }
        } catch (e) {
          console.log("An error occurred while deleting the discount", e);
        } finally {
          clearForm();
          setLoading(false);
        }
      };
    
    
    
    return {
        data,
        loading,
        editDiscount,
        clearForm,
        editingDiscount,
        deleteDiscount: deleteDiscountById,
        setDiscountData,
        startLoading: () => setLoading(true),
        stopLoading: () => setLoading(false),
    };
};

export default useDiscount;
