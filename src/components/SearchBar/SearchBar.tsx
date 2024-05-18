import css from '../SearchBar/SearchBar.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

interface searchBarProps {
    onSearch: (value: string) => void;
    onReset: (num: number, arr: []) => void;
    onPage: (num: number) => void;
}

const SearchBar = ({ onSearch, onReset, onPage }: searchBarProps): React.ReactElement => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!inputValue) {
            onSearch('');
            onReset(0, []);
            toast.error(`Please enter a search value`, { position: "bottom-center" });  
            return;
        }

        onSearch(inputValue);
        onPage(1);
    }

    return (
        <header className={css.header}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input className={css.inputForSearching} type="text" autoComplete="off" autoFocus placeholder="Search images and photos" name="keyword" value={inputValue} 
                    onChange={handleInputChange} />
                <button className={css.ButSearch} type="submit">
                    <svg height="20" width="20" viewBox="0 0 32 32">
                        <path d="M20 0.005c-6.627 0-12 5.373-12 12 0 2.026 0.507 3.933 1.395 5.608l-8.344 8.342 0.007 0.006c-0.652 0.641-1.058 1.529-1.058 2.516 0 1.949 1.58 3.529 3.529 3.529 0.985 0 1.874-0.406 2.515-1.059l-0.002-0.002 8.341-8.34c1.676 0.891 3.586 1.4 5.617 1.4 6.627 0 12-5.373 12-12s-5.373-12-12-12zM4.795 29.697c-0.322 0.334-0.768 0.543-1.266 0.543-0.975 0-1.765-0.789-1.765-1.764 0-0.498 0.21-0.943 0.543-1.266l-0.009-0.008 8.066-8.066c0.705 0.951 1.545 1.791 2.494 2.498l-8.063 8.063zM20 22.006c-5.522 0-10-4.479-10-10s4.478-10 10-10c5.521 0 10 4.478 10 10s-4.479 10-10 10z"></path>
                        <path d="M20 5.005c-3.867 0-7 3.134-7 7 0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5c0-3.313 2.686-6 6-6 0.275 0 0.5-0.224 0.5-0.5s-0.225-0.5-0.5-0.5z"></path>
                    </svg>
                </button>
            </form>
        </header>
    )
}

export default SearchBar;
