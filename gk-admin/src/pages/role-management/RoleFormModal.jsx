import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import './rolrForm.css'

const RoleFormModal = ({ isOpen, toggle, onSubmit, role }) => {
  const [form, setForm] = useState({
    name: "",
    label: "",
    level: 0,
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (role) {
      setForm({
        name: role.name || "",
        label: role.label || "",
        level: role.level || 0,
      });
    } else {
      setForm({ name: "", label: "", level: 0 });
    }
  }, [role]);

  const handleSubmit = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name required";
    if (!form.label) newErrors.label = "Label required";
    if (form.level === "" || isNaN(Number(form.level))) newErrors.level = "Level must be number";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) onSubmit(form);
  };

return (
  <Modal isOpen={isOpen} toggle={toggle} centered className="role-modal">
    <ModalHeader toggle={toggle} className="role-modal-header">
      {role ? "Edit Role" : "Create Role"}
      <p className="sub-text">Manage role details below</p>
    </ModalHeader>

    <ModalBody className="role-modal-body">

      <FormGroup>
        <Label className="form-label">Name</Label>
        <Input
          className="form-input"
          value={form.name}
          invalid={!!errors.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <FormFeedback>{errors.name}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label className="form-label">Label</Label>
        <Input
          className="form-input"
          value={form.label}
          invalid={!!errors.label}
          onChange={e => setForm({ ...form, label: e.target.value })}
        />
        <FormFeedback>{errors.label}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label className="form-label">Level</Label>
        <Input
          type="number"
          className="form-input"
          value={form.level}
          invalid={!!errors.level}
          onChange={e => setForm({ ...form, level: e.target.value })}
        />
        <FormFeedback>{errors.level}</FormFeedback>
      </FormGroup>

    </ModalBody>

    <ModalFooter className="role-modal-footer">
      <Button className="cancel-btn" onClick={toggle}>Cancel</Button>
      <Button className="submit-btn" onClick={handleSubmit}>
        {role ? "Update" : "Save"}
      </Button>
    </ModalFooter>
  </Modal>
);
};

export default RoleFormModal;