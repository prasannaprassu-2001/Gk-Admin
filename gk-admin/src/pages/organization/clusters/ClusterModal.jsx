import React, { useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import '../../role-management/rolrForm.css'
const ClusterModal = ({ isOpen, toggle, onSubmit, initialData }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      region_id: "",
      name: "",
      code: "",
      is_active: true
    }
  });

  useEffect(() => {
    reset({
      region_id: initialData?.region_id || "",
      name: initialData?.name || "",
      code: initialData?.code || "",
      is_active: initialData?.is_active ?? true
    });
  }, [initialData, reset]);

  const submitHandler = (data) => {
    onSubmit({
      region_id: Number(data.region_id),
      name: data.name,
      code: data.code,
      is_active: !!data.is_active
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered className="role-modal">
      <form onSubmit={handleSubmit(submitHandler)}>

        <ModalHeader toggle={toggle} className="role-modal-header">
          {initialData ? "Edit Cluster" : "Create Cluster"}
          <p className="sub-text">Manage cluster details</p>
        </ModalHeader>

        <ModalBody className="role-modal-body">

          <FormGroup>
            <Label className="form-label">Region ID</Label>
            <Controller
              name="region_id"
              control={control}
              render={({ field }) => (
                <Input type="number" {...field} className="form-input" />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label className="form-label">Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} className="form-input" />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label className="form-label">Code</Label>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input {...field} className="form-input" />
              )}
            />
          </FormGroup>

          <FormGroup check className="mt-3">
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Label check className="form-label">Active</Label>
          </FormGroup>

        </ModalBody>

        <ModalFooter className="role-modal-footer">
          <Button type="submit" className="submit-btn">
            {initialData ? "Update" : "Create"}
          </Button>

          <Button onClick={toggle} className="cancel-btn">
            Cancel
          </Button>
        </ModalFooter>

      </form>
    </Modal>
  );
};

export default ClusterModal;