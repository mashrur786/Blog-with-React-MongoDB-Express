import React from 'react';
import articleContent from "../pages/article-content";
import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => (
    <>
     { articles.map( (article, key) =>  (
             <Link className="article-item" key={ key } to={`/article/${ article.name }`}>
                 <h3> { article.title } </h3>
                 <p>  { article.content[0].substring(0, 150) }...</p>
             </Link>

        ))}
    </>
);

export default ArticlesList;