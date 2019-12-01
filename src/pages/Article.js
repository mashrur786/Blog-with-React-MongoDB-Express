import React from 'react';
import articleContent from './article-content';
import ArticlesList from '../components/ArticlesList'

const Article = ({ match }) =>
{
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name)

    if( !article) return <h1>Article Does not Exit </h1>

    const otherArticles = articleContent.filter( article => article.name !== name);

    return (
            <React.Fragment>
                <h1> Article { article.title } </h1>
                <p>
                    { article.content }
                </p>
                <br/>
                <h2> Other Articles </h2>
                <ArticlesList articles={otherArticles} />
            </React.Fragment>
        )
}

export default Article;