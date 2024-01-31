import SearchBar from "@/app/_components/BrowserSearchBar";
import Card from "@/app/_components/ProductCard";
import "@/app/globals.css";

export default function BrowsePage() {
    return <main>
        <div className="search">
            <SearchBar />
        </div>
        <div className="card_display">
            <Card />
        </div>
    </main>;
}