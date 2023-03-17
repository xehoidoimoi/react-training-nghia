import { format } from 'date-fns';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { deleteArticleFavorites } from '../../redux/apiCalls';
import { addArticleFavorites } from './../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

// ! Pagination
export function Items({ currentItems }) {
    const dispatch = useDispatch();

    const users = useSelector(state => state.users);
    // ! Handle Add Article Favorites
    const handleClick = (e, article) => {
        // console.log(e.target.parentElement)
        let eventTarget
        if (e.target.className === "ion-heart") {
            eventTarget = e.target.parentElement;
        } else {
            eventTarget = e.target;
        }
        if (eventTarget.classList.contains("active")) {
            deleteArticleFavorites(dispatch, article.slug, eventTarget);
            // eventTarget.classList.remove("active");
        } else {
            addArticleFavorites(dispatch, article.slug, eventTarget);
            // eventTarget.classList.add("active");
        }
    };
    return (
        <>
            {
                currentItems &&
                currentItems.map((article, index) => (
                    <div className="article-preview" key={ index }>
                        <div className="article-meta">
                            <Link to={ `/profile/${article?.author?.username}` }><img src={ article?.author?.image } alt='' /></Link>
                            <div className="info">
                                <Link to={ `/profile/${article?.author?.username}` } style={ { color: "#5cb85c" } } className="author">{ article?.author?.username }</Link>
                                <span className="date">{ article?.createdAt ? format(new Date(article?.createdAt), 'MMMM-dd-yyyy').replace(/-/g, " ") : "" }</span>
                            </div>
                            {
                                users.currentUser
                                    ? <button className={ article?.favorited
                                        ? "btn btn-outline-primary btn-sm pull-xs-right active"
                                        : "btn btn-outline-primary btn-sm pull-xs-right"
                                    }
                                        onClick={ (e) => handleClick(e, article) }
                                    >
                                        <i className="ion-heart"></i> { article?.favoritesCount }
                                    </button>
                                    : <Link to="/login" className="btn btn-outline-primary btn-sm pull-xs-right">
                                        <i className="ion-heart"></i> { article?.favoritesCount }
                                    </Link>
                            }

                        </div>
                        <Link to={ `/article/${article?.slug}` } state={ { article: article } } className="preview-link">
                            <h1>{ article?.title }</h1>
                            <p>{ article?.description }</p>
                            <ul className="tag-list">
                                {
                                    article?.tagList?.map((tag, index) => (
                                        <li className="tag-default tag-pill tag-outline" key={ index }>{ tag }</li>
                                    ))
                                }
                            </ul>
                            <span>Read more...</span>
                        </Link>
                    </div>
                ))
            }
        </>
    );
}

function PaginatedItems({ itemsPerPage, articles }) {

    const [ itemOffset, setItemOffset ] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = articles?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(articles?.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % articles?.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            <Items currentItems={ currentItems } />
            <ReactPaginate
                onPageChange={ handlePageClick }
                pageRangeDisplayed={ 20 }
                pageCount={ pageCount }
                renderOnZeroPageCount={ null }
                className="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                previousClassName="prev-customer"
                nextClassName="next-customer"
            />
        </>
    );
}
export default PaginatedItems;