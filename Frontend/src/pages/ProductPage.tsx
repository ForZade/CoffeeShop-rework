import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AddToCart from "../components/Products/AddToCart";
import ReviewButton from "../components/Products/ReviewButton";
import { useForm } from "react-hook-form";

interface ProductProps {
  id: number;
  name: string;
  image: string;
  price: { $numberDecimal: string };
  description: string;
  category: string;
  size: string;
  liked: number;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  price: string;
  size: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkAuth, auth } = useAuth();
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Initialize useForm and define validation
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAuth();
        const response = await axios.get(`http://localhost:7000/api/v1/products/${id}`, { withCredentials: true });
        const productData = response.data.data;
        setProduct(productData);

        // Prefill form data
        setValue("title", productData.name);
        setValue("description", productData.description);
        setValue("category", productData.category);
        setValue("price", productData.price.$numberDecimal);
        setValue("size", productData.size);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, checkAuth, setValue]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/products/${id}`, { withCredentials: true });
      navigate("/products");
    } catch (err) {
      console.error("Failed to delete the product:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSave = handleSubmit(async (data) => {
    try {
      const fieldsToUpdate = {
        name: data.title,
        description: data.description,
        category: data.category,
        price: { $numberDecimal: data.price },
        size: data.size,
      };

      await axios.patch(`http://localhost:7000/api/v1/products/${id}`, fieldsToUpdate, { withCredentials: true });
      setShowEditModal(false);

      // Update product state
      setProduct((prevProduct) => ({
        ...prevProduct!,
        name: data.title,
        description: data.description,
        category: data.category,
        price: { $numberDecimal: data.price },
        size: data.size,
      }));
    } catch (err) {
      console.error("Failed to update the product:", err);
    }
  });

  return (
    product && (
      <main className="w-full h-full bg flex flex-col md:flex-row items-center px-48 py-16 dark:text-white">      
        <section className="w-full h-full bg-slate-200 dark:bg-zinc-800 rounded-3xl grid grid-cols-5 p-8 relative">
          <aside className={`w-full h-full bg-slate-50 dark:bg-zinc-900 rounded-2xl col-span-2 relative grid place-items-center ${loading && "animate-pulse"}`}>
            {!loading && <img src="/jacobs.webp" alt={product.name} className="object-contain max-h-[700px]"/>}
          </aside>

                  <article className="w-full h-full col-span-3 px-8 py-6 flex flex-col justify-between relative">
          <header className="w-full flex flex-col gap-4">
            <h3 className="text-xl font-bold tracking-widest truncate overflow-hidden whitespace-nowrap">
              {product.category}
            </h3>
            <h1 className="text-5xl font-black truncate overflow-hidden whitespace-nowrap">
              {product.name}
            </h1>
            <p className="text-xl">{product.description}</p>
          </header>

          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold">Packaging:</h3>
            <footer className="w-full flex items-center justify-between">
              <div className="bg-gradient-to-br from-coffee-200 to-coffee-100 px-6 py-2 rounded-md font-bold text-xl">
                {product.size}
              </div>
              <h3 className="text-3xl font-black">
                {product.price.$numberDecimal}€
              </h3>
            </footer>

            {auth && <AddToCart productId={product.id} />}
          </div>
        </article>

          {auth && <ReviewButton liked={product.liked} productId={product.id} extraClass="absolute top-6 right-12 scale-150"/>}

          {auth && (
            <button
              className="bg-red-600 absolute top-8 right-36 scale-150 rounded-md text-sm p-1 w-16"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          )}

          {auth && (
            <button
              className="bg-violet-600 absolute top-8 right-64 scale-150 rounded-md text-sm p-1 w-16"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
          )}

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg text-center">
                <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this item?</p>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-40">
              <div className="w-[40rem] h-[37rem] rounded-3xl bg-zinc-800 z-50 relative mx-auto top-1/2 transform -translate-y-1/2">
                <form onSubmit={handleSave} className="p-6 space-y-4">
                  <div>
                    <label className="block text-white mb-2">Title</label>
                    <input
                      type="text"
                      {...register("title", { required: "Title is required" })}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <textarea
                      {...register("description", { required: "Description is required" })}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white h-24 resize-none"
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Category</label>
                    <input
                      type="text"
                      {...register("category", { required: "Category is required" })}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", { required: "Price is required" })}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                  </div>
                  <div>
                    <label className="block text-white mb-2">Size</label>
                    <input
                      type="text"
                      {...register("size", { required: "Size is required" })}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
                    {errors.size && <p className="text-red-500">{errors.size.message}</p>}
                  </div>
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </main>
    )
  );
}

export const ProductLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params

  try {
    const response = await axios.get(`http://localhost:7000/api/v1/products/${id}`, { withCredentials: true });
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
}