import UserBubble from "../components/UserBubble";

export default function HomePage() {
    return (
        <main className="w-screen flex justify-end p-4">
            <UserBubble roles={["User", "Admin"]}/>
        </main>
    )
}