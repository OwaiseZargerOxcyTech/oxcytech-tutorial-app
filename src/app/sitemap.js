export default async function sitemap() {
  const baseUrl = "https://oxcytech-tutorial-app.vercel.app/";

  console.log("Calling getpublishedblogs API...");

  try {
    const response = await fetch(baseUrl + "/api/admin/getpublishedblogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // call api in thunder client ad get category and fix it
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`
      );
      return [
        {
          url: baseUrl,
          lastModified: new Date(),
        },
      ];
    }

    const { result } = await response.json();
    console.log("API result:", result);

    const blogPosts = result?.map((post) => ({
      url: `${baseUrl}/${post.category.name}/${post.slug}`,
      lastModified: post.createdAt
        ? new Date(post.createdAt).toISOString()
        : new Date().toISOString(),
    }));

    console.log("Generated blog posts:", blogPosts);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...blogPosts,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ];
  }
}
