import printTodosList from "./printTodos.js";
export default function filter(data) {
  const button = document.getElementById("filter-btn");
  button.innerHTML = "";

  const filterBtn = document.createElement("button");
  filterBtn.innerText = "filter";

  filterBtn.addEventListener("click", () => {
    filterTodos(data);
  });

  function filterTodos(data) {
    const sortedData = Object.values(data).sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });

    printTodosList(sortedData);
    // Printa alla todos
  }
  button.appendChild(filterBtn);
}
