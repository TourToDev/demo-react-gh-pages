import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import BlogPostInfo from './content/BlogPostInfo'
import articleCollection from './utility/Article'
import {BrowserRouter as Router,
        Route,
        Link,
        Switch,
        useParams,} from 'react-router-dom';
import './index.css'


const ReactMarkdown = require('react-markdown')


function ThemeChangeButton(props) {
    return(
        <button onClick={props.onClick}>
            ChangeMode
        </button>
    )
}

function Header(props) {
    return(
        <div className='fun-header'>
            <div className='flex-item'>
                <Link className={!props.darkMode? 'header':'header-dark'} to='/'>
                    <div>
                        Overreacted
                    </div>
                </Link>
            </div>

            <div className='flex-item'>
                <ThemeChangeButton onClick={props.onClick}/>
            </div>
        </div>
    )
}


function AuthorInfo(props) {
    return(
        <div className={!props.darkMode? 'author-info':'author-info-dark'}>
            <address >
                Personal blog by Lawson Lin<br/>
                Planning to explain a lot in here
            </address>
        </div>
    )
}


function PostInfo(props) {
    const info=props;
    return (
        <div className={!props.darkMode? 'blog-post-info':'blog-post-info-dark'}>
            <h2 className={!props.darkMode? 'blog-title':'blog-title-dark'}>{info.title}</h2>
            <time>{info.date + ' ·'}</time>
            <time>{info.readTime}</time>
            <p>{info.intro}</p>
        </div>
    )
}

function Article(props) {
    const {title} = useParams();
    const articleContent = articleCollection[title];
    return (
        <div className={props.darkMode? 'article-dark':'article'}>
            <ReactMarkdown source={articleContent} />
        </div>
    )
}

function BlogPostList(props) {
    return(
        <div className='blog-post-list'>
            <Route path='/' exact>
                {BlogPostInfo.map((info)=>{
                    return <Link to={info.url}>
                                <PostInfo title={info.title}
                                            date={info.date}
                                            readTime={info.readingTime}
                                            intro={info.introWord}
                                            darkMode={props.darkMode}/>
                        </Link>
                })}
            </Route>
            <Switch>
                <Route path='/:title'>
                    <Article darkMode={props.darkMode}/>
                </Route>
            </Switch>
        </div>
    )
}

function BlogSite() {
    const [darkMode, setDarkMode] = useState(false)

    function handleClick() {
        setDarkMode(!darkMode)
    }

    return (
        <div className={!darkMode? 'global' : 'global-dark'}>
            <div className='blog-site'>
                <Router>
                    <Header darkMode={darkMode} onClick={handleClick}/>
                    <AuthorInfo darkMode={darkMode}/>
                    <BlogPostList darkMode={darkMode}/>
                </Router>
            </div>
        </div>
    )
}

ReactDOM.render(
    <BlogSite/>,
    document.getElementById('root')
)
