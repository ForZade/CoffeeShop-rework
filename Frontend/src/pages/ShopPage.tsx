import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard, { ProductProps } from "../components/Products/ProductCard";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
    const { checkAuth, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ProductProps[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function getProducts() {
            try {
                await checkAuth();
                const response = await axios.get("http://localhost:7000/api/v1/products");
                setData(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                if (user?.email && !user?.roles.includes("user")) {
                    navigate("/verify");
                }
                setLoading(false);
            }
        }
        getProducts();
    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:7000/api/v1/products', {
              name,
              description,
              price,
              category,
              size
            }, { withCredentials: true });
            
            alert("Product added.");
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setSize('');
            

          } catch (error) {
            console.error('Error:', error);
          }
        };

    return (
        <main className="relative h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 auto-rows-auto place-items-center py-4 px-8">
            {loading && <p>Loading...</p>}
            {data.map((product: ProductProps) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    loading={loading}
                />
            ))}

            {user?.roles.includes("admin") && (
                <div
                    onClick={() => setModalOpen(true)}
                    className="w-full h-[10rem] py-44 min-h-full bg-zinc-800 rounded-3xl cursor-pointer shadow hover:scale-105 transition-transform flex items-center justify-center"
                >
                    <h1 className="text-white">Add item</h1>
                </div>
            )}

{modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-40">
    <div className="w-[40rem] h-[37rem] rounded-3xl bg-zinc-800 z-50 relative mx-auto top-1/2 transform -translate-y-1/2">
      <form className="p-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-white mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            placeholder="Enter description"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white h-24 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-white mb-2">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white mb-2">Price</label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white mb-2">Size</label>
          <input
            type="text"
            placeholder="Enter size"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white"
            value={size}
            onChange={(e) => setSize(e.target.value)}
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
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Cancel
            </button>
        </div>
      </form>
    </div>
  </div>
)}
        </main>
    );
}