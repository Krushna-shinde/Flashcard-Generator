import React from "react";
import { Modal, Button } from "react-daisyui";

//Download modal
const Download = ({ showDownload, closeDownload }) => {
  return (
    <div>
      <Modal open={showDownload} onClickBackDrop={closeDownload}>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2 bg-white border-none"
          onClick={() => closeDownload()}
          title="cancle"
        >
          ❌
        </Button>

        <Modal.Header className="font-bold">Download</Modal.Header>
        <Modal.Body>
          <div className="m-5 flex flex-col">
            <h2 className="p-2  ml-11 border-2 rounded-md text-2xl font-extrabold dark:text-slate">
              Cannot download the card.
            </h2>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Download;
