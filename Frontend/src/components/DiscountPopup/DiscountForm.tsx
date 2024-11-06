import axios from "axios";
import { useForm } from "react-hook-form";
import { useDiscount } from "../../contexts/DiscountContext";
import { useEffect } from "react";

function DiscountCodeForm() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { action, currentCode, finishAction, cancelAction } = useDiscount();

  const onSubmit = async (data: all) => {
    try {
        if (action === 'add') {
            await axios.post("http://localhost:7000/api/v1/users/discounts", data, { withCredentials: true })
        }
        else if (action === 'edit') {
            await axios.post(`http://localhost:7000/api/v1/users/discounts/${currentCode}`, data, { withCredentials: true })
        }

        return finishAction();
    }
    catch (error) {
      console.error('Error:', error);
    }

    reset();
  };

  useEffect(() => {
    if (action === 'edit') {
      setValue('code', currentCode);
    }
  }, [action, currentCode, setValue]);

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 absolute top-0 left-0 w-full p-2 bg-slate-200 dark:bg-zinc-700 rounded-2xl">
        
        {/* Code Input */}
        <div>
          <label className="block text-sm font-medium dark:text-white">Discount Code</label>
          <input
            {...register("code", { required: "Discount code is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="e.g., SAVE20"
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
        </div>

        {/* Percentage Input */}
        <div>
          <label className="block text-sm font-medium dark:text-white">Discount Percentage</label>
          <input
            {...register("percentage", {
              required: "Percentage is required",
              min: { value: 1, message: "Minimum value is 1" },
              max: { value: 100, message: "Maximum value is 100" },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            type="number"
            placeholder="e.g., 20"
          />
          {errors.percentage && <p className="text-red-500 text-sm">{errors.percentage.message}</p>}
        </div>

        {/* Expiration Date Input */}
        <div>
          <label className="block text-sm font-medium dark:text-white">Expires</label>
          <div className="relative">
            <input
              {...register("expires")}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setValue("expires", "")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Discount Code
        </button>

        <button
           className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
           onClick={cancelAction}
        >
          Cancel
        </button>
      </form>
  );
}

export default DiscountCodeForm;