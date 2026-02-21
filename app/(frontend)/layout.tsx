import Header from './components/header';
import Footer from './components/footer';

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
}