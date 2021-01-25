import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("repositories")
      .then((response) => setRepositories(response.data))
      .catch((e) => console.log(e));
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: "Node.js",
      url: "http://github.com/node",
      techs: ["Node.js"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    setRepositories(
      repositories.filter((repositrory) => repositrory.id !== id)
    );
  }

  useEffect(() => {}, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
