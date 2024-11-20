import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useLoaderData } from "react-router-dom";
import CartItem from "../components/Cart/CartItem";

interface CartProps {
    items: CartItemProps[];
    code: string
    total: { $numberDecimal: string }
    subtotal: { $numberDecimal: string }
    discount: { $numberDecimal: string }
    percentage: number
    count: number
}

export interface CartItemProps {
    productId: number;
    quantity: number;
    price: { $numberDecimal: string }
}

export default function CartLayout() {
    const { setCart, cart } = useCart();
    const data = useLoaderData() as CartProps;

    useEffect(() => {
        setCart({
            code: data.code,
            items: data.items,
            total: data.total.$numberDecimal,
            subtotal: data.subtotal.$numberDecimal,
            discount: data.discount.$numberDecimal,
            percentage: data.percentage,
            count: data.count,
        });
    }, [data])

    return (
        <main className="w-full h-full flex flex-col lg:flex-row p-8 gap-8">
            <section className="grow flex flex-col gap-2 lg:gap-1 py-4 lg:py-0">
                {
                    cart.items.length ? cart.items.map((item) => <CartItem key={item.productId} id={item.productId} quantity={item.quantity} />) 
                    : 
                    <div className="w-full h-full grid place-items-center">
                        <h1 className="text-2xl font-bold">Krepšelis tušcias</h1>
                    </div>
                }
            </section>

            <section className="lg:max-w-96 lg:min-w-96 h-full">
                {
                    cart && <Outlet context={cart}/>
                }
            </section>
        </main>
    )
}