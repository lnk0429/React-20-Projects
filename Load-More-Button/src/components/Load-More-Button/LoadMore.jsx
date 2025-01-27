import { useEffect, useState } from "react";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false); // 控制加载状态
  const [products, setProducts] = useState([]); // 存储产品数据
  const [count, setCount] = useState(0); // 记录页数
  const [disableButton, setDisableButton] = useState(false); // 按钮禁用状态

  // 获取产品数据
  async function fetchProducts() {
    try {
      setLoading(true); // 开始加载
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]); // 追加新数据
        setLoading(false); // 加载完成
      }
    } catch (e) {
      console.error(e);
      setLoading(false); // 加载失败
    }
  }

  // 当 count 变化时加载数据
  useEffect(() => {
    fetchProducts();
  }, [count]);

  // 当产品数量达到 100 时禁用按钮
  useEffect(() => {
    if (products && products.length >= 100) setDisableButton(true);
  }, [products]);

  return (
    <div className="flex flex-col items-center gap-5 p-5 min-h-screen bg-gray-100">
      {/* 产品网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-screen-xl">
        {products && products.length ? (
          products.map((item) => (
            <div
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center gap-3"
              key={item.id}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-[180px] h-[180px] object-cover rounded-md"
              />
              <p className="text-lg font-semibold text-gray-800 text-center">
                {item.title}
              </p>
              <p className="text-gray-600 text-center">Price: ${item.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available</p>
        )}
      </div>

      {/* 按钮和提示 */}
      <div className="flex flex-col items-center gap-2">
        {loading ? (
          <p className="text-blue-600 text-lg font-medium">
            Loading data... Please wait.
          </p>
        ) : (
          <button
            disabled={disableButton}
            onClick={() => setCount((prev) => prev + 1)}
            className={`px-5 py-2 rounded-md text-white font-medium transition-colors duration-200 ${
              disableButton
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-400"
            }`}
          >
            {disableButton ? "No More Products" : "Load More Products"}
          </button>
        )}
        {disableButton && (
          <p className="text-gray-600 text-sm">You have reached 100 products</p>
        )}
      </div>
    </div>
  );
}
