import css from '../LoadMoreBtn/LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
    onClick: () => void;
}

const LoadMoreBtn = ({onClick}: LoadMoreBtnProps): React.ReactElement => {
    return (
        <div className={css.boxBtn}>
            <button onClick={onClick} className={css.btnLoad} type="button">Load More</button>
        </div>
    )
}
export default LoadMoreBtn;