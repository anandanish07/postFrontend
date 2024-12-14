import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const dataNew = data.data.slice(0, 10);
        setPosts(dataNew);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, []);

  const handleClick = async (id) => {
    setExpandedPostId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="App">
      <h1>Post List</h1>

      {posts.map((item) => (
        <div key={item.id}>
          <p onClick={() => handleClick(item.id)}>Post-id: {item.id}</p>
          <p onClick={() => handleClick(item.id)}>Post-title: {item.title}</p>

          {expandedPostId === item.id && <p>Post: {item.body}</p>}
        </div>
      ))}
    </div>
  );
}
