import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateGuestsForm from "./createGuestsForm";
import { useCreateGuest } from "./useCreateGuest";

function AddGuest() {
  const { createGuest } = useCreateGuest();

  return (
    <div>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button size="small">Add new guest</Button>
        </Modal.Open>
        <Modal.Window name="guest-form">
          <CreateGuestsForm onCreate={createGuest} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
