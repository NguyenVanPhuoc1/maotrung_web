export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <div className="py-20 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-extrabold text-[#092F49] tracking-tight">
                    Chi tiết Trang
                </h1>
                <div className="inline-block p-6 bg-white rounded-2xl shadow-xl shadow-[#092F4908] border border-gray-100">
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-2 font-semibold">
                        Đường dẫn hiện tại
                    </p>
                    <p className="text-lg font-medium text-[#0C4367] bg-[#F6F7F8] px-4 py-2 rounded-lg border border-[#0C436720]">
                        /{slug}
                    </p>
                </div>
            </div>
        </div>
    );
}
