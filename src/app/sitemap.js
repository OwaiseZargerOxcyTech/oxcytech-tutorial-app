export default async function sitemap() {
    const baseUrl = "https://tutorials-fawn-omega.vercel.app";
  
    console.log("Calling getpublishedblogs API...");
  
    const response = await fetch(baseUrl + "/api/getpublishedblogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    console.log("API response:", response);
  
    const { result } = await response.json();
  
    console.log("API result:", result);
  
    const blogPosts = result?.map((post) => {
      return {
        url: `${baseUrl}/blog3/${post?.slug}`,
        lastModified: post?.createdAt,
      };
    });
  
    console.log("Generated blog posts:", blogPosts);
  
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...blogPosts,
    ];
  }
  