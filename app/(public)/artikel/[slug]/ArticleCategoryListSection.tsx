import { getAllArticleCategories } from '@/lib/data/article'

const ArticleCategoryListSection = async () => {
  const categories = await getAllArticleCategories()
  return (

    <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
      <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
        Kategori
      </h4>

      <ul>
        {categories.map(category => (
          <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary" key={category.id}>
            <a href="#">{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArticleCategoryListSection
