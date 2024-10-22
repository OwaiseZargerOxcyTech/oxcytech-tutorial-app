import SingleBlog from "../category-components/SingleBlog";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { singleBlog } = params;
  /* this is for after production
  
    // fetch data
    const response = await fetch(
      `/api/blogs/get-blogs?category=${categoryslug}&blogSlug=${singleBlog}` 
    );
    //this wont work unless absolute path is provided with domain url for fetch
    const data = await response.json(); //data.result has data
   
    return {
      //get data and add title description etc
      title: product.title,
    }
   
  */
  return {
    title: singleBlog,
  };
}

const SingleBlogPage = ({ params }) => {
  return (
    <main>
      <SingleBlog params={params} />
    </main>
  );
};

export default SingleBlogPage;
