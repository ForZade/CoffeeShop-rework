import UserBubble from "./UserBubble/UserBubble"
import CartButton from "../components/Cart/CartButton";

export default function Navbar() {
    return (
        <nav className="w-full h-14 bg-red-500 flex justify-between items-center px-8">
            <section>

            </section>

            <section className="flex items-center space-x-4">
                <CartButton />
                <UserBubble roles={["User", "Admin"]}/>
            </section>
        </nav>
    )
}