import UserBubble from "./UserBubble/UserBubble"

export default function Navbar() {
    return (
        <nav className="w-full h-14 bg-red-500 flex justify-between items-center px-8">
            <section>

            </section>

            <section>
                <UserBubble roles={["User", "Admin"]}/>
            </section>
        </nav>
    )
}