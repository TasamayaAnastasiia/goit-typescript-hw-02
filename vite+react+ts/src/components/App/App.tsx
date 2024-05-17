import { useEffect, useState } from "react";
import "./App.css";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import SearchBar from "../SearchBar/SearchBar";
import { Audio } from "react-loader-spinner";
import { fetchImage } from "../../image-api";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Image } from "./App.types";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [listImages, setListImages] = useState<Image[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenError, setIsOpenError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageDate, setSelectedImageDate] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        setIsOpenError(false);

        const images = await fetchImage(inputValue, currentPage);

        if (currentPage === 1) {
          setListImages([]);
        }

        if (images.results.length === 0) {
          setListImages([]);
          setTotalImages(0);
          toast.error(`Nothing found for your search: ${inputValue}`, {
            position: "bottom-center",
          });
        } else {
          setListImages((prevList) => [...prevList, ...images.results]);
          setTotalImages(images.total);
          setTotalPages(images.total_pages);
          toast.success(`Succes! Your data have been recorded`, {
            position: "bottom-center",
          });
        }
      } catch (error: any) {
        toast.error(`Error fetching images: ${error.message}`, {
          position: "bottom-center",
        });
        setIsOpenError(true);
        setListImages([]);
        setTotalImages(0);
        setCurrentPage(1);
      } finally {
        setLoader(false);
      }
    };

    if (inputValue) {
      fetchData();
    }
  }, [inputValue, currentPage]);

  const handleLoadMoreClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openModal = (image: string, date: string) => {
    setSelectedImage(image);
    setModalIsOpen(true);
    setSelectedImageDate(date);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
    setSelectedImageDate("");
  };

  return (
    <>
      <SearchBar
        onSearch={(value) => setInputValue(value)}
        onReset={(valueOne, valueTwo) => {
          setTotalImages(valueOne), setListImages(valueTwo);
        }}
        onPage={(value) => setCurrentPage(value)}
      />

      {listImages.length > 0 && (
        <ImageGallery list={listImages} onOpen={openModal} />
      )}

      {loader && (
        <Loader>
          <Audio
            height="50"
            width="30"
            color="#201985"
            ariaLabel="three-dots-loading"
          />
        </Loader>
      )}

      <Toaster />

      {totalImages > 12 && !loader && currentPage !== totalPages && (
        <LoadMoreBtn onClick={handleLoadMoreClick} />
      )}

      {isOpenError && <ErrorMessage />}

      <ImageModal
        onClose={closeModal}
        isOpen={modalIsOpen}
        imageUrl={selectedImage}
        date={selectedImageDate}
      />
    </>
  );
}

export default App;
