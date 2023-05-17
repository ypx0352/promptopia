"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  useEffect(async () => {
    const response = await fetch("api/prompt");
    const data = await response.json();
    setAllPosts(data);
    setSearchResult(data);
  }, []);

  const filterPostsByWords = (filter) => {
    const regex = new RegExp(filter, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const filterPostsByTag = (tag) => {
    return allPosts.filter((item) => item.tag === tag);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        setSearchResult(filterPostsByWords(e.target.value));
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(`#${tag}`);
    setSearchResult(filterPostsByTag(tag));
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
