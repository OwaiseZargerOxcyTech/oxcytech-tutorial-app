"use client";
import { useEffect, useState } from "react";

const FooterPage = ({ params }) => {
  const { footerSlug } = params;
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(
          `/api/admin/pagecontent/get-for-ui?footerSlug=${footerSlug}`
        );
        const data = await response.json();
        if (response.ok) {
          setPageContent(data.result[0]);
        } else {
          console.error("Error fetching page content:", data.error);
        }
      } catch (error) {
        console.error("Fetch page content error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageContent();
  }, [footerSlug]);

  // Conditional rendering to avoid null errors
  if (loading) {
    return <div className="min-h-screen">Loading...</div>;
  }

  if (!pageContent) {
    return <p>No content available.</p>;
  }

  return (
    <footer className="min-h-screen m-8">
      <div className="max-w-3xl mx-auto p-6 lg:p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 leading-tight">
          {pageContent.title}
        </h1>
        <div
          className="prose prose-lg lg:prose-xl text-gray-800 leading-relaxed max-w-none"
          dangerouslySetInnerHTML={{ __html: pageContent.content }}
        />
      </div>
    </footer>
  );
};

export default FooterPage;
