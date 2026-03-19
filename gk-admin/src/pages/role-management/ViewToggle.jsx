const ViewToggle = ({ view, setView }) => (
  <div className="mb-2">
    <button
      className={`px-4 py-2 rounded-l ${view === "table" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      onClick={() => setView("table")}
    >
      Table
    </button>
    <button
      className={`px-4 py-2 rounded-r ${view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      onClick={() => setView("grid")}
    >
      Grid
    </button>
  </div>
);

export default ViewToggle;