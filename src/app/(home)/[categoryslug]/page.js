import CategorySlug from "./category-components/CategorySlug";

export async function generateMetadata({ params, searchParams }, parent) {
  const { categoryslug } = params;
  return {
    title: categoryslug,
  };
}

const CategorySlugPage = ({ params }) => {
  return (
    <main>
      <CategorySlug params={params} />
    </main>
  );
};

export default CategorySlugPage;
