import Modal from "react-modal";

Modal.setAppElement("#root");

type imageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  date: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, date }: imageModalProps): React.ReactElement => {
  const customStyles: Modal.Styles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      padding: "0",
      gap: "40px",
      width: "1200px",
      inset: "40px 100px",
      margin: "auto",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      style={customStyles}
    >
      <img style={{ width: "900px", height: "100%" }} src={imageUrl}></img>
      <div>
        <p>
          <b>Date created: {date}</b>
        </p>
      </div>
    </Modal>
  );
};

export default ImageModal;
