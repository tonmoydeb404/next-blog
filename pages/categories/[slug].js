import Head from "next/head";
import { MdTag } from "react-icons/md";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";
import { siteInfo } from "../../lib/constant";
import { fetchCategories, fetchCategory } from "../../services";

const Category = ({ posts, title, slug }) => {
  return (
    <>
      <Head>
        <title>{`${title} - ${siteInfo.fullName}`}</title>
        <meta name="robots" content="index, follow" />
        <meta name="title" content={`${title} - ${siteInfo.fullName}`} />
        <meta name="description" content={siteInfo.description} />
        <meta name="keywords" content={siteInfo.keywords} />

        {/* open graph */}
        <meta property="og:title" content={`${title}`} />
        <meta property="og:site_name" content={siteInfo.fullName} />
        <meta
          property="og:url"
          content={`${siteInfo.url}/categories/${slug}`}
        />
        <meta property="og:description" content={siteInfo.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={posts[0]?.thumbnail?.url || siteInfo.ogImage}
        />
      </Head>
      <section className="feed_wrapper">
        <div className="feed_header">
          <h1 className="font-bold text-2xl flex items-center gap-1">
            <MdTag className="text-green-600" /> {title}
          </h1>
          <p className="text-gray-500">view post by by category</p>
        </div>

        <main className="feed_main">
          {posts && posts.length
            ? posts.map((post) => (
                <PostCard
                  key={post.id}
                  categories={post.categories}
                  thumbnail={post.thumbnail?.url}
                  title={post.title}
                  text={post.description}
                  createdAt={post.createdAt}
                  slug={post.slug}
                  id={post.id}
                />
              ))
            : ""}
        </main>

        <aside className="feed_sidebar">
          <Sidebar />
        </aside>
      </section>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const category = await fetchCategory(params.slug);

  return {
    props: {
      posts: category.posts,
      slug: category.slug,
      title: category.title,
      id: category.id,
    },
  };
};

export const getStaticPaths = async () => {
  const categoriesData = await fetchCategories();
  const paths = categoriesData.map((cate) => ({
    params: { slug: cate?.node?.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Category;
