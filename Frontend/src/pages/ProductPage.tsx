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
  const navigate = useNavigate(); // New hook for navigation
  const { checkAuth, auth } = useAuth();
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkAuth();
        const response = await axios.get(`http://localhost:7000/api/v1/products/${id}`, { withCredentials: true });
        setProduct(response.data.data);
      } 
      catch (err) {
        console.log(err);
      } 
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/products/${id}`, { withCredentials: true });
      navigate("/products"); // Redirect to products page after deletion
    } catch (err) {
      console.error("Failed to delete the product:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    product && (
      <main className="w-full h-full bg flex flex-col md:flex-row items-center px-48 py-16 dark:text-white">      
        <section className="w-full h-full bg-slate-200 dark:bg-zinc-800 rounded-3xl grid grid-cols-5 p-8 relative">
          <aside className={`w-full h-full bg-slate-50 dark:bg-zinc-900 rounded-2xl col-span-2 relative grid place-items-center ${loading && "animate-pulse"}`}>
            {
              !loading && <img src="/jacobs.webp" alt="" className="object-contain max-h-[700px]"/> 
            }
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
              onClick={() => setShowDeleteModal(true)} // Show modal on click
            >
              Delete
            </button>
          )}

          {auth && <button className="bg-violet-600 absolute top-8 right-64 scale-150 rounded-md text-sm p-1 w-16">Edit</button>}

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg text-center">
                <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this item?</p>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={handleDelete} // Call delete function
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
        </section>
      </main>
    )
  );
}
