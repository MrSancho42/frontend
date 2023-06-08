import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function BlockHeader({ title, buttonText, onButtonClick }) {
  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-3">
        <Button className="add-button rounded-circle" onClick={onButtonClick}>
          <FontAwesomeIcon className="w-100 h-100" icon={faPlus} />
        </Button>
        <h2 className="m-0">{title}</h2>
      </div>
    </div>
  );
}

export default BlockHeader;

