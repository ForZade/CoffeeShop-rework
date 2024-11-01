import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import AddToCart from "../components/Products/AddToCart";
import ReviewButton from "../components/Products/ReviewButton";

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

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkAuth, auth } = useAuth();
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAuth();
        const response = await axios.get(`http://localhost:7000/api/v1/products/${id}`, { withCredentials: true });
        const productData = response.data.data;
        setProduct(productData);

        // Prefill form data
        setTitle(productData.name);
        setDescription(productData.description);
        setCategory(productData.category);
        setPrice(productData.price.$numberDecimal);
        setSize(productData.size);
      } 
      catch (err) {
        console.log(err);
      } 
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, checkAuth]);

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

  const openEditModal = () => {
    if (product) {
      setTitle(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price.$numberDecimal);
      setSize(product.size);
    }
    setShowEditModal(true);
  };

  const handleSave = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const fieldsToUpdate = {
        name: title,
        description,
        category,
        price: { $numberDecimal: price }, // Correct price format
        size,
      };

      await axios.patch(`http://localhost:7000/api/v1/products/${id}`, fieldsToUpdate, { withCredentials: true });
      setShowEditModal(false);
      
      // Create updated product object
      const updatedProduct: ProductProps = {
        ...product!, // Use current product properties (with non-null assertion)
        name: title,
        description,
        category,
        price: { $numberDecimal: price },
        size,
      };
      
      setProduct(updatedProduct); // Update state with new product details
    } catch (err) {
      console.error("Failed to update the product:", err);
    }
  };

  return (
    product && (
      <main className="w-full h-full bg flex flex-col md:flex-row items-center px-48 py-16 dark:text-white">      
        <section className="w-full h-full bg-slate-200 dark:bg-zinc-800 rounded-3xl grid grid-cols-5 p-8 relative">
          <aside className={`w-full h-full bg-slate-50 dark:bg-zinc-900 rounded-2xl col-span-2 relative grid place-items-center ${loading && "animate-pulse"}`}>
            {!loading && <img src="/jacobs.webp" alt={product.name} className="object-contain max-h-[700px]"/>}
          </aside>

          <article className="w-full h-full col-span-3 px-8 py-6 flex flex-col justify-between relative">
            <header className="w-full flex flex-col gap-4">
              <h3 className="text-xl font-bold tracking-widest">{product.category}</h3>
              <h1 className="text-5xl font-black">{product.name}</h1>
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
              onClick={openEditModal}
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white h-24 resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-white mb-2">Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Price</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Size</label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
                    />
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
