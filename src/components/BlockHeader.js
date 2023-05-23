import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function BlockHeader({ title, buttonText, onButtonClick }) {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="m-0">{title}</h2>
        <Button variant="success" onClick={onButtonClick}>
          <FontAwesomeIcon className='me-3' icon={faPlus} />
          {buttonText}
        </Button>
      </div>
      <hr />
    </div>
  );
}

export default BlockHeader;

