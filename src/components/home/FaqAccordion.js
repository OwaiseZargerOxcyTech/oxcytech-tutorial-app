import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";

export default function FaqAccordion({
  id,
  title,
  description,
  activeId,
  setActiveId,
}) {
  const isActive = activeId === id;

  const handleToggleAccordion = () => {
    setActiveId(isActive ? null : id);
  };

  return (
    <>
      <div
        onClick={handleToggleAccordion}
        className="flex group cursor-pointer mx-auto justify-between items-center p-2"
      >
        <div className="flex group cursor-pointer">
          <div className="flex items-center justify-center pe-2">
            {isActive ? (
              <button
                className={`transform ${
                  isActive ? "rotate-180" : "rotate-0"
                } transition-transform duration-300 rounded-full focus:outline-none focus:ring focus:ring-indigo-900  `}
              >
                <MinusIcon className="w-6 h-6  text-pink-400 group-hover:text-pink-400  " />
              </button>
            ) : (
              <button
                className={`transform ${
                  isActive ? "rotate-180" : "rotate-0"
                } transition-transform duration-300 rounded-full focus:outline-none focus:ring focus:ring-indigo-900 `}
              >
                <PlusIcon className="w-6 h-6 text-pink-400 group-hover:text-pink-400  " />
              </button>
            )}
          </div>
          <div className="text-white font-bold">{title}</div>
        </div>
      </div>

      <div
        className={`overflow-hidden font-semibold text-gray-400 opacity-90  mb-2  ${
          isActive ? "max-h-auto p-4 " : "max-h-0"
        }`}
      >
        {description}
      </div>
    </>
  );
}
