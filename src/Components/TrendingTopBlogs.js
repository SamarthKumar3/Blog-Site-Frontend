import Card from "@/Utils/Card";

export async function fetchArticles(type) {
    const endpoint =
        type === "Trending"
            ? `${process.env.NEXT_PUBLIC_backend_url}/api/blog/trending/new`
            : `${process.env.NEXT_PUBLIC_backend_url}/api/blog/top-blogs`

    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch ${type} articles`);

    return res.json();
}

export default async function BlogsList({ selectedType }) {
    const blogs = await fetchArticles(selectedType);

    return (
        <div className="flex flex-wrap">
            {blogs.length > 0 ? (
                blogs.map((blog) => <Card article={blog} key={blog._id} />)
            ) : (
                <p>No blogs available.</p>
            )}
        </div>
    );
}
